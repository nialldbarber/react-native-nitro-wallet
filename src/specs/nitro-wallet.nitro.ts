import type { HybridObject } from 'react-native-nitro-modules'

export interface NitroWallet
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  sum(num1: number, num2: number): number
  addPassToAppleWallet(base64String: string): Promise<boolean>
  viewPassInAppleWallet(
    cardIdentifier: string,
    serialNumber?: string
  ): Promise<void>
  // removePassFromAppleWallet(
  //   cardIdentifier: string,
  //   serialNumber?: string,
  // ): Promise<void>;
  // doesPassExistInAppleWallet(
  //   cardIdentifier: string,
  //   serialNumber?: string,
  // ): Promise<boolean>;
}
