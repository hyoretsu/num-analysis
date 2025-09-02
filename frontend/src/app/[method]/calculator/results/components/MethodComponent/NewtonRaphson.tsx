"use client";
import { fixNumber } from "@hyoretsu/utils";
import { Table, Text, Title } from "@mantine/core";
import type { FunctionZeros } from "numerical-methods";
import type { MethodComponentProps } from ".";

export function NewtonRaphson({
  params,
  result: { details, result },
}: MethodComponentProps<FunctionZeros.NewtonRaphson.Params, FunctionZeros.NewtonRaphson.Return>) {
  console.log(params,details,result)
  return (
    <>
      <Title order={3}>Resultado</Title>
      <Text>
        Após {result.iterations} iterações, para uma precisão de {params.precision.toLocaleString()}, encontramos que a raíz dessa equação é{" "}
        {fixNumber(Number(result.x))}.
      </Text>

      <td className="whitespace-nowrap" />
      <Table.ScrollContainer className="relative" maxHeight="40vh" minWidth="100%">
        <Table
          classNames={{
            caption: "absolute bg-white w-full bottom-0",
            table: "max-h-full max-w-full",
            th: "text-center whitespace-nowrap",
            tr: "text-center whitespace-nowrap",
          }}
          data={{
            body: details.map(item => [
              fixNumber(item.iteration),
              fixNumber(item.prevX),
              fixNumber(item.prevY),
              fixNumber(item.diffY),
              fixNumber(item.x),
              fixNumber(item.condition1),
              fixNumber(item.condition2),
              fixNumber(item.condition2),
              fixNumber(item.condition2),
            ]),
            caption: "Detalhes das iterações",
            head: [
              "Iteração (k)",
              "Valor (xₖ₋₁)",
              "Resultado (f(xₖ₋₁))",
              "Derivada (f'(xₖ₋₁))",
              "Próximo valor (xₖ)",
              "Diferença absoluta (|xₖ - xₖ₋₁|)",
              "Resultado absoluto (|f(xₖ₋₁)|)",
              "Resultado absoluto (|f(xₖ₋₁)|)",
              "Resultado absoluto (|f(xₖ₋₁)|)",
            ],
          }}
          stickyHeader
        />
      </Table.ScrollContainer>
      {/* <Table.Thead className="sticky top-0 bg-white [&>*]:whitespace-nowrap [&>*]:px-4 [&>*]:text-center"></Table.Thead> */}

      {/* <Table.Tbody className="[&>*]:whitespace-nowrap [&>*]:px-4 [&>*]:text-center"></Table.Tbody> */}
    </>
  );
}
