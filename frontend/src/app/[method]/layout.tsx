import { categorizedMethods } from "numerical-methods";
import type { PropsWithChildren } from "react";

export default function MethodLayout({ children }: PropsWithChildren) {
	return children;
}

export async function generateStaticParams() {
	return Object.entries(categorizedMethods)
		.filter(([category]) => category !== "linearSystems")
		.flatMap(([, methods]) => Object.keys(methods))
		.map(method => ({ method }));
}
