import { useTranslation } from "react-i18next";
import { View } from "react-native";

import Calculator from "@assets/calculator.svg";
import CodeLine from "@assets/code-line.svg";
import PaperOutline from "@assets/paper-outline.svg";
import RoundList from "@assets/round-list.svg";

import BottomBarTile from "./Tile";

export default function BottomBar() {
	const { t } = useTranslation();

	return (
		<View
			style={{
				backgroundColor: "#FFFFFF",
				borderTopColor: "#CACACA",
				borderTopWidth: 2,
				flexDirection: "row",
				paddingHorizontal: 16,
				paddingVertical: 12,
			}}
		>
			<BottomBarTile
				icon={<Calculator height={32} />}
				title={t("method.calculator.title")}
				route="/calculator"
			/>
			<BottomBarTile
				icon={<PaperOutline height={32} />}
				title={t("method.description")}
				route="/description"
			/>
			<BottomBarTile icon={<RoundList width={32} />} title={t("method.examples")} route="/examples" />
			<BottomBarTile icon={<CodeLine width={32} />} title={t("method.algorithm")} route="/algorithm" />
		</View>
	);
}
