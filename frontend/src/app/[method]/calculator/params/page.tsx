"use client";
import { useError } from "@context/error";
import { useMethodData } from "@context/methodData";
import { Accordion, Button, Text, Title } from "@mantine/core";
import { isValidParam } from "@utils";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { type AllMethods, methodCategories, paramsList } from "numerical-methods";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { getParamComponent } from "./components";

type MethodParams = string[];

export default function ParamsPage() {
	const dynamicParams = useParams();
	const { push } = useRouter();
	const t = useTranslations("methods");

	const method = dynamicParams.method as AllMethods;

	const { options, params } = useMemo(() => {
		const params: MethodParams[] = [];
		const options: MethodParams[] = [];

		Object.entries(paramsList[method]).forEach(([param, type]) => {
			if (typeof type !== "string") {
				options.push(
					...Object.entries(type as Record<string, string>)
						.filter(([param2]) => !["conditionsWhitelist", "relativeError"].includes(param2))
						.map(([param2, type2]) => [param2, type2]),
				);
				return;
			}

			params.push([param, type]);
		});

		return { options, params };
	}, [method]);

	const { errors, setErrors } = useError();
	const { params: inputParams, setParam, setParams } = useMethodData();

	useEffect(() => {
		if (!errors) {
			return;
		}

		errors.forEach(error => {
			toast.error(t(`errors.${error}`));
		});

		setErrors(undefined);
	}, [errors, setErrors, t]);

	// Initialize default params
	useEffect(() => {
		setParams({ precision: 1e-9 });
	}, [setParams]);

	const calculateResult = () => {
		for (const [param, type] of Object.entries(paramsList[method])) {
			if (param === "options" || param === "precision") {
				continue;
			}

			const isValid = isValidParam({
				param,
				type: type as string,
				value: inputParams[param],
			});

			if (!isValid) {
				const field = t(`params.${param}`);

				if (field.includes(",")) {
					toast.error(
						t("errors.requiredMultiple", {
							field: field
								.split(",")
								.map(each => `"${each}"`)
								.join(" e "),
						}),
					);
				} else {
					toast.error(t("errors.required", { field }));
				}

				return;
			}
		}

		push(`/${method}/calculator/result`);
	};

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
										name: `options.${name}`,
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

			<Button onClick={calculateResult}>Calcular</Button>
		</section>
	);
}
