"use client";
import { useMethodData } from "@context/methodData";
import { Accordion, Button, Text, Title } from "@mantine/core";
import { digitFromSuperscript } from "@utils";
import { parse } from "mathjs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { type AllMethods, methodCategories, paramsList } from "numerical-methods";
import { type ChangeEvent, useMemo } from "react";
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
	const t = useTranslations("methods");
	const dynamicParams = useParams();

	const { setParams } = useMethodData();
	const paramUpdateFuncs = useMemo(
		() =>
			new Map<string, (value: any) => void>([
				[
					"func",
					(e: ChangeEvent<HTMLInputElement>) =>
						setParams((old: any) => ({
							...old,
							func: e.target.value.replace(/./g, digitFromSuperscript),
						})),
				],
				[
					"initialX",
					(e: string | number) =>
						setParams((old: any) => ({
							...old,
							initialX: Number(e),
						})),
				],
				[
					"precision",
					(e: ChangeEvent<HTMLInputElement>) =>
						setParams((old: any) => ({
							...old,
							precision: parse(e.target.value),
						})),
				],
			]),
		[setParams],
	);

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

	return (
		<section className="flex flex-col items-center gap-4">
			<Title>{t(method)}</Title>
			<Text>{t(`categories.${methodCategories[method]}`)}</Text>

			<div className="w-full">
				{params.map(([name, value]) =>
					paramComponents.get(value)?.({
						label: t(`params.${name}`),
						onChange: paramUpdateFuncs.get(name)!,
						placeholder: paramPlaceholders.get(name)?.toString(),
					}),
				)}

				<Accordion className="mt-4 w-full" variant="contained">
					<Accordion.Item value="options">
						<Accordion.Control>{t("options")}</Accordion.Control>
						<Accordion.Panel>
							{options.map(([name, value]) =>
								paramComponents.get(value)?.({
									label: t(`params.${name}`),
									onChange: paramUpdateFuncs.get(name)!,
									placeholder: paramPlaceholders.get(name)?.toString(),
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
