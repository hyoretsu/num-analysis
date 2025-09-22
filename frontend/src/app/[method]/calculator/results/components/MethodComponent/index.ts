import type { AllMethods } from "numerical-methods";
import type { ReactElement } from "react";
import { NewtonRaphson } from "./NewtonRaphson";

export interface MethodComponentProps<P, R> {
	params: P;
	result: R;
}

export const methodComponentes = new Map<AllMethods, (props: MethodComponentProps<any, any>) => ReactElement>([
	["newtonRaphson", NewtonRaphson],
]);
