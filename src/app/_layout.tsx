import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout: React.FC = () => {
	return (
		<SafeAreaView>
			<Slot />
		</SafeAreaView>
	);
};

export default Layout;
