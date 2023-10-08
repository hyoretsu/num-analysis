import { Inter_500Medium } from "@expo-google-fonts/inter";
import { BetterStatusBar } from "@hyoretsu/rn-components";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Layout: React.FC = () => {
	const [fontsLoaded] = useFonts({
		Inter_500Medium,
	});

	if (!fontsLoaded) {
		return null;
	} else if (fontsLoaded) {
		SplashScreen.hideAsync();
	}

	return (
		<>
			<BetterStatusBar backgroundColor="#3700B3" />
			<Slot />
		</>
	);
};

export default Layout;
