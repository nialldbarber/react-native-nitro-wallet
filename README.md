# react-native-nitro-wallet

![React Native Nitro Wallet Logo](./assets/rnnw-img.png)

⚠️ This package is under development, please report any issues! 

A React Native Wallet integration package built with [Nitro Modules](https://github.com/mrousavy/nitro). You can add a pass, detect the existence of a pass and remove a pass. Bulk add passes is coming soon 🚧. Currently Apple Wallet (iOS) only, but support for Google Wallet (Android) coming soon 👀 

## ⚠️ Requirements

- React Native `v0.76.0` or higher
- Node `18.0.0` or higher

## 🔧 Installation
```bash
yarn add react-native-nitro-wallet react-native-nitro-modules
cd ios && pod install
```
---

> [!IMPORTANT]
> It is recommended to first read [Getting Started with Apple Wallet](https://developer.apple.com/wallet/get-started/) to get familiar with the concepts of creating, distributing and updating passes for Apple Wallet 

> _This package assumes you have already a generated pass_, which is generally served to the app via a backend. [passkit-generator](https://www.npmjs.com/package/passkit-generator) is a solid resource for this. 

## ⚙️ Set up 
### iOS
- Follow the [documentation](https://developer.apple.com/help/account/capabilities/create-wallet-identifiers-and-certificates/) on creating a Pass Type ID certificate 
- Open your project in xcode - `open ${YourProjectName}.xcworkspace`
- Go to __Target__ > __Signing & Capabilities__ and click __+ Capability__
- Then filter by "__Wallet__" and click to add 
- This will generate a new Entitlements file: `${YourProjectName}/ios/${YourProject}/${YourProject}.entitlements`. Which will add the following to it: 
```
<key>com.apple.developer.pass-type-identifiers</key>
<array>
  <string>$(TeamIdentifierPrefix)*</string>
</array>
```
- If you already have an entitlements file, then you don't need to follow the above, you can simply add the above code block to that file. 
- The wildcard (`<string>$(TeamIdentifierPrefix)*</string>`), is auto-generated when adding Wallet capabilities via xcode, but it can be flaky on newer versions of React Native. If you find this package is not working (adding, viewing, deleting passes etc), then try removing the wildcard and explicitly putting in your Pass Type ID like so: `<string>$(TeamIdentifierPrefix)pass.com.example.myapp</string>`
- Once this is done, re-run: 

```bash
cd ios && pod install
```

## 🚀 Usage 

```ts
import { Wallet } from "react-native-nitro-wallet";
```

## 📘 API Reference
#### `canAddPassesToAppleWallet(): Promise<boolean>`
Checks if the current device can add passes to Apple Wallet (e.g. Wallet app installed, supported device)

```ts
try {
  const canAddPass = await Wallet.canAddPassesToAppleWallet();
  return canAddPass // true or false
} catch (error) {
  console.error("Can't add pass");
}
```

#### `addPassToAppleWallet(base64String: string): Promise<boolean>`
> [!IMPORTANT]
The parameter passed to `addPassToAppleWallet` _must_ be base 64 encoded! 

- Adds a single pass to Apple Wallet
- `base64String`: A base64-encoded `.pkpass` file

```ts
try {
  await Wallet.addPassToAppleWallet(base64PkPass);
} catch (error) {
  console.error("Failed to add pass to wallet");
}
```

#### `viewPassInAppleWallet(cardIdentifier: string, serialNumber?: string): Promise<void>`
Opens an existing pass in Apple Wallet
- Use this if you want to let the user view the pass from inside your app
- `cardIdentifier`: Your registered Pass Type ID
- `serialNumber`: Optional - use if your system issues multiple passes under one ID


```ts
try {
  await Wallet.viewPassInAppleWallet('pass.com.example.myapp', '1234567890');
} catch (error) {
  console.error("Failed to view pass in wallet");
}
```

#### `doesPassExistInAppleWallet(cardIdentifier: string, serialNumber?: string): Promise<boolean>`
Checks if a pass matching the provided identifiers exists in the user’s Wallet

```ts
try {
  const exists = await Wallet.doesPassExistInAppleWallet('pass.com.example.myapp', '1234567890');
  return exists // true or false
} catch (error) {
  console.error("Failed to check if pass exists in wallet");
}
```

#### `removePassFromAppleWallet(cardIdentifier: string, serialNumber?: string): Promise<void>`
Removes a matching pass from the Wallet, if it exists

```ts
try {
  await Wallet.removePassFromAppleWallet('pass.com.example.myapp', '1234567890');
} catch (error) {
  console.error("Failed to remove pass from wallet");
}
```

## Credits

Bootstrapped with [create-nitro-module](https://github.com/patrickkabwe/create-nitro-module).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
