import { fixNumber } from "@hyoretsu/utils";
import type { SimpleZerosFunction, allMethods, categorizedMethods } from "numerical-methods";
import { Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import type { MethodResultsProps } from ".";

export default function FunctionZeros({ details, result }) {
	console.log(result);
	return (
		<>
			<Text>Resultado:</Text>
			<Text>
				Após {result.iterations} iterações, para uma precisão de {(1e-3).toLocaleString()},
				encontramos a raíz dessa equação entre {fixNumber(Number(result.interval[0]))} e{" "}
				{fixNumber(Number(result.interval[1]))}.
			</Text>

			<View>
				<Text>Detalhes das iterações</Text>

				<FlatList data={details} />
			</View>
		</>
	);
}
