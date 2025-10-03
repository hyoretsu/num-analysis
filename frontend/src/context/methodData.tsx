import { useDebouncedState } from "@mantine/hooks";
import { createContext, type PropsWithChildren, type SetStateAction, useContext, useMemo } from "react";

type MethodData = Record<string, any>;

interface MethodDataContext {
	params: MethodData;
	setParams: (newValue: SetStateAction<MethodData>) => void;
}

const MethodDataContext = createContext<MethodDataContext>(null as unknown as MethodDataContext);

export const MethodDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [params, setParams] = useDebouncedState<MethodData>({}, 1000);

	const methodData: MethodDataContext = useMemo(() => ({ params, setParams }), [params, setParams]);

	return <MethodDataContext.Provider value={methodData}>{children}</MethodDataContext.Provider>;
};

export const useMethodData = (): MethodDataContext => {
	const context = useContext(MethodDataContext);
	if (!context) {
		throw new Error("useMethodData must be used within an MethodDataProvider");
	}

	return context;
};
