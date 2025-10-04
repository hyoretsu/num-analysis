import { methodKeys } from "numerical-methods";
import type { PropsWithChildren } from "react";

export default function MethodLayout({ children }: PropsWithChildren) {
	return children;
}

export async function generateStaticParams() {
	return methodKeys.map(method => ({ method }));
}
