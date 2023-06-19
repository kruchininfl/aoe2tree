export const getPic = (type: "civ" | "build" | "unit" | "tech", id: number | string) => (
  `https://aoe2techtree.net/img/${{
    civ: "Civs",
    build: "Buildings",
    unit: "Units",
    tech: "Techs",
  }[type]}/${String(id).toLowerCase()}.png`
);