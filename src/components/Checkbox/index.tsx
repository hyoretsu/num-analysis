import { CheckBox } from "@rneui/themed";

interface CheckboxProps {
	checked: boolean;
	onPress: () => void;
	title?: string;
}

export default function Checkbox({ checked, onPress, title }: CheckboxProps) {
	return (
		<CheckBox
			checked={checked}
			onPress={onPress}
			title={title}
			iconType="material-community"
			checkedIcon="checkbox-marked"
			uncheckedIcon="checkbox-blank-outline"
			checkedColor="#3700B3"
			containerStyle={{
				marginTop: -4,
				marginBottom: 4,
			}}
			textStyle={{
				color: "#4E4E4E",
				fontFamily: "Inter_500Medium",
				fontWeight: "normal",
			}}
		/>
	);
}
