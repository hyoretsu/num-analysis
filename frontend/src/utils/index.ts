export * from "./digitFromSuperscript";

export const getNameRequired = (param: string) => {
	let [type, required] = param.split("?");

	let values: string[] | undefined;
	if (type.includes("|")) {
		values = type.split("|");
		type = "enum";
	}

	return {
		required: !!required,
		type,
		values,
	};
};
