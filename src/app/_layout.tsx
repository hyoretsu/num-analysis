import { Inter_500Medium } from "@expo-google-fonts/inter";
import { BetterStatusBar } from "@hyoretsu/rn-components";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import "intl-pluralrules";
import "../i18n";

import i18n from "../i18n";

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
			<I18nextProvider i18n={i18n}>
				<GestureHandlerRootView>
					<ScrollView>
						<Slot />
					</ScrollView>
				</GestureHandlerRootView>
			</I18nextProvider>
		</>
	);
};

export default Layout;
