import classes from "./App.module.css";
import { useData } from "./hooks/use_data.ts";
import { useMemo, useState } from "react";
import { produce } from "immer";
import clsx from "clsx";
import { getPic } from "./utils/get_pic.ts";
import { CardGroup } from "./components/card_group.tsx";
import { EBuild } from "./fixtures/tree.ts";

type Civ = keyof NonNullable<ReturnType<typeof useData>["datasets"]>["civ_names"];

const WAR_BUILDS_SORTING = [EBuild.BARRACKS, EBuild.HORSE_STABLE, EBuild.ARCHERY, EBuild.ENGINE, EBuild.SMITHY];

function App() {
  const {
    datasets,
    strings,
    tree,
  } = useData();

  const [selectedCivs, setSelectedCivs] = useState<Map<Civ, boolean>>(new Map());

  const handleSelectCiv = (civ: Civ) => () => {
    setSelectedCivs((state) => produce(state, (draft) => {
      if (draft.has(civ)) {
        draft.delete(civ);
      } else {
        draft.set(civ, true);
      }

      return draft;
    }));
  };

  const selectedCivsArray = useMemo(() => Array.from(selectedCivs.keys()), [selectedCivs]);

  const warBuilds = useMemo(() => (Object.keys(tree.war_builds) as unknown as EBuild[]).sort((b1, b2) => (
    WAR_BUILDS_SORTING.indexOf(Number(b1)) - WAR_BUILDS_SORTING.indexOf(Number(b2))
  )), [tree.war_builds]);

  if (!datasets || !strings) {
    return null;
  }

  return (
    <>
      <div className={classes.civs}>
        {(Object.keys(datasets.civ_names) as Civ[]).map((civ) => (
          <div
            key={civ}
            className={clsx(classes.civs__item, selectedCivs.has(civ) && classes.civs__item_active)}
            onClick={handleSelectCiv(civ)}
          >
            <img alt={civ} src={getPic("civ", civ)} />
          </div>
        ))}
      </div>

      <div>
        {selectedCivsArray.map((civ) => (
          <div className={classes.main} key={civ}>
            <div><img className={classes.main__pic} alt={civ} src={getPic("civ", civ)} /></div>

            <div
              className={classes.main__desc}
              dangerouslySetInnerHTML={{ __html: strings[Number(datasets.civ_helptexts[civ])] }}
            />

            <div className={classes.main__lists}>
              {warBuilds.map((buildId) => (
                <CardGroup
                  key={buildId}
                  civData={datasets.techtrees[civ]}
                  buildId={Number(buildId)}
                  units={tree.war_builds[buildId]?.units}
                  techs={tree.war_builds[buildId]?.techs}
                  tech_chains={tree.war_builds[buildId]?.tech_chains}
                />
              ))}
            </div>

            <div className={classes.main__castle}>
              Уникальный юнит:<br />
              <b>{strings[datasets.data.units[datasets.techtrees[civ].unique.castleAgeUniqueUnit].LanguageNameId]}</b>
              <div dangerouslySetInnerHTML={
                { __html:
                    strings[datasets.data.units[datasets.techtrees[civ].unique.castleAgeUniqueUnit]
                    .LanguageHelpId]
                      .match(/Уникальный.*?\.(.*?)<i>/gs)?.[0].replace("<i>", "") || ""}
              } />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
