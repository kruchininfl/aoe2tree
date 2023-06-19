import { FC, useMemo } from "react";
import { getPic } from "../utils/get_pic.ts";
import { EBuild } from "../fixtures/tree.ts";
import classes from "./card.module.css";
import clsx from "clsx";
import { TechTreeCiv, TechTreeData } from "../hooks/use_data.ts";

type Props = {
  civData: TechTreeData["techtrees"][TechTreeCiv];
} & (
  | {
  type: "build";
  id: EBuild;
}
  | {
  type: "unit";
  chain: number[];
}
  | {
  type: "tech";
  id: number;
}
  | {
  type: "tech_chain";
  chain: number[];
});

export const Card: FC<Props> = (props) => {
  const picId = useMemo(() => {
    if (props.type === "build" || props.type === "tech") {
      return props.id;
    } else if (props.type === "unit" || props.type === "tech_chain") {
      return props.chain.find(Boolean);
    }
  }, [props]);

  const isDisabled = useMemo(() => {
    if (props.type === "build") {
      return !props.civData.buildings.includes(props.id);
    } else if (props.type === "unit") {
      return !props.chain.some((id) => props.civData.units.includes(id));
    } else if (props.type === "tech") {
      return !props.civData.techs.includes(props.id);
    } else if (props.type === "tech_chain") {
      return !props.chain.some((id) => props.civData.techs.includes(id));
    }

    return false;
  }, [props]);

  if (!picId) {
    return null;
  }

  return (
    <div
      className={clsx(
        classes.card,
        classes[`card_${props.type === "tech_chain" ? "tech" : props.type}`],
        isDisabled && classes.card_disabled,
      )}
    >
      <img
        className={classes.card__img}
        src={getPic(props.type === "tech_chain" ? "tech" : props.type, picId)}
      />

      {(props.type === "unit" || props.type === "tech_chain") && !isDisabled && (
        <div className={classes.circles}>
          {props.chain.map((item, idx) => {
            const enabled = (() => {
              if (props.type === "unit") {
                return props.civData.units.includes(item);
              } else if (props.type === "tech_chain") {
                return props.civData.techs.includes(item);
              }

              return item !== 0;
            })();

            return (
              <div
                key={idx}
                className={clsx(
                  classes.circles__item,
                  enabled && classes.circles__item_enabled
                )}
              />
            )
          })}
        </div>
      )}
    </div>
  );
}