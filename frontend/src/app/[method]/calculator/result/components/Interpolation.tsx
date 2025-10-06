import { fixNumber } from "@hyoretsu/utils";
import { Stack, Text } from "@mantine/core";
import { parse, simplify } from "mathjs";
import type { Interpolation } from "numerical-methods";

export interface InterpolationResultsProps {
	details: Interpolation.Details;
	result: Interpolation.Result;
}

export function InterpolationResults({ details, result }: InterpolationResultsProps) {
	return (
		<Stack align="center" className="md:w-[50%] [&>*]:text-center">
			<Text>O polinômio interpolador para os pontos fornecidos é:</Text>
			<Text>{simplify(parse(result)).toString()}</Text>

			{details.targetResult !== undefined && (
				<Text>O valor interpolado no ponto solicitado é: {fixNumber(details.targetResult).toLocaleString()}</Text>
			)}

			<Text>Em breve visualização gráfica...</Text>
		</Stack>
	);
}
