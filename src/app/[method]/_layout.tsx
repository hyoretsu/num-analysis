import { Slot, useLocalSearchParams } from "expo-router";
import type { AllMethods } from "numerical-methods";
import { useTranslation } from "react-i18next";

import BottomBar from "@components/BottomBar";
import Header from "@components/Header";

const Layout: React.FC = () => {
	const { method } = useLocalSearchParams<{ method: AllMethods }>();
	const { t } = useTranslation();

	return (
		<>
			<Header title={t(method!)} />
			<Slot />
			<BottomBar />
		</>
	);
};

export default Layout;
