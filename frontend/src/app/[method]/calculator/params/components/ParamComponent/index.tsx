import type { MethodDataContext } from "@context/methodData";
import { getNameRequired } from "@utils";
import type { useTranslations } from "next-intl";
import type { ReactElement } from "react";
import { BooleanInput, EnumInput, IntervalInput, NumberArrayInput, NumberInput, StringInput } from "./inputs";

export interface ParamComponentsProps {
	label: string;
	name: string;
	setParam: MethodDataContext["setParam"];
	placeholder?: string | undefined;
	required: boolean;
	transform?: ((value: string) => any) | undefined;
	values?: string[] | undefined;
}

const components = new Map<string, (props: ParamComponentsProps) => ReactElement>([
	["boolean", BooleanInput],
	["enum", EnumInput],
	["number", NumberInput],
	["[number,number]", IntervalInput],
	["number[]", NumberArrayInput],
	["string", StringInput],
]);

const placeholders = new Map<string, string | number[]>([
	["", ""],
	["func", "10x^(3x) + 5x + 2"],
	["initialX", "0"],
	["interval", [0, 1]],
	["maxIterations", "100"],
	["origFunc", "5x + 10"],
	["pointN", "10"],
	["precision", "1e-9 ou 1*10^(-9)"],
	["target", "Direção"],
	["targetX", "3"],
	["x", "1, 5, 6, 10"],
	["y", "2, 6, 7, 11"],
]);

export interface GetParamComponentProps {
	label: string;
	name: string;
	setParam: MethodDataContext["setParam"];
	t: ReturnType<typeof useTranslations>;
	type: string;
}

export const getParamComponent = ({ label, name, setParam, t, type: typeO }: GetParamComponentProps) => {
	const { required, type, values } = getNameRequired(typeO);

	return components.get(type)!({
		label,
		name,
		placeholder: placeholders.get(name)?.toString(),
		required,
		setParam,
		...(values?.length && { values: values.map(each => t(`params.${each}`)) }),
	});
};
