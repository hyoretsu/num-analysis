import { useLocalSearchParams } from "expo-router";
import { type AllMethods, allMethods } from "numerical-methods";
import { ScrollView } from "react-native-gesture-handler";

import MethodResults from "@components/MethodResults";

function digitFromSuperscript(superChar: string): string {
	var result = "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(superChar);

	if (result > -1) {
		return `^${String(result)}`;
	} else {
		return superChar;
	}
}

export default function Results() {
	const {
		method = "bisection",
		// eslint-disable-next-line quotes
		params = '{"func":"5x^2","interval":[-1,1],"precision":0,"options":{"bail":false,"conditionsWhitelist":[true,true],"maxIterations":0,"origFunc":"","relativeError":false}}',
	} = useLocalSearchParams<{ method: AllMethods; params: string }>();

	let result = allMethods[method!](JSON.parse(params!.replace(/./g, digitFromSuperscript))) as Record<
		string,
		any
	>;
	let details = {};

	if (typeof result === "object") {
		({ details, result } = result);
	}

	console.log(result);
	console.log(details);

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				padding: 16,
				paddingTop: 0,
			}}
		>
			<MethodResults method={method} details={details} result={result} />
		</ScrollView>
	);
}
