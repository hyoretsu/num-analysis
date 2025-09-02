"use client";
import { Button, NumberInput, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { digitFromSuperscript } from "@utils";
import { parse } from "mathjs";
import { allMethods, type FunctionZerosMethods } from "numerical-methods";
import { useState } from "react";
import { methodComponentes } from "./components";

export default function Results() {
  const [method, setMethod] = useState<FunctionZerosMethods>("newtonRaphson");
  const [params, setParams] = useDebouncedState<any>({}, 1000);
  const [result, setResult] = useState<Record<string, any>>();
  // const {
  //   method = ,
  //   args = '{"func":"500 + 0.80x + 4.1 * 10^(-5)*x^2 + 2.1 * 10^(-7)*x^3 + 4.80 * 10^(-10)*x^4 - (1000 + 0.22x + 6.80 * 10^(-5)x^2 + 8.80 * 10^(-7)x^2)","initialX":1500,"precision":1e-9}',
  // } = useParams<{
  //   method: AllMethods;
  //   args: string;
  // }>();

  // switch (method) {
  //   case "newtonRaphson": {
  //     const { details, result } = returnValue as FunctionZeros.NewtonRaphson.Return;

  //     return <NewtonRaphson details={details} params={parsedParams} result={result} />;
  //   }

  //   default:
  //     return null;
  // }

  return (
    <>
      <section className="flex flex-col gap-4">
        <TextInput
          label="Função"
          onChange={e =>
            setParams((old: any) => ({
              ...old,
              func: e.target.value.replace(/./g, digitFromSuperscript),
            }))
          }
          placeholder="10x^(3x) + 5x + 2"
        />

        <NumberInput
          label="X Inicial"
          onChange={e =>
            setParams((old: any) => ({
              ...old,
              initialX: Number(e),
            }))
          }
          placeholder="0"
        />

        <TextInput
          label="Precisão"
          onChange={e =>
            setParams((old: any) => ({
              ...old,
              precision: parse(e.target.value),
            }))
          }
          placeholder="1e-9 ou 1*10^(-9)"
        />

        <Button
          onClick={() => {
            const a = allMethods[method!](params);
            setResult(a);
          }}
        >
          Calcular
        </Button>
      </section>

      {result && methodComponentes.get(method)!({ params, result })}
    </>
  );
}
