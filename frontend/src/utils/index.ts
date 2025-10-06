export * from "./digitFromSuperscript";

export const getNameRequired = (paramType: string) => {
	let [type, required] = paramType.split("?");

	let values: string[] | undefined;
	if (type.includes("|")) {
		values = type.split("|");
		type = "enum";
	}

	return {
		required: required === undefined,
		type,
		values,
	};
};

export const isOptionalParam = (param: string): boolean => {
	return param.startsWith("options") || param === "precision";
};

export interface IsValidParamArgs {
	param: string;
	type: string;
	value: any;
}

export const isValidParam = ({ param, type, value }: IsValidParamArgs): boolean => {
	const isTuple = type.includes(",");
	const isOptional = isOptionalParam(param);

	if ((!isOptional && (!value || Number.isNaN(value))) || (isTuple && value.length !== type.split(",").length)) {
		return false;
	}

	return true;
};
