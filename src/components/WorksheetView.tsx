import { useEffect, useMemo, useRef, useState } from 'react'
import type { Answers, WorksheetDef } from '../types'
import { clearSheet, loadSheet, saveSheet, sheetHasContent } from '../storage'
import { Field } from './Fields'

type Props = {
  worksheet: WorksheetDef
  onSaved: () => void
}

export function WorksheetView({ worksheet, onSaved }: Props) {
  const [answers, setAnswers] = useState<Answers>(() => loadSheet(worksheet.id))
  const [savedAt, setSavedAt] = useState<string | null>(
    typeof loadSheet(worksheet.id)._updatedAt === 'string'
      ? (loadSheet(worksheet.id)._updatedAt as string)
      : null,
  )
  const skipFirst = useRef(true)

  useEffect(() => {
    const loaded = loadSheet(worksheet.id)
    setAnswers(loaded)
    setSavedAt(typeof loaded._updatedAt === 'string' ? loaded._updatedAt : null)
    skipFirst.current = true
  }, [worksheet.id])

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    const handle = window.setTimeout(() => {
      saveSheet(worksheet.id, answers)
      setSavedAt(new Date().toISOString())
      onSaved()
    }, 200)
    return () => window.clearTimeout(handle)
  }, [answers, worksheet.id, onSaved])

  const onChange = (id: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const filled = useMemo(() => sheetHasContent(answers), [answers])

  return (
    <article className="worksheet-card" data-testid={`worksheet-${worksheet.id}`}>
      <header className="worksheet-header">
        <div className="icon" aria-hidden="true">
          AB
        </div>
        <div>
          <p className="ab-number">Arbeitsblatt {worksheet.number}</p>
          <h2>{worksheet.title}</h2>
        </div>
      </header>

      <p className="meta">
        {worksheet.lessonTitle}
        {worksheet.pages ? ` · Handbuch S. ${worksheet.pages}` : ''}
      </p>

      {worksheet.intro ? <p className="intro">{worksheet.intro}</p> : null}

      <div className="status-bar" data-testid="save-status">
        {savedAt
          ? `Automatisch gespeichert (${new Date(savedAt).toLocaleString('de-DE')}) – nur auf diesem Gerät.`
          : filled
            ? 'Wird gespeichert …'
            : 'Eingaben werden automatisch im localStorage dieses Browsers gespeichert.'}
      </div>

      {worksheet.sections.map((sec) => (
        <section key={sec.title} className="form-section">
          <h3>{sec.title}</h3>
          {sec.intro ? <p className="hint">{sec.intro}</p> : null}
          {sec.fields.map((field, i) => (
            <Field
              key={field.type === 'note' ? `note-${sec.title}-${i}` : field.id}
              field={field}
              answers={answers}
              onChange={onChange}
            />
          ))}
        </section>
      ))}

      <div className="actions">
        <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
          Drucken
        </button>
        <button
          type="button"
          className="btn btn-danger"
          data-testid="reset-sheet"
          onClick={() => {
            if (window.confirm('Dieses Arbeitsblatt leeren? Die übrigen Blätter bleiben erhalten.')) {
              clearSheet(worksheet.id)
              setAnswers({})
              setSavedAt(null)
              onSaved()
            }
          }}
        >
          Dieses Blatt leeren
        </button>
      </div>
    </article>
  )
}
