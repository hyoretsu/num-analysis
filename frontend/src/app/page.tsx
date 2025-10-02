"use client";
import { Accordion, Card, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { categorizedMethods } from "numerical-methods";

export default function Home() {
	const t = useTranslations("methods");
	const { push } = useRouter();

	return (
		<>
			<Title>{t("list")}</Title>

			<Accordion className="mt-4 w-full" variant="contained">
				{Object.entries(categorizedMethods)
					.filter(([category]) => category !== "linearSystems")
					.sort(([a], [b]) => t(`titles.${a}`).localeCompare(t(`titles.${b}`)))
					.map(([category, methods]) => (
						<Accordion.Item key={category} value={category}>
							<Accordion.Control>{t(`titles.${category}`)}</Accordion.Control>
							<Accordion.Panel>
								{Object.keys(methods).map(method => (
									<Card key={method} onClick={() => push(`/calculator/${method}/params`)}>
										{t(`${method}`)}
									</Card>
								))}
							</Accordion.Panel>
						</Accordion.Item>
					))}
			</Accordion>
		</>
	);
}
