import { router, useNavigation, usePathname } from "expo-router";
import { cloneElement, type ReactElement } from "react";
import { Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export interface BottomBarTileProps {
	icon: ReactElement;
	route: string;
	title: string;
}

export default function BottomBarTile({ icon, route, title }: BottomBarTileProps) {
	const pathname = usePathname();
	const {} = useNavigation();

	const onRoute = pathname.includes(route);
	const color = onRoute ? "#3700B3" : "#BB86FC";

	let pushRoute = route;
	if (route === "/calculator") {
		pushRoute += "/params";
	}

	return (
		<RectButton
			onPress={() => {
				router.replace(pathname.replace(/(\/.+?)\/.*/g, `$1${pushRoute}`));
			}}
			style={{
				alignItems: "center",
				aspectRatio: 1.25,
				borderRadius: 12,
				flexDirection: "column",
				justifyContent: "center",
				width: "25%",
			}}
		>
			{cloneElement(icon, { color })}

			{onRoute && <Text style={{ color, fontFamily: "Inter_500Medium" }}>{title}</Text>}
		</RectButton>
	);
}
