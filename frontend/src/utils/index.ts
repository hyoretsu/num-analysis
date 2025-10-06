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
