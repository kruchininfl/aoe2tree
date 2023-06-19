import { useEffect, useState } from "react";
import { EBuild, tree } from "../fixtures/tree.ts";

export type TechTreeCiv = "Aztecs" | "Bengalis" | "Berbers" | "Bohemians" | "Britons" | "Bulgarians" | "Burgundians" | "Burmese" | "Byzantines" | "Celts" | "Chinese" | "Cumans" | "Dravidians" | "Ethiopians" | "Franks" | "Goths" | "Gurjaras" | "Hindustanis" | "Huns" | "Incas" | "Italians" | "Japanese" | "Khmer" | "Koreans" | "Lithuanians" | "Magyars" | "Malay" | "Malians" | "Mayans" | "Mongols" | "Persians" | "Poles" | "Portuguese" | "Romans" | "Saracens" | "Sicilians" | "Slavs" | "Spanish" | "Tatars" | "Teutons" | "Turks" | "Vietnamese" | "Vikings";

export type TechTreeData = {
  civ_helptexts: Record<TechTreeCiv, string>;
  civ_names: Record<TechTreeCiv, string>;
  techtrees: Record<TechTreeCiv, {
    buildings: EBuild[],
    techs: number[];
    unique: {
      castleAgeUniqueTech: number;
      castleAgeUniqueUnit: number;
      imperialAgeUniqueTech: number;
      imperialAgeUniqueUnit: number;
    },
    units: number[];
  }>;
  data: {
    units: Record<string, {
      LanguageNameId: number;
      LanguageHelpId: number;
    }>
  }
}

export type TechTreeStrings = Record<number, string>;

const BASE_URL = "https://aoe2techtree.net/data";

const _fetch = <Resp>(url: string): Promise<Resp | undefined> => fetch(url).then((resp) => {
  if (resp.ok) {
    return resp.json() as Resp;
  }

  throw new Error("ApiError");
}).catch((e) => {
  console.error(e);
  return undefined;
})

export const useData = () => {
  const [isLoading, setLoading] = useState(false);
  const [respData, setRespData] = useState<TechTreeData | undefined>();
  const [respStrings, setRespStrings] = useState<TechTreeStrings | undefined>();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [resp1, resp2] = await Promise.all([
        _fetch<TechTreeData>(`${BASE_URL}/data.json`),
        _fetch<TechTreeStrings>(`${BASE_URL}/locales/ru/strings.json`),
      ]);

      setRespData(resp1);
      setRespStrings(resp2);

      setLoading(false);
    })();
  }, []);

  return {
    isLoading,
    datasets: respData,
    strings: respStrings,
    tree: tree,
  }
}