export const digitFromSuperscript = (superChar: string): string => {
	const result = "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(superChar);
	if (result < 0) {
		return superChar;
	}

	return `^${String(result)}`;
};
