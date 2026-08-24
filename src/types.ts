export type ScaleDef = {
  type: 'scale'
  id: string
  label: string
  min?: number
  max?: number
  minLabel: string
  midLabel?: string
  maxLabel: string
}

export type TextDef = {
  type: 'text'
  id: string
  label: string
  hint?: string
  placeholder?: string
}

export type TextareaDef = {
  type: 'textarea'
  id: string
  label: string
  hint?: string
  rows?: number
  placeholder?: string
}

export type RadioDef = {
  type: 'radio'
  id: string
  label: string
  options: { value: string; label: string }[]
}

export type CheckDef = {
  type: 'checks'
  id: string
  label?: string
  hint?: string
  options: { value: string; label: string; description?: string }[]
  allowOther?: boolean
}

export type PairDef = {
  type: 'pair'
  id: string
  leftLabel: string
  rightLabel: string
  rows?: number
}

export type QuadDef = {
  type: 'quad'
  id: string
  hint?: string
  cells: [string, string, string, string]
}

export type TableDef = {
  type: 'table'
  id: string
  columns: { id: string; label: string }[]
  minRows?: number
}

export type StagesDef = {
  type: 'stages'
  id: string
  stages: { id: string; title: string }[]
}

export type StarlistDef = {
  type: 'starlist'
  id: string
  label: string
  hint?: string
  items: { id: string; title: string; quotes: string[] }[]
}

export type ComputedDef = {
  type: 'computed'
  id: string
  label: string
  from: string[]
  interpretation?: { min: number; max: number; text: string }[]
}

export type NoteDef = {
  type: 'note'
  text: string
  tone?: 'info' | 'tip' | 'warn'
}

export type ChartDef = {
  type: 'chart'
  id: string
  label: string
  beforeId: string
  afterId: string
  beforeKeys: [string, string]
  afterKeys: [string, string]
}

export type FieldDef =
  | ScaleDef
  | TextDef
  | TextareaDef
  | RadioDef
  | CheckDef
  | PairDef
  | QuadDef
  | TableDef
  | StagesDef
  | StarlistDef
  | ComputedDef
  | NoteDef
  | ChartDef

export type SectionDef = {
  title: string
  intro?: string
  fields: FieldDef[]
}

export type WorksheetDef = {
  id: string
  number: string
  title: string
  lesson: string
  lessonTitle: string
  pages: string
  intro?: string
  sections: SectionDef[]
}

export type Answers = Record<string, unknown>

export type SheetStore = Record<string, Answers>
