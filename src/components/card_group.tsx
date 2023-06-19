import { ComponentProps, FC } from "react";
import { EBuild, Tree } from "../fixtures/tree.ts";
import { Card } from "./card.tsx";

type Props = {
  buildId: EBuild;
  units: NonNullable<Tree["war_builds"][EBuild]>["units"];
  techs: NonNullable<Tree["war_builds"][EBuild]>["techs"];
  tech_chains: NonNullable<Tree["war_builds"][EBuild]>["tech_chains"];
  civData: ComponentProps<typeof Card>["civData"];
}

export const CardGroup: FC<Props> = ({
  buildId,
  civData,
  units,
  techs,
  tech_chains,
}) => {
  return (
    <div>
      <Card type="build" id={buildId} civData={civData} />

      {units?.map((chain) => (
        <Card
          key={chain.join()}
          civData={civData}
          type="unit"
          chain={chain}
        />
      ))}

      {techs?.map((id) => (
        <Card
          key={id}
          civData={civData}
          type="tech"
          id={id}
        />
      ))}

      {tech_chains?.map((chain) => (
        <Card
          key={chain.join()}
          civData={civData}
          type="tech_chain"
          chain={chain}
        />
      ))}
    </div>
  )
}