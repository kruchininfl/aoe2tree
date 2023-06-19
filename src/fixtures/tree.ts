export enum EBuild {
  BARRACKS = 12,
  ARCHERY = 87,
  HORSE_STABLE = 101,
  ENGINE = 49,
  SMITHY = 103,
  UNIVERSITY = 209,
  CASTLE = 82,
  FORTRESS = 1251,
  DANJON = 1665,
  MONASTERY = 104,
}

export type Tree = {
  war_builds: {
    [key in EBuild]?: {
      units?: Array<number[]>;
      tech_chains?: Array<number[]>;
      techs?: Array<number>;
    }
  },
  def_builds: number[];
}

export const tree: Tree = {
  war_builds: {
    [EBuild.BARRACKS]: {
      units: [
        [74, 75, 77, 473, 567],
        [93, 358, 359],
        [751, 753, 752],
        [882],
        [1699],
      ],
      techs: [716, 875, 215, 602],
    },
    [EBuild.ARCHERY]: {
      units: [
        [4, 24, 492],
        [7, 6, 1155],
        [185],
        [5],
        [39, 474],
        [873, 875],
        [1010, 1012]
      ],
      techs: [437, 436]
    },
    [EBuild.HORSE_STABLE]: {
      units: [
        [448, 546, 441, 1707],
        [1751, 1753],
        [329, 330, 207],
        [38, 283, 569],
        [1132, 1134],
        [1370, 1372],
        [1570]
      ],
      techs: [435, 39],
    },
    [EBuild.ENGINE]: {
      units: [
        [1258, 422, 548],
        [1744, 1746],
        [280, 550, 588],
        [279, 542],
        [1105],
        [36, 1709],
      ],
    },
    [EBuild.SMITHY]: {
      tech_chains: [
        [211, 212, 219],
        [199, 200, 201],
        [67, 68, 75],
        [81, 82, 80],
        [74, 76, 77],
      ],
    },
  },
  def_builds: [598, 72, 792, 79, 487, 117, 234, 155, 235, 236],
};