import { Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Shadow } from "react-native-shadow-2";

import { vw } from "@units";

export interface ParamButtonProps {
	backgroundColor: string;
	children: string;
	onPress: () => void;
	textColor: string;
}

export default function ParamButton({ backgroundColor, children, onPress, textColor }: ParamButtonProps) {
	return (
		<Shadow
			distance={3}
			style={{
				backgroundColor,
				borderRadius: 4,
			}}
		>
			<RectButton
				onPress={onPress}
				style={{
					alignItems: "center",
					borderRadius: 4,
					paddingVertical: 16,
					width: 35 * vw,
				}}
			>
				<Text
					style={{
						color: textColor,
					}}
				>
					{children}
				</Text>
			</RectButton>
		</Shadow>
	);
}
