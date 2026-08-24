import type { Answers, SheetStore } from './types'

export const STORAGE_KEY = 'iws-ab-v1'

export function loadAll(): SheetStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed as SheetStore
  } catch {
    return {}
  }
}

export function loadSheet(id: string): Answers {
  return loadAll()[id] ?? {}
}

export function saveSheet(id: string, answers: Answers): void {
  const all = loadAll()
  all[id] = { ...answers, _updatedAt: new Date().toISOString() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function clearSheet(id: string): void {
  const all = loadAll()
  delete all[id]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function clearAll(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function exportJson(): string {
  return JSON.stringify(loadAll(), null, 2)
}

export function importJson(raw: string): SheetStore {
  const parsed = JSON.parse(raw) as unknown
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Ungültiges Backup-Format')
  }
  const store = parsed as SheetStore
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  return store
}

export function sheetHasContent(answers: Answers | undefined): boolean {
  if (!answers) return false
  return Object.entries(answers).some(([key, value]) => {
    if (key.startsWith('_')) return false
    return hasValue(value)
  })
}

function hasValue(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return false
  if (typeof value === 'number') return true
  if (typeof value === 'boolean') return value
  if (Array.isArray(value)) return value.some(hasValue)
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).some(hasValue)
  }
  return String(value).trim().length > 0
}
