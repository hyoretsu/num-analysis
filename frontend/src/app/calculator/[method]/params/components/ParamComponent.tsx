import { Flex, NumberInput, TextInput } from "@mantine/core";
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
		"[number,number]",
		({ label, onChange, placeholder }: ParamComponentsProps) => {
			const labels = label.split(",");
			const placeholders = placeholder?.split(",");

			return (
				<Flex align="end" gap="lg" key={label}>
					<NumberInput label={labels[0]} onChange={onChange} placeholder={placeholders?.[0]} />
					<NumberInput label={labels[1]} onChange={onChange} placeholder={placeholders?.[1]} />
				</Flex>
			);
		},
	],
	[
		"string",
		({ label, onChange, placeholder }: ParamComponentsProps) => (
			<TextInput key={label} label={label} onChange={onChange} placeholder={placeholder} />
		),
	],
]);
