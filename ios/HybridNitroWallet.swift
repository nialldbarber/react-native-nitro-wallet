import Foundation
import PassKit
import NitroModules

class HybridNitroWallet: HybridNitroWalletSpec {
    func sum(num1: Double, num2: Double) throws -> Double {
        return num1 + num2
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
                if let rootVC = UIApplication.shared.keyWindow?.rootViewController {
                    let passVC = PKAddPassesViewController(pass: pass)
                    rootVC.present(passVC!, animated: true, completion: nil)
                }
            }
            return true
        }
    }

    func viewPassInAppleWallet(cardIdentifier: String, serialNumber: String?) throws -> Promise<Void> {
        return Promise.async {
            let passLibrary = PKPassLibrary()
            let passes = passLibrary.passes

            for pass in passes {
                if pass.passTypeIdentifier == cardIdentifier &&
                    (serialNumber == nil || pass.serialNumber == serialNumber) {
                    if let passURL = pass.passURL {
                        await MainActor.run {
                            UIApplication.shared.open(passURL, options: [:], completionHandler: nil)
                        }
                    }
                    return // resolves Promise<Void>
                }
            }
            // If not found, just resolve (or you could throw an error if you want)
            return
        }
    }
}
