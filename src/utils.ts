import {Platform} from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

export const PLATFORM_NOT_SUPPORTED_CODE = "PLATFORM_NOT_SUPPORTED";

export function platformNotSupported(
	methodName: string,
	platform: Platform["OS"],
): Error & {code: typeof PLATFORM_NOT_SUPPORTED_CODE} {
	const error = new Error(
		`${methodName} is not supported on ${platform}.`,
	) as Error & {
		code: typeof PLATFORM_NOT_SUPPORTED_CODE;
	};
	error.code = PLATFORM_NOT_SUPPORTED_CODE;
	return error;
}

export function iosOnly<A extends unknown[], R>(
	fn: (...args: A) => R,
	methodName: string,
): (...args: A) => R {
	return (...args: A): R => {
		if (Platform.OS !== "ios") {
			throw platformNotSupported(methodName, Platform.OS);
		}
		return fn(...args);
	};
}
