import { createContext, type PropsWithChildren, type SetStateAction, useCallback, useContext, useMemo, useState } from "react";

export type Errors = string[] | undefined;

export interface ErrorContext {
	errors: Errors;
	setErrors: (newValue: string | SetStateAction<Errors>) => void;
}

const ErrorContext = createContext<ErrorContext>(null as any);

export const ErrorProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [errors, setErrorsValue] = useState<Errors>(undefined);

	const setErrors: ErrorContext["setErrors"] = useCallback(newValue => {
		if (typeof newValue === "string") {
			newValue = [newValue];
		}

		setErrorsValue(newValue);
	}, []);

	const errorData: ErrorContext = useMemo(
		() => ({
			errors,
			setErrors,
		}),
		[errors, setErrors],
	);

	return <ErrorContext.Provider value={errorData}>{children}</ErrorContext.Provider>;
};

export const useError = (): ErrorContext => {
	const context = useContext(ErrorContext);
	if (!context) {
		throw new Error("useError must be used within an ErrorProvider");
	}

	return context;
};
