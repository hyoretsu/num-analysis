"use client";
import { useMethodData } from "@context/methodData";
import { Accordion, Button, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { type AllMethods, methodCategories, paramsList } from "numerical-methods";
import { useEffect, useMemo } from "react";
import { getParamComponent } from "./components";

type MethodParams = string[];

export default function ParamsPage() {
	const dynamicParams = useParams();
	const t = useTranslations("methods");

	const method = dynamicParams.method as AllMethods;

	const { options, params } = useMemo(() => {
		const params: MethodParams[] = [];
		const options: MethodParams[] = [];

		Object.entries(paramsList[method]).forEach(([name, value]) => {
			if (typeof value !== "string") {
				options.push(
					...Object.entries(value as Record<string, string>)
						.filter(([name2]) => !["conditionsWhitelist", "relativeError"].includes(name2))
						.map(([name2, value2]) => [name2, value2]),
				);
				return;
			}

			params.push([name, value]);
		});

		return { options, params };
	}, [method]);

	const { setParam, setParams } = useMethodData();

	// Initialize default params
	useEffect(() => {
		setParam("precision", 1e-9);

		return () => setParams({});
	}, [setParam, setParams]);

	return (
		<section className="flex flex-col items-center gap-4">
			<Title>{t(method)}</Title>
			<Text>{t(`categories.${methodCategories[method]}`)}</Text>

			<div className="w-full">
				{params.map(([name, type]) =>
					getParamComponent({
						label: t(`params.${name}`),
						name,
						setParam,
						t,
						type,
					}),
				)}

				{options.length > 0 && (
					<Accordion className="mt-4 w-full" variant="contained">
						<Accordion.Item value="options">
							<Accordion.Control>{t("options")}</Accordion.Control>
							<Accordion.Panel>
								{options.map(([name, type]) =>
									getParamComponent({
										label: t(`params.${name}`),
										name,
										setParam,
										t,
										type,
									}),
								)}
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				)}
			</div>

			<Button onClick={() => {}}>Calcular</Button>
		</section>
	);
}
