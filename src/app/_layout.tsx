import { Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";

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
		<SafeAreaView>
			<Slot />
		</SafeAreaView>
	);
};

export default Layout;
