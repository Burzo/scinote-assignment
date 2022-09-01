export type ExperimentGroup = {
  samples: string[]
  reagents: string[]
  replicates: number
  id: number
}

export type Experiment = {
  sample: string
  reagent: string
  place: number
  color: string
}

export type TableSize = 96 | 384

export enum GroupingLogic {
  COMPLEX,
  SIMPLISTIC,
}

export enum GroupBy {
  REAGENT,
  SAMPLE,
}

export type TableType = Experiment | null

export type AllTables = TableType[][][]
