import type {HybridObject} from "react-native-nitro-modules";

export interface NitroWallet
	extends HybridObject<{ios: "swift"; android: "kotlin"}> {
	/**
	 * Check if the device can add passes to Apple Wallet
	 */
	canAddPassesToAppleWallet(): Promise<boolean>;
	/**
	 * Add a pass to Apple Wallet
	 * @param base64String - The base64 string of the pass
	 * @returns True if the pass was added, false otherwise
	 */
	addPassToAppleWallet(base64String: string): Promise<boolean>;
	/**
	 * View a pass in Apple Wallet
	 * @param cardIdentifier - The card identifier of the pass
	 * @param serialNumber - The serial number of the pass
	 */
	viewPassInAppleWallet(
		cardIdentifier: string,
		serialNumber?: string,
	): Promise<void>;
	/**
	 * Check if a pass exists in Apple Wallet
	 * @param cardIdentifier - The card identifier of the pass
	 * @param serialNumber - The serial number of the pass
	 */
	doesPassExistInAppleWallet(
		cardIdentifier: string,
		serialNumber?: string,
	): Promise<boolean>;
	/**
	 * Remove a pass from Apple Wallet
	 * @param cardIdentifier - The card identifier of the pass
	 * @param serialNumber - The serial number of the pass
	 */
	removePassFromAppleWallet(
		cardIdentifier: string,
		serialNumber?: string,
	): Promise<void>;
}
