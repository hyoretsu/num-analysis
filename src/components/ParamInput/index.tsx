import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Checkbox from "@components/Checkbox";
import ParamTitle from "@components/ParamTitle";

export type InputParams = Record<string, any>;

export interface ParamInputProps {
	option?: string;
	param: string;
	state: [state: any, setState: Dispatch<SetStateAction<InputParams>>];
	type: string;
}

export default function ParamInput({ option, param, state: stateArr, type }: ParamInputProps) {
	const { t } = useTranslation();

	let state = stateArr[0][param];
	if (option) {
		state = state[option];
	}

	function setState(value: any, position?: number) {
		let newState: any;

		if (position !== undefined) {
			newState = [...state];
			newState[position] = value;
		} else {
			newState = value;
		}

		stateArr[1](old => {
			if (option) {
				return {
					...old,
					[param]: {
						...old[param],
						[option]: newState,
					},
				};
			} else {
				return {
					...old,
					[param]: newState,
				};
			}
		});
	}

	let placeholder = "";

	if (type === "string") {
		if (param === "func" || option === "origFunc") {
			placeholder = "2x^2 + x - 3";
		}
	} else if (type === "number") {
		if (option === "maxIterations") {
			placeholder = "100";
		}
		if (param === "precision") {
			placeholder = t("method.calculator.params.precision.placeholder");
		}
	} else if (type.at(0) === "[" && type.at(-1) === "]") {
		// const types = type.slice(1, -1).split(",");
	}

	if (type === "[number,number]") {
		return (
			<View
				style={{
					flexDirection: "row",
					marginTop: 4,
				}}
			>
				<View
					style={{
						borderColor: "#00000033",
						borderRadius: 4,
						borderWidth: 1.5,
						flex: 1,
					}}
				>
					<TextInput
						value={state[0]}
						keyboardType={"number-pad"}
						placeholder={t("method.calculator.params.from")}
						placeholderTextColor="#CACACA"
						onChangeText={value => setState(Number(value.replace(",", ".")), 0)}
						style={{
							paddingHorizontal: 16,
							paddingVertical: 8,
						}}
					/>
				</View>

				<View
					style={{
						borderColor: "#00000033",
						borderRadius: 4,
						borderWidth: 1.5,
						flex: 1,
						marginLeft: 16,
					}}
				>
					<TextInput
						value={state[1]}
						keyboardType={"number-pad"}
						placeholder={t("method.calculator.params.to")}
						placeholderTextColor="#CACACA"
						onChangeText={value => setState(Number(value.replace(",", ".")), 1)}
						style={{
							paddingHorizontal: 16,
							paddingVertical: 8,
						}}
					/>
				</View>
			</View>
		);
	} else if (type === "[boolean,boolean]") {
		return (
			<View
				style={{
					flexDirection: "row",
					marginTop: 4,
				}}
			>
				<Checkbox
					checked={state[0]}
					onPress={() => setState(!state[0], 0)}
					title={t("method.calculator.params.condition1")}
				/>

				<Checkbox
					checked={state[1]}
					onPress={() => setState(!state[1], 1)}
					title={t("method.calculator.params.condition2")}
				/>
			</View>
		);
	}

	return (
		<View
			style={[
				{ marginTop: 4 },
				type !== "boolean" && {
					borderColor: "#00000033",
					borderRadius: 4,
					borderWidth: 1.5,
				},
			]}
		>
			{type === "boolean" ? (
				<View>
					<ParamTitle>{t(`method.calculator.params.${option || param}.title`)}</ParamTitle>

					<Checkbox checked={state} onPress={() => setState(!state)} />
				</View>
			) : (
				<TextInput
					value={state}
					keyboardType={type === "number" ? "number-pad" : "default"}
					placeholder={placeholder}
					placeholderTextColor="#CACACA"
					onChangeText={text => (type === "number" ? setState(Number(text)) : setState(text))}
					style={{
						paddingHorizontal: 16,
						paddingVertical: 8,
					}}
				/>
			)}
		</View>
	);
}
