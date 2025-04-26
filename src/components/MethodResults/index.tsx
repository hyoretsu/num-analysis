import FunctionZeros from "./FunctionZeros";

export interface MethodResultsProps {
	details: Record<string, any>;
	result: Record<string, any>;
}

export default function MethodResults({ method, ...props }: MethodResultsProps & { method: string }) {
	if (method === "bisection") {
		return <FunctionZeros {...props} />;
	}
}
