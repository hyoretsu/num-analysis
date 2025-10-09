"use client";
import { Text } from "@mantine/core";
import type { Integration } from "numerical-methods";

export interface IntegrationResultsProps {
	details: Integration.Details;
	methodParams: Integration.Params;
	result: Integration.Result;
}

export function IntegrationResults({ details, result, methodParams }: IntegrationResultsProps) {
	return (
		<Text className="text-center md:w-[50%]">
			O valor da integral de {methodParams.interval[0]} a {methodParams.interval[1]} é aproximadamente {result.toFixed(6)}, com uma
			taxa de erro esperada de {details.error}%.
		</Text>
	);
}
