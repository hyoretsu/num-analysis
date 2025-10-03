"use client";
import { useMethodData } from "@context/methodData";
import { fixNumber } from "@hyoretsu/utils";
import { Accordion, Stack, Table, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { type AllMethods, allMethods } from "numerical-methods";

export default function Results() {
	const t = useTranslations();

	const params = useParams();
	const method = params.method as AllMethods;

	const { params: methodParams } = useMethodData();

	console.log(method);

	const { details, result } = allMethods[method](methodParams as any) as { details: Record<string, any>[]; result: any };

	console.log(details, result);

	return (
		<>
			<Title>Resultado</Title>

			<Accordion className="w-[70%]" variant="filled">
				<Accordion.Item value="default">
					<Accordion.Control className="!w-fit mx-auto">{t("details")}</Accordion.Control>
					<Accordion.Panel>
						<Text>{`${t("method")}: ${t(`methods.${method}`)}`}</Text>

						{Object.entries(methodParams).flatMap(paramInfo => {
							let params: [string, any][] | undefined;

							if (paramInfo[0] === "options") {
								params = Object.entries(paramInfo[1]);
							} else {
								params = [paramInfo];
							}

							return params.map(([param, value]) => {
								let valueText: string;
								if (Array.isArray(value)) {
									valueText = `[${value.toString().replace(",", ", ")}]`;
								} else {
									valueText = value.toString();
								}

								return <Text key={param}>{`${t(`methods.params.${param}`)}: ${valueText}`}</Text>;
							});
						})}
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>

			<Stack className="mt-4" gap="xs">
				<Text>
					Após {result.iterations} iterações, para uma precisão de {methodParams.precision.toLocaleString()}, encontramos que a
					raíz dessa equação é:
				</Text>
				<Text className="!mx-auto">{fixNumber(Number(result.x))}</Text>

				{/* <Text>
					O valor da integral de {methodParams.x[0]} a {methodParams.x[1]} é aproximadamente {result.toFixed(6)}, com uma taxa de{" "}
					erro esperada de {details.error}%.
				</Text> */}
			</Stack>

			<Text className="!mt-4 self-start">Detalhes das iterações:</Text>

			<Table.ScrollContainer className="!max-w-full relative" maxHeight="40vh" minWidth="100%">
				<Table
					classNames={{
						table: "max-h-full max-w-full",
						th: "text-center whitespace-nowrap",
						tr: "text-center whitespace-nowrap",
					}}
					data={{
						body: details.map(item => [
							fixNumber(item.iteration),
							fixNumber(item.prevX),
							fixNumber(item.prevY),
							fixNumber(item.diffY),
							fixNumber(item.x),
							fixNumber(item.condition1),
							fixNumber(item.condition2),
							fixNumber(item.condition2),
							fixNumber(item.condition2),
						]),
						head: [
							"Iteração (k)",
							"Valor (xₖ₋₁)",
							"Resultado (f(xₖ₋₁))",
							"Derivada (f'(xₖ₋₁))",
							"Próximo valor (xₖ)",
							"Diferença absoluta (|xₖ - xₖ₋₁|)",
							"Resultado absoluto (|f(xₖ₋₁)|)",
							"Resultado absoluto (|f(xₖ₋₁)|)",
							"Resultado absoluto (|f(xₖ₋₁)|)",
						],
					}}
					stickyHeader
				/>
			</Table.ScrollContainer>
		</>
	);
}
