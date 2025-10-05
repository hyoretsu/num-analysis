import { useDebouncedState } from "@mantine/hooks";
import { merge } from "es-toolkit";
import { createContext, type PropsWithChildren, type SetStateAction, useCallback, useContext, useMemo } from "react";

type MethodData = Record<string, any>;

export interface MethodDataContext {
	params: MethodData;
	setParam: (field: string, value: any) => void;
	setParams: (newValue: SetStateAction<MethodData>) => void;
}

const MethodDataContext = createContext<MethodDataContext>(null as unknown as MethodDataContext);

export const MethodDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [params, setParams] = useDebouncedState<MethodData>({}, 1000);

	const setParam = useCallback(
		(field: string, value: any) => {
			const fieldObj = {
				[field]: value,
			};

			setParams(old => merge(old, field.startsWith("options") ? { options: fieldObj } : fieldObj));
		},
		[setParams],
	);

	const methodData: MethodDataContext = useMemo(
		() => ({
			params,
			setParam,
			setParams,
		}),
		[params, setParam, setParams],
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
