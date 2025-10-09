"use client";
import { Checkbox, Flex, Select, TextInput } from "@mantine/core";
import { digitFromSuperscript } from "@utils";
import { parse } from "mathjs";
import type { ParamComponentsProps } from ".";

export function BaseInput({ index, label, name, placeholder, required, setParam, transform = value => value }: ParamComponentsProps) {
	return (
		<TextInput
			className="flex-1"
			label={label}
			onChange={e => setParam(name, transform(e.target.value), index)}
			placeholder={placeholder}
			required={required}
		/>
	);
}

export function BooleanInput({ label, name, setParam, transform, values, ...props }: ParamComponentsProps) {
	return (
		<Checkbox
			{...props}
			key={label}
			label={label}
			onChange={e => {
				setParam(name, e.target.checked);
			}}
		/>
	);
}

export function EnumInput({ label, name, setParam, values, ...props }: ParamComponentsProps) {
	return (
		<Select
			key={label}
			{...props}
			data={values!}
			label={label}
			onChange={value => {
				setParam(name, value);
			}}
		/>
	);
}

export function IntervalInput({ label, placeholder, ...props }: ParamComponentsProps) {
	const labels = label.split(",");
	const placeholders = placeholder?.split(",");

	return (
		<Flex gap="lg" key={label}>
			<BaseInput
				{...props}
				index={0}
				label={labels[0]}
				placeholder={placeholders?.[0]}
				transform={value => parse(value).evaluate()}
			/>
			<BaseInput
				{...props}
				index={1}
				label={labels[1]}
				placeholder={placeholders?.[1]}
				transform={value => parse(value).evaluate()}
			/>
		</Flex>
	);
}

export function NumberArrayInput({ label, ...props }: ParamComponentsProps) {
	return (
		<BaseInput
			{...props}
			key={label}
			label={label}
			transform={value => {
				const values = value
					.replaceAll(" ", "")
					.split(",")
					.filter(each => each);

				if (values.length === 0) {
					return undefined;
				}

				return values;
			}}
		/>
	);
}

export function NumberInput({ label, ...props }: ParamComponentsProps) {
	return <BaseInput key={label} {...props} label={label} transform={value => parse(value).evaluate()} />;
}

export function StringInput({ label, ...props }: ParamComponentsProps) {
	return <BaseInput key={label} {...props} label={label} transform={value => value.replace(/./g, digitFromSuperscript)} />;
}
