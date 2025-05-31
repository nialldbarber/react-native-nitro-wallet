import {NitroModules} from "react-native-nitro-modules";

import type {NitroWallet as NitroWalletSpec} from "./specs/nitro-wallet.nitro";
import {iosOnly} from "./utils";

const NitroWallet =
	NitroModules.createHybridObject<NitroWalletSpec>("NitroWallet");

export const Wallet: NitroWalletSpec = {
	canAddPassesToAppleWallet: iosOnly(
		() => NitroWallet.canAddPassesToAppleWallet(),
		"canAddPassesToAppleWallet",
	),
	addPassToAppleWallet: iosOnly(
		(base64String: string) => NitroWallet.addPassToAppleWallet(base64String),
		"addPassToAppleWallet",
	),
	viewPassInAppleWallet: iosOnly(
		(cardIdentifier: string, serialNumber?: string) =>
			NitroWallet.viewPassInAppleWallet(cardIdentifier, serialNumber),
		"viewPassInAppleWallet",
	),
	doesPassExistInAppleWallet: (cardIdentifier: string, serialNumber?: string) =>
		NitroWallet.doesPassExistInAppleWallet(cardIdentifier, serialNumber),

	removePassFromAppleWallet: (cardIdentifier: string, serialNumber?: string) =>
		NitroWallet.removePassFromAppleWallet(cardIdentifier, serialNumber),
} as NitroWalletSpec;
