import { FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { paramsList, type AllMethods } from "numerical-methods";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";

import ParamButton from "@components/ParamButton";
import ParamInput from "@components/ParamInput";
import ParamTitle from "@components/ParamTitle";

export type InputParams = Record<string, any>;

export default function MethodArgs() {
	const { method } = useLocalSearchParams<{ method: AllMethods }>();
	const pathname = usePathname();
	const [optionsOpen, openOptions] = useState(false);
	const { t } = useTranslation();

	const params = paramsList[method!];

	function getParamDefaultValue(type: string): any {
		if (type === "boolean") {
			return false;
		} else if (type === "number") {
			return 0;
		} else {
			if (type === "[boolean,boolean]") {
				return [true, true];
			} else if (type === "[number,number]") {
				return [0, 0];
			} else {
				return "";
			}
		}
	}

	const defaultParams = useMemo(
		() =>
			Object.entries(params).reduce<InputParams>((obj, [param, type]) => {
				if (typeof type !== "string") {
					obj[param] = Object.entries(type).reduce<Record<string, any>>(
						(obj2, [option, actualType]) => {
							obj2[option] = getParamDefaultValue(actualType);
							return obj2;
						},
						{},
					);
				} else {
					obj[param] = getParamDefaultValue(type);
				}

				return obj;
			}, {}),
		[params],
	);

	const [inputParams, setInputParams] = useState<InputParams>({ ...defaultParams });

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				padding: 16,
				paddingTop: 0,
			}}
		>
			<View>
				{Object.entries(params).map(([param, type]) => {
					const isOptions = typeof type !== "string";

					if (isOptions) {
						return (
							<View key={param}>
								<RectButton
									onPress={() => openOptions(old => !old)}
									style={{
										alignItems: "center",
										flexDirection: "row",
										justifyContent: "space-between",
										paddingHorizontal: 16,
										paddingVertical: 12,
										marginVertical: 4,
									}}
								>
									<ParamTitle>{t(`method.calculator.params.${param}.title`)}</ParamTitle>

									<FontAwesome6 name="chevron-up" size={16} style={{ marginTop: 4 }} />
								</RectButton>

								{optionsOpen &&
									Object.entries(type).map(([option, actualType], i) => (
										<View key={option} style={{ marginTop: i !== 0 ? 16 : 0 }}>
											{actualType !== "boolean" && (
												<ParamTitle>
													{t(`method.calculator.params.${option}.title`)}
												</ParamTitle>
											)}

											<ParamInput
												option={option}
												param={param}
												state={[inputParams, setInputParams]}
												type={actualType}
											/>
										</View>
									))}
							</View>
						);
					}

					return (
						<View key={param} style={{ marginTop: 16 }}>
							<ParamTitle>{t(`method.calculator.params.${param}.title`)}</ParamTitle>
							<ParamInput param={param} state={[inputParams, setInputParams]} type={type} />
						</View>
					);
				})}
			</View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: optionsOpen ? 48 : "auto",
					paddingHorizontal: 16,
				}}
			>
				<ParamButton
					onPress={() => router.replace(pathname)}
					backgroundColor="#FFFFFF"
					textColor="#3700B3"
				>
					{t("method.calculator.params.clear")}
				</ParamButton>

				<ParamButton onPress={() => {}} backgroundColor="#3700B3" textColor="#FFFFFF">
					{t("method.calculator.params.run")}
				</ParamButton>
			</View>
		</ScrollView>
	);
}
