import { Text, View } from "react-native";

import { vh, vw } from "@units";

export interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return (
		<View style={{ backgroundColor: "#3700B3", paddingLeft: 9 * vw, paddingVertical: 3 * vh }}>
			<Text style={{ color: "#FFFFFF", fontFamily: "Inter_500Medium", fontSize: 24 }}>{title}</Text>
		</View>
	);
}
