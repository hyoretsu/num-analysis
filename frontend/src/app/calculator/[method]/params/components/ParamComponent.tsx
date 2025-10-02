import { NumberInput, TextInput } from "@mantine/core";
import type { JSX } from "react";

export interface ParamComponentsProps {
	label: string;
	onChange: (value: any) => void;
	placeholder?: string | undefined;
}

export const paramComponents = new Map<string, (props: ParamComponentsProps) => JSX.Element>([
	[
		"number",
		({ label, onChange, placeholder }: ParamComponentsProps) => (
			<NumberInput key={label} label={label} onChange={onChange} placeholder={placeholder} />
		),
	],
	[
		"string",
		({ label, onChange, placeholder }: ParamComponentsProps) => (
			<TextInput key={label} label={label} onChange={onChange} placeholder={placeholder} />
		),
	],
]);
