import type React from "react";
import {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Wallet} from "react-native-nitro-wallet";

import {pkpass} from "./constants";

function App(): React.JSX.Element {
	const [isPassInWallet, setIsPassInWallet] = useState(true);

	const [canAddPassesToAppleWallet, setCanAddPassesToAppleWallet] =
		useState(false);

	const handleCanAddPassesToAppleWallet = async () => {
		try {
			const result = await Wallet.canAddPassesToAppleWallet();
			setCanAddPassesToAppleWallet(result);
		} catch (error) {
			setCanAddPassesToAppleWallet(false);
		}
	};

	const handleViewPassInWallet = async () => {
		try {
			const result = await Wallet.viewPassInAppleWallet(
				"pass.com.nialldbarber.wallet.nitro",
				"1234567890",
			);
			setIsPassInWallet(true);
			console.log("its in the wallet!", result);
		} catch (error) {
			setIsPassInWallet(false);
			console.log("its not in the wallet!", error);
		}
	};

	const handleDoesPassExistInWallet = async () => {
		try {
			const result = await Wallet.doesPassExistInAppleWallet(
				"pass.com.nialldbarber.wallet.nitro",
				"1234567890",
			);
			setIsPassInWallet(result);
		} catch (error) {
			setIsPassInWallet(false);
			console.log("its not in the wallet!", error);
		}
	};

	const handleRemovePassFromWallet = async () => {
		try {
			const result = await Wallet.removePassFromAppleWallet(
				"pass.com.nialldbarber.wallet.nitro",
				"1234567890",
			);
			console.log("removed pass from wallet", result);
		} catch (error) {
			console.log("failed to remove pass from wallet", error);
		}
	};

	useEffect(() => {
		handleDoesPassExistInWallet();
		handleCanAddPassesToAppleWallet();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Can add passes to wallet? - {canAddPassesToAppleWallet ? "Yes!" : "No!"}
			</Text>
			<View style={styles.divider} />
			<Pressable
				style={styles.button}
				onPress={() => Wallet.addPassToAppleWallet(pkpass)}
			>
				<Text style={styles.buttonText}>Add pass</Text>
			</Pressable>
			<View style={styles.divider} />
			<Pressable style={styles.button} onPress={handleViewPassInWallet}>
				<Text style={styles.buttonText}>View pass in wallet</Text>
			</Pressable>
			<View style={styles.divider} />
			<Text style={styles.text}>
				Pass in wallet? - {isPassInWallet ? "It is!" : "It isnt!"}
			</Text>
			<View style={styles.divider} />
			<Pressable style={styles.button} onPress={handleRemovePassFromWallet}>
				<Text style={styles.buttonText}>Remove pass from wallet</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "black",
		padding: 12,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	divider: {
		marginVertical: 10,
	},
});

export default App;
