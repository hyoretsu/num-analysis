import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { categorizedMethods } from "numerical-methods";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";

import Header from "@components/Header";
import { vh, vw } from "@units";

import Page from "./[method]/calculator/results";
export default Page;

// export default function Home() {
// 	const [selectedCategory, selectCategory] = useState("");
// 	const { t } = useTranslation();

// 	return (
// 		<ScrollView>
// 			<Header title={t("methods")} />

// 			<View
// 				style={{
// 					paddingHorizontal: 2 * vh,
// 					paddingBottom: 2 * vh,
// 				}}
// 			>
// 				{Object.entries(categorizedMethods).map(([category, methods]) => {
// 					return (
// 						<View
// 							key={category}
// 							style={{
// 								borderRadius: 4,
// 								borderWidth: 1,
// 								marginTop: 2 * vh,
// 							}}
// 						>
// 							<Pressable
// 								onPress={() => selectCategory(old => (old === category ? "" : category))}
// 							>
// 								<View
// 									style={{
// 										flexDirection: "row",
// 										justifyContent: "space-between",
// 										paddingHorizontal: 7 * vw,
// 										paddingVertical: 2.35 * vh,
// 									}}
// 								>
// 									<Text
// 										style={{
// 											color: selectedCategory === category ? "#4B00D1" : "#4E4E4E",
// 											fontFamily: "Inter_500Medium",
// 											fontSize: 19,
// 										}}
// 									>
// 										{t(category)}
// 									</Text>
// 									<Feather
// 										name={`chevron-${selectedCategory === category ? "up" : "down"}`}
// 										size={26}
// 										color={selectedCategory === category ? "#4B00D1" : "#4E4E4E"}
// 									/>
// 								</View>
// 							</Pressable>

// 							<View
// 								style={{
// 									borderLeftColor: "#4B00D1",
// 									borderLeftWidth: 4,
// 								}}
// 							>
// 								{selectedCategory === category &&
// 									Object.keys(methods)?.map(method => (
// 										<RectButton
// 											key={method}
// 											onPress={() =>
// 												router.push({
// 													pathname: "/[method]/calculator/params",
// 													params: { method },
// 												})
// 											}
// 										>
// 											<Text
// 												style={{
// 													borderTopColor: "#D9D9D9",
// 													borderTopWidth: 2,
// 													color: "#4E4E4E",
// 													fontFamily: "Inter_500Medium",
// 													fontSize: 19,
// 													paddingHorizontal: 7 * vw,
// 													paddingVertical: 2.35 * vh,
// 												}}
// 											>
// 												{t(method)}
// 											</Text>
// 										</RectButton>
// 									))}
// 							</View>
// 						</View>
// 					);
// 				})}
// 			</View>
// 		</ScrollView>
// 	);
// }
