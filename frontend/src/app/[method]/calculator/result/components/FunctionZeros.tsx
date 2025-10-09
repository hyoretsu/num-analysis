"use client";
import { fixNumber } from "@hyoretsu/utils";
import { Stack, Table, Text } from "@mantine/core";
import type { useTranslations } from "next-intl";
import type { FunctionZeros } from "numerical-methods";

export interface FunctionZerosResultsProps {
	details: FunctionZeros.Details[];
	method: string;
	methodParams: FunctionZeros.Params;
	result: FunctionZeros.Result;
	t: ReturnType<typeof useTranslations>;
}

const detailsOrder = [
	"iteration",
	"interval", // Bisection
	"results", // Bisection
	"prevX", // Newton-Raphson
	"prevY", // Newton-Raphson
	"diffY", // Newton-Raphson
	"x",
	"condition1",
	"condition2",
];

export function FunctionZerosResults({ details, method, methodParams, result, t }: FunctionZerosResultsProps) {
	const isSingleResult = method === "newtonRaphson";

	return (
		<>
			<Stack className="mt-4" gap="xs">
				<Text>
					Após {result.iterations} iterações, para uma precisão de {methodParams.precision.toLocaleString()}, encontramos que a
					raíz dessa equação {isSingleResult ? "é" : "está entre"}:
				</Text>

				{isSingleResult ? (
					<Text className="!mx-auto">{fixNumber(Number((result as any).x))}</Text>
				) : (
					<Text className="!mx-auto">
						{fixNumber(Number(result.interval[0]))} e {fixNumber(Number(result.interval[1]))}
					</Text>
				)}
			</Stack>

			<Text className="!mt-4 self-start">Detalhes das iterações:</Text>
			<Table.ScrollContainer className="!max-w-full relative" maxHeight="40vh" minWidth="100%">
				<Table
					classNames={{
						table: "max-h-full max-w-full",
						th: "!text-center whitespace-nowrap",
						tr: "!text-center whitespace-nowrap",
					}}
					data={{
						body: details.map(item =>
							Object.entries(item)
								.sort(([a], [b]) => detailsOrder.indexOf(a) - detailsOrder.indexOf(b))
								.flatMap(([, value]) => (Array.isArray(value) ? value : [value]).map(each => fixNumber(each))),
						),
						head: Object.keys(details[0])
							.sort((a, b) => detailsOrder.indexOf(a) - detailsOrder.indexOf(b))
							.flatMap(each => {
								const translation = t(each);

								if (translation.includes(",")) {
									return translation.split(",");
								}

								return [translation];
							}),
					}}
					stickyHeader
					withColumnBorders
					withTableBorder
				/>
			</Table.ScrollContainer>
		</>
	);
}
