"use client";
import { useError } from "@context/error";
import { useMethodData } from "@context/methodData";
import { Accordion, Stack, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { type AllMethods, allMethods, methodCategories } from "numerical-methods";
import { useEffect, useState } from "react";
import { resultComponents } from "./components";

export default function Results() {
	const t = useTranslations();

	const params = useParams();
	const method = params.method as AllMethods;

	const { setErrors } = useError();
	const { params: methodParams } = useMethodData();
	const { replace } = useRouter();

	const hasParams = methodParams && Object.keys(methodParams).length > 0;

	useEffect(() => {
		if (!hasParams) {
			setErrors("noParams");
			replace(`/${method}/calculator/params`);
		}
	}, [hasParams, method, replace, setErrors]);

	const [methodResults, setMethodResults] = useState<{ result: any; details: any[] }>();
	useEffect(() => {
		if (!hasParams) {
			return;
		}

		try {
			console.log(JSON.stringify(methodParams, null, 2));
			setMethodResults(allMethods[method](methodParams as any) as any);
		} catch {
			setErrors("unexpected");
			replace(`/${method}/calculator/params`);
		}
	}, [hasParams, method, methodParams, replace, setErrors]);

	if (!hasParams || !methodResults) {
		return null;
	}

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
				t: (key: string) => t(`methods.results.${method}.${key}`),
			})}
		</Stack>
	);
}
