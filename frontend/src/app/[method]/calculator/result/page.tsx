"use client";
import { useMethodData } from "@context/methodData";
import { Accordion, Stack, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { type AllMethods, allMethods, methodCategories } from "numerical-methods";
import { resultComponents } from "./components";

export default function Results() {
	const t = useTranslations();

	const params = useParams();
	const method = params.method as AllMethods;

	const { params: methodParams } = useMethodData();

	const methodResults = allMethods[method](methodParams as any) as { result: any; details: any[] };

	return (
		<Stack align="center" className="w-full md:w-[70%]">
			<Title>Resultado</Title>

			<Accordion className="w-[70%] md:w-[40%]" variant="filled">
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

			{resultComponents.get(methodCategories[method])!({
				...methodResults,
				method,
				methodParams,
			})}
		</Stack>
	);
}
