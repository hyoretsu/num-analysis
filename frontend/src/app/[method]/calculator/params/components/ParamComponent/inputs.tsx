import { Checkbox, Flex, Select, TextInput } from "@mantine/core";
import { digitFromSuperscript } from "@utils";
import { debounce } from "es-toolkit";
import { parse } from "mathjs";
import type { ChangeEvent } from "react";
import type { ParamComponentsProps } from ".";

const debouncedUpdate = ({ name, setParam, transform = value => value }: Pick<ParamComponentsProps, "name" | "setParam" | "transform">) =>
	debounce((e: ChangeEvent<HTMLInputElement>) => {
		setParam(name, transform(e.target.value));
	}, 1000);

export function BaseInput({ label, placeholder, required, ...updateProps }: ParamComponentsProps) {
	return (
		<TextInput className="flex-1" label={label} onChange={debouncedUpdate(updateProps)} placeholder={placeholder} required={required} />
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

export function EnumInput({ label, name, setParam, transform, values, ...props }: ParamComponentsProps) {
	return (
		<Select
			key={label}
			{...props}
			data={values!}
			label={label}
			onSelect={debouncedUpdate({
				name,
				setParam,
				transform,
			})}
		/>
	);
}

export function IntervalInput({ label, placeholder, ...props }: ParamComponentsProps) {
	const labels = label.split(",");
	const placeholders = placeholder?.split(",");

	return (
		<Flex gap="lg" key={label}>
			<BaseInput {...props} label={labels[0]} placeholder={placeholders?.[0]} transform={parse} />
			<BaseInput {...props} label={labels[1]} placeholder={placeholders?.[1]} transform={parse} />
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
