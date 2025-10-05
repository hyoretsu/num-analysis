"use client";
import { useMethodData } from "@context/methodData";
import { Accordion, Button, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { type AllMethods, methodCategories, paramsList } from "numerical-methods";
import { useEffect, useMemo } from "react";
import { paramComponents } from "./components";

type MethodParams = string[];

const paramPlaceholders = new Map<string, string | number[]>([
	["func", "10x^(3x) + 5x + 2"],
	["initialX", "0"],
	["interval", [0, 1]],
	["precision", "1e-9 ou 1*10^(-9)"],
	["maxIterations", "100"],
	["origFunc", "5x + 10"],
]);

export default function ParamsPage() {
	const dynamicParams = useParams();
	const t = useTranslations("methods");

	const method = dynamicParams.method as AllMethods;

	const { options, params } = useMemo(() => {
		const params: MethodParams[] = [];
		const options: MethodParams[] = [];

		Object.entries(paramsList[method]).forEach(([name, value]) => {
			if (typeof value !== "string") {
				options.push(...Object.entries(value).map(([name2, value2]) => [name2, value2]));
				return;
			}

			params.push([name, value]);
		});

		return { options, params };
	}, [method]);

	const { setParam, setParams } = useMethodData();

	// Initialize default params
	useEffect(() => {
		if (params.some(([param]) => param === "precision")) {
			setParams({
				precision: 1e-9,
			});
		}

		return () => setParams({});
	}, [params, setParams]);

	return (
		<section className="flex flex-col items-center gap-4">
			<Title>{t(method)}</Title>
			<Text>{t(`categories.${methodCategories[method]}`)}</Text>

			<div className="w-full">
				{params.map(([name, type]) =>
					paramComponents.get(type)?.({
						label: t(`params.${name}`),
						name,
						placeholder: paramPlaceholders.get(name)?.toString(),
						setParam,
					}),
				)}

				<Accordion className="mt-4 w-full" variant="contained">
					<Accordion.Item value="options">
						<Accordion.Control>{t("options")}</Accordion.Control>
						<Accordion.Panel>
							{options.map(([name, type]) =>
								paramComponents.get(type)?.({
									label: t(`params.${name}`),
									name,
									placeholder: paramPlaceholders.get(name)?.toString(),
									setParam,
								}),
							)}
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</div>

			<Button onClick={() => {}}>Calcular</Button>
		</section>
	);
}
