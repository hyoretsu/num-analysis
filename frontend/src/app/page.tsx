"use client";
import { Accordion, Title } from "@mantine/core";
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
					.sort(([a], [b]) => t(`categories.${a}`).localeCompare(t(`categories.${b}`)))
					.map(([category, methods]) => (
						<Accordion.Item key={category} value={category}>
							<Accordion.Control>{t(`categories.${category}`)}</Accordion.Control>
							<Accordion.Panel className="cursor-pointer">
								<div className="overflow-hidden rounded-lg">
									{Object.keys(methods).map(method => (
										<p
											className="border-(--item-border-color) border-t bg-white p-(--mantine-spacing-md) hover:bg-(--item-filled-color) [&:first-child]:border-t-0"
											key={method}
											onClick={() => push(`/${method}/calculator/params`)}
										>
											{t(`${method}`)}
										</p>
									))}
								</div>
							</Accordion.Panel>
						</Accordion.Item>
					))}
			</Accordion>
		</>
	);
}
