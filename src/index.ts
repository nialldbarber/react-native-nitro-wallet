import { NitroModules } from 'react-native-nitro-modules'
import type { NitroWallet as NitroWalletSpec } from './specs/nitro-wallet.nitro'

export const NitroWallet =
  NitroModules.createHybridObject<NitroWalletSpec>('NitroWallet')