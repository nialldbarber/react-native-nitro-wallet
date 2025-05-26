import Foundation
import PassKit
import NitroModules

class HybridNitroWallet: HybridNitroWalletSpec {    
    func canAddPassesToAppleWallet() throws -> Promise<Bool> {
        return Promise.async {
            return PKAddPassesViewController.canAddPasses()
        }
    }

    func addPassToAppleWallet(base64String: String) throws -> Promise<Bool> {
        return Promise.async {
            guard let data = Data(base64Encoded: base64String) else {
                throw NSError(domain: "HybridNitroWallet", code: 1, userInfo: [NSLocalizedDescriptionKey: "Failed to decode base64 string"])
            }

            let pass: PKPass
            do {
                pass = try PKPass(data: data)
            } catch {
                throw NSError(domain: "HybridNitroWallet", code: 2, userInfo: [NSLocalizedDescriptionKey: "The pass is invalid", NSUnderlyingErrorKey: error])
            }

            let passLibrary = PKPassLibrary()
            if passLibrary.containsPass(pass) {
                return true
            }

            await MainActor.run {
                if let rootVC = UIApplication.shared.connectedScenes
                    .compactMap({ $0 as? UIWindowScene })
                    .flatMap({ $0.windows })
                    .first(where: { $0.isKeyWindow })?.rootViewController {
                    let passVC = PKAddPassesViewController(pass: pass)
                    rootVC.present(passVC!, animated: true, completion: nil)
                }
            }
            return true
        }
    }

    private func checkPassByIdentifier(pass: PKPass, identifier: String, serialNumber: String?) -> Bool {
        if pass.passTypeIdentifier != identifier {
            return false
        }
        if let serialNumber = serialNumber {
            if pass.serialNumber != serialNumber {
                return false
            }
        }
        return true
    }

    func viewPassInAppleWallet(cardIdentifier: String, serialNumber: String?) throws -> Promise<Void> {
        return Promise.async {
            let passLibrary = PKPassLibrary()
            let passes = passLibrary.passes()
            for pass in passes {
                if self.checkPassByIdentifier(pass: pass, identifier: cardIdentifier, serialNumber: serialNumber) {
                    guard let passURL = pass.passURL else {
                        throw NSError(domain: "HybridNitroWallet", code: 500, userInfo: [NSLocalizedDescriptionKey: "Pass URL is missing"])
                    }
                    try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
                        DispatchQueue.main.async {
                            UIApplication.shared.open(passURL, options: [:]) { success in
                                if success {
                                    continuation.resume()
                                } else {
                                    continuation.resume(throwing: NSError(domain: "HybridNitroWallet", code: 501, userInfo: [NSLocalizedDescriptionKey: "Failed to open pass in Wallet"]))
                                }
                            }
                        }
                    }
                    return
                }
            }
            throw NSError(domain: "HybridNitroWallet", code: 404, userInfo: [NSLocalizedDescriptionKey: "Pass not found"])
        }
    }

    func doesPassExistInAppleWallet(cardIdentifier: String, serialNumber: String?) throws -> Promise<Bool> {
        return Promise.async {
            let passLibrary = PKPassLibrary()
            let passes = passLibrary.passes()
            for pass in passes {
                if self.checkPassByIdentifier(pass: pass, identifier: cardIdentifier, serialNumber: serialNumber) {
                    return true
                }
            }
            return false
        }
    }

    func removePassFromAppleWallet(cardIdentifier: String, serialNumber: String?) throws -> Promise<Void> {
        return Promise.async {
            let passLibrary = PKPassLibrary()
            let passes = passLibrary.passes()
            for pass in passes {
                if self.checkPassByIdentifier(pass: pass, identifier: cardIdentifier, serialNumber: serialNumber) {
                    passLibrary.removePass(pass)
                }
            }
            return
        }
    }
}
