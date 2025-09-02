import { allMethods } from "numerical-methods";

console.log(
	allMethods.newtonRaphson({
		func: "500 + 0.80x + 4.1 * 10^(-5)*x^2 + 2.1 * 10^(-7)*x^3 + 4.80 * 10^(-10)*x^4 - (1000 + 0.22x + 6.80 * 10^(-5)x^2 + 8.80 * 10^(-7)x^2)",
		initialX: 1500,
		precision: 1e-9,
		options: {
			bail: false,
			conditionsWhitelist: [true, true],
			maxIterations: 0,
			origFunc: "",
			relativeError: false,
		},
	}),
);
