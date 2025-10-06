import type { MethodCategories } from "numerical-methods";
import type { ReactElement } from "react";
import { FunctionZerosResults } from "./FunctionZeros";
import { IntegrationResults } from "./Integration";
import { InterpolationResults } from "./Interpolation";

export const resultComponents = new Map<Partial<MethodCategories>, (props: any) => ReactElement>([
	["custom", FunctionZerosResults],
	["functionZeros", FunctionZerosResults],
	["integration", IntegrationResults],
	["interpolation", InterpolationResults],
]);
