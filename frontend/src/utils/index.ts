export * from "./digitFromSuperscript";

export const isOptionalParam = (param: string): boolean => {
	return param.startsWith("options") || param === "precision";
};

export const isValidParam = (param: string, value: any): boolean => {
	const isOptional = isOptionalParam(param);
	if (!isOptional && (!value || Number.isNaN(value))) {
		return false;
	}

	return true;
};
