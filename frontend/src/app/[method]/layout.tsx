import type { PropsWithChildren } from "react";

export default function MethodLayout({ children }: PropsWithChildren) {
	return children;
}

export async function generateStaticParams() {
	return [{ method: "newtonRaphson" }];
}
