import { merge } from "es-toolkit";
import { createContext, type PropsWithChildren, type SetStateAction, useCallback, useContext, useMemo, useState } from "react";

type MethodData = Record<string, any>;

export interface MethodDataContext {
	params: MethodData;
	setParam: (field: string, value: any, index?: number) => void;
	setParams: (newValue: SetStateAction<MethodData>) => void;
}

const MethodDataContext = createContext<MethodDataContext>(null as unknown as MethodDataContext);

export const MethodDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [params, setParams] = useState<MethodData>({});

	const setParam: MethodDataContext["setParam"] = useCallback((field, value, index) => {
		const parts = field.split("options.");
		const inOptions = parts.length > 1;
		if (inOptions) {
			field = parts[1];
		}

		const sentIndex = index !== undefined;

		const fieldObj: Record<string, any> = {};
		if (!sentIndex) {
			fieldObj[field] = value;
		}

		setParams(old => {
			if (sentIndex) {
				fieldObj[field] = (inOptions ? old.options : old)[field] ?? [];
				fieldObj[field][index] = value;
			}

			return merge(old, inOptions ? { options: fieldObj } : fieldObj);
		});
	}, []);

	const methodData: MethodDataContext = useMemo(
		() => ({
			params,
			setParam,
			setParams,
		}),
		[params, setParam],
	);

	return <MethodDataContext.Provider value={methodData}>{children}</MethodDataContext.Provider>;
};

export const useMethodData = (): MethodDataContext => {
	const context = useContext(MethodDataContext);
	if (!context) {
		throw new Error("useMethodData must be used within an MethodDataProvider");
	}

	return context;
};
