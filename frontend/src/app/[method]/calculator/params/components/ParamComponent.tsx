import type { MethodDataContext } from "@context/methodData";
import { Flex, TextInput } from "@mantine/core";
import { digitFromSuperscript } from "@utils";
import { debounce } from "es-toolkit";
import { parse } from "mathjs";
import type { ChangeEvent, JSX } from "react";

export interface ParamComponentsProps {
	label: string;
	name: string;
	setParam: MethodDataContext["setParam"];
	placeholder?: string | undefined;
}

export const paramComponents = new Map<string, (props: ParamComponentsProps) => JSX.Element>([
	[
		"number",
		({ label, name, setParam, placeholder }: ParamComponentsProps) => (
			<TextInput
				key={label}
				label={label}
				onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
					setParam(name, parse(e.target.value));
				}, 1000)}
				placeholder={placeholder}
			/>
		),
	],
	[
		"[number,number]",
		({ label, name, setParam, placeholder }: ParamComponentsProps) => {
			const labels = label.split(",");
			const placeholders = placeholder?.split(",");

			return (
				<Flex align="end" gap="lg" key={label}>
					<TextInput
						label={labels[0]}
						onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
							setParam(name, parse(e.target.value));
						}, 1000)}
						placeholder={placeholders?.[0]}
					/>
					<TextInput
						label={labels[1]}
						onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
							setParam(name, parse(e.target.value));
						}, 1000)}
						placeholder={placeholders?.[1]}
					/>
				</Flex>
			);
		},
	],
	[
		"string",
		({ label, name, setParam, placeholder }: ParamComponentsProps) => (
			<TextInput
				key={label}
				label={label}
				onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
					setParam(name, e.target.value.replace(/./g, digitFromSuperscript));
				}, 1000)}
				placeholder={placeholder}
			/>
		),
	],
]);
