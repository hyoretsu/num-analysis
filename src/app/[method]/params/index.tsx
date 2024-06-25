import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { paramsList, type AllMethods } from "numerical-methods";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import ParamInput from "@components/ParamInput";
import ParamTitle from "@components/ParamTitle";
import { vh, vw } from "@units";

export type InputParams = Record<string, any>;

export default function MethodArgs() {
	const { method } = useLocalSearchParams<{ method: AllMethods }>();
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

	const inputParamsState = useState<InputParams>(
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
	);

	return (
		<>
			<View style={{ backgroundColor: "#3700B3", paddingLeft: 9 * vw, paddingVertical: 3 * vh }}>
				<Text style={{ color: "#FFFFFF", fontFamily: "Inter_500Medium", fontSize: 24 }}>
					{t(method!)}
				</Text>
			</View>

			<View
				style={{
					padding: 2 * vh,
					paddingTop: 0,
				}}
			>
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
										padding: 16,
									}}
								>
									<ParamTitle>{`params.${param}.title`}</ParamTitle>

									<FontAwesome6 name="chevron-up" size={16} style={{ marginTop: 4 }} />
								</RectButton>

								{optionsOpen &&
									Object.entries(type).map(([option, actualType], i) => (
										<View key={option} style={{ marginTop: i !== 0 ? 16 : 0 }}>
											{actualType !== "boolean" && (
												<ParamTitle>{`params.${option}.title`}</ParamTitle>
											)}

											<ParamInput
												option={option}
												param={param}
												state={inputParamsState}
												type={actualType}
											/>
										</View>
									))}
							</View>
						);
					}

					return (
						<View key={param} style={{ marginTop: 16 }}>
							<ParamTitle>{`params.${param}.title`}</ParamTitle>
							<ParamInput param={param} state={inputParamsState} type={type} />
						</View>
					);
				})}
			</View>
		</>
	);
}
