import { useEffect, useState } from "react";
import { EBuild, tree } from "src/fixtures/tree.ts";
import { request } from "src/utils/request.ts";
import { config } from "src/config.ts";

export type TechTreeCiv = "Aztecs" | "Bengalis" | "Berbers" | "Bohemians" | "Britons" | "Bulgarians" | "Burgundians" | "Burmese" | "Byzantines" | "Celts" | "Chinese" | "Cumans" | "Dravidians" | "Ethiopians" | "Franks" | "Goths" | "Gurjaras" | "Hindustanis" | "Huns" | "Incas" | "Italians" | "Japanese" | "Khmer" | "Koreans" | "Lithuanians" | "Magyars" | "Malay" | "Malians" | "Mayans" | "Mongols" | "Persians" | "Poles" | "Portuguese" | "Romans" | "Saracens" | "Sicilians" | "Slavs" | "Spanish" | "Tatars" | "Teutons" | "Turks" | "Vietnamese" | "Vikings";

export type TechTreeData = {
  civ_helptexts: Record<TechTreeCiv, string>;
  civ_names: Record<TechTreeCiv, string>;
  techtrees: Record<TechTreeCiv, {
    buildings: Array<{
      id: EBuild;
      age: number;
    }>,
    techs: Array<{
      id: number;
      age: number;
    }>;
    unique: {
      castleAgeUniqueTech: number;
      castleAgeUniqueUnit: number;
      imperialAgeUniqueTech: number;
      imperialAgeUniqueUnit: number;
    },
    units: Array<{
      id: number;
      age: number;
    }>;
  }>;
  data: {
    units: Record<string, {
      LanguageNameId: number;
      LanguageHelpId: number;
    }>
  }
}

export type TechTreeStrings = Record<number, string>;

export const useDataTechTree = () => {
  const [isLoading, setLoading] = useState(false);
  const [respData, setRespData] = useState<TechTreeData | undefined>();
  const [respStrings, setRespStrings] = useState<TechTreeStrings | undefined>();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [resp1, resp2] = await Promise.all([
        request<TechTreeData>(`${config.API_AOE2TECHTREE_BASE}/data.json`),
        request<TechTreeStrings>(`${config.API_AOE2TECHTREE_BASE}/locales/ru/strings.json`),
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