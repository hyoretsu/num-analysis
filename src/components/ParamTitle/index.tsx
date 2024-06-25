import { Text } from "react-native";

export interface ParamTitleProps {
	children: string;
}

export default function ParamTitle({ children }: ParamTitleProps) {
	return (
		<Text
			style={{
				color: "#4E4E4E",
				fontFamily: "Inter_500Medium",
				fontSize: 18,
			}}
		>
			{children}
		</Text>
	);
}
