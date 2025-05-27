import type {HybridObject} from "react-native-nitro-modules";

export interface NitroWallet
	extends HybridObject<{ios: "swift"; android: "kotlin"}> {
	canAddPassesToAppleWallet(): Promise<boolean>;
	addPassToAppleWallet(base64String: string): Promise<boolean>;
	// addMultiplePassesToAppleWallet(base64Passes: string[]): Promise<boolean>;
	viewPassInAppleWallet(
		cardIdentifier: string,
		serialNumber?: string,
	): Promise<void>;
	doesPassExistInAppleWallet(
		cardIdentifier: string,
		serialNumber?: string,
	): Promise<boolean>;
	removePassFromAppleWallet(
		cardIdentifier: string,
		serialNumber?: string,
	): Promise<void>;
}
