import type { Answers, FieldDef, TableDef } from '../types'
import { loadSheet } from '../storage'

function asString(value: unknown): string {
  return typeof value === 'string' ? value : value == null ? '' : String(value)
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value)
    if (Number.isFinite(n)) return n
  }
  return undefined
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return {}
}

function asRows(value: unknown, minRows: number, columns: TableDef['columns']): Record<string, string>[] {
  const rows = Array.isArray(value) ? (value as Record<string, string>[]) : []
  const next = rows.map((row) => ({ ...row }))
  while (next.length < minRows) {
    const empty: Record<string, string> = {}
    for (const col of columns) empty[col.id] = ''
    next.push(empty)
  }
  return next
}

type Props = {
  field: FieldDef
  answers: Answers
  onChange: (id: string, value: unknown) => void
}

export function Field({ field, answers, onChange }: Props) {
  if (field.type === 'note') {
    return <p className={`note note-${field.tone ?? 'info'}`}>{field.text}</p>
  }

  if (field.type === 'text') {
    return (
      <div className="field" data-testid={`field-${field.id}`}>
        <label htmlFor={field.id}>{field.label}</label>
        {field.hint ? <p className="hint">{field.hint}</p> : null}
        <input
          id={field.id}
          type="text"
          value={asString(answers[field.id])}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div className="field" data-testid={`field-${field.id}`}>
        <label htmlFor={field.id}>{field.label}</label>
        {field.hint ? <p className="hint">{field.hint}</p> : null}
        <textarea
          id={field.id}
          rows={field.rows ?? 4}
          value={asString(answers[field.id])}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      </div>
    )
  }

  if (field.type === 'radio') {
    const current = asString(answers[field.id])
    return (
      <fieldset className="field" data-testid={`field-${field.id}`}>
        <legend>{field.label}</legend>
        <div className="radio-list">
          {field.options.map((opt) => (
            <label key={opt.value} className={current === opt.value ? 'checked' : ''}>
              <input
                type="radio"
                name={field.id}
                value={opt.value}
                checked={current === opt.value}
                onChange={() => onChange(field.id, opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>
    )
  }

  if (field.type === 'checks') {
    const rec = asRecord(answers[field.id])
    return (
      <fieldset className="field" data-testid={`field-${field.id}`}>
        {field.label ? <legend>{field.label}</legend> : null}
        {field.hint ? <p className="hint">{field.hint}</p> : null}
        {field.options.map((opt) => (
          <label key={opt.value} className="checkbox-row">
            <input
              type="checkbox"
              checked={Boolean(rec[opt.value])}
              onChange={(e) =>
                onChange(field.id, { ...rec, [opt.value]: e.target.checked })
              }
            />
            <span>
              <strong>{opt.label}</strong>
              {opt.description ? <span className="hint"> {opt.description}</span> : null}
            </span>
          </label>
        ))}
        {field.allowOther ? (
          <textarea
            placeholder="Weitere …"
            rows={3}
            value={asString(rec.other)}
            onChange={(e) => onChange(field.id, { ...rec, other: e.target.value })}
          />
        ) : null}
      </fieldset>
    )
  }

  if (field.type === 'scale') {
    const min = field.min ?? 1
    const max = field.max ?? 7
    const current = asNumber(answers[field.id])
    const nums = []
    for (let n = min; n <= max; n += 1) nums.push(n)
    return (
      <fieldset className="field scale-group" data-testid={`field-${field.id}`}>
        <legend className="scale-label">{field.label}</legend>
        <div className="scale-options">
          <span className="scale-end">{field.minLabel}</span>
          {nums.map((n) => (
            <label key={n} className={current === n ? 'checked' : ''}>
              <input
                type="radio"
                name={field.id}
                value={n}
                checked={current === n}
                onChange={() => onChange(field.id, n)}
              />
              {n}
            </label>
          ))}
          <span className="scale-end">{field.maxLabel}</span>
        </div>
        {field.midLabel ? <p className="scale-mid">{field.midLabel}</p> : null}
      </fieldset>
    )
  }

  if (field.type === 'pair') {
    const rec = asRecord(answers[field.id])
    return (
      <div className="two-col" data-testid={`field-${field.id}`}>
        <div className="table-cell">
          <h4>{field.leftLabel}</h4>
          <textarea
            rows={field.rows ?? 5}
            value={asString(rec.left)}
            onChange={(e) => onChange(field.id, { ...rec, left: e.target.value })}
            aria-label={field.leftLabel}
          />
        </div>
        <div className="table-cell">
          <h4>{field.rightLabel}</h4>
          <textarea
            rows={field.rows ?? 5}
            value={asString(rec.right)}
            onChange={(e) => onChange(field.id, { ...rec, right: e.target.value })}
            aria-label={field.rightLabel}
          />
        </div>
      </div>
    )
  }

  if (field.type === 'quad') {
    const rec = asRecord(answers[field.id])
    const keys = ['tl', 'tr', 'bl', 'br'] as const
    return (
      <div className="field" data-testid={`field-${field.id}`}>
        {field.hint ? <p className="hint">{field.hint}</p> : null}
        <div className="two-col">
          {field.cells.map((label, i) => (
            <div key={keys[i]} className="table-cell">
              <h4>{label}</h4>
              <textarea
                rows={5}
                value={asString(rec[keys[i]])}
                onChange={(e) => onChange(field.id, { ...rec, [keys[i]]: e.target.value })}
                aria-label={label}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (field.type === 'table') {
    const rows = asRows(answers[field.id], field.minRows ?? 2, field.columns)
    return (
      <div className="field" data-testid={`field-${field.id}`}>
        <div className="repeat-table">
          {rows.map((row, ri) => (
            <div key={ri} className="repeat-row">
              {field.columns.map((col) => (
                <label key={col.id}>
                  {col.label}
                  <textarea
                    rows={2}
                    value={asString(row[col.id])}
                    onChange={(e) => {
                      const next = rows.map((r, i) =>
                        i === ri ? { ...r, [col.id]: e.target.value } : r,
                      )
                      onChange(field.id, next)
                    }}
                  />
                </label>
              ))}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            const empty: Record<string, string> = {}
            for (const col of field.columns) empty[col.id] = ''
            onChange(field.id, [...rows, empty])
          }}
        >
          Zeile hinzufügen
        </button>
      </div>
    )
  }

  if (field.type === 'stages') {
    const rec = asRecord(answers[field.id])
    return (
      <div className="field" data-testid={`field-${field.id}`}>
        {field.stages.map((stage) => {
          const cell = asRecord(rec[stage.id])
          return (
            <div key={stage.id} className="stage-block">
              <h4>{stage.title}</h4>
              <div className="two-col">
                <div className="table-cell">
                  <h4>Vorteile</h4>
                  <textarea
                    rows={4}
                    value={asString(cell.left)}
                    onChange={(e) =>
                      onChange(field.id, {
                        ...rec,
                        [stage.id]: { ...cell, left: e.target.value },
                      })
                    }
                    aria-label={`${stage.title} Vorteile`}
                  />
                </div>
                <div className="table-cell">
                  <h4>Nachteile</h4>
                  <textarea
                    rows={4}
                    value={asString(cell.right)}
                    onChange={(e) =>
                      onChange(field.id, {
                        ...rec,
                        [stage.id]: { ...cell, right: e.target.value },
                      })
                    }
                    aria-label={`${stage.title} Nachteile`}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (field.type === 'starlist') {
    const rec = asRecord(answers[field.id])
    return (
      <div className="field" data-testid={`field-${field.id}`}>
        <p className="hint">{field.hint ?? 'Markieren Sie mit * die Gründe, die für Sie wichtig sind.'}</p>
        {field.items.map((item) => (
          <div key={item.id} className="star-item">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={Boolean(rec[item.id])}
                onChange={(e) => onChange(field.id, { ...rec, [item.id]: e.target.checked })}
              />
              <strong>* {item.title}</strong>
            </label>
            <ul className="quotes">
              {item.quotes.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  if (field.type === 'computed') {
    const total = field.from.reduce((acc, key) => acc + (asNumber(answers[key]) ?? 0), 0)
    const filled = field.from.some((key) => asNumber(answers[key]) !== undefined)
    const interp = filled
      ? field.interpretation?.find((i) => total >= i.min && total <= i.max)
      : undefined
    return (
      <div className="computed" data-testid={`field-${field.id}`}>
        <div>
          <strong>{field.label}:</strong> {filled ? total : '—'}
        </div>
        {interp ? <p className="hint">{interp.text}</p> : null}
      </div>
    )
  }

  if (field.type === 'chart') {
    const before = loadSheet(field.beforeId)
    const after = loadSheet(field.afterId)
    const odd = ['q1', 'q3', 'q5', 'q7', 'q9']
    const even = ['q2', 'q4', 'q6', 'q8', 'q10']
    const sumKeys = (src: Answers, keys: string[]) =>
      keys.reduce((acc, k) => acc + (asNumber(src[k]) ?? 0), 0)
    const beforeSelf = sumKeys(before, odd)
    const beforeEnv = sumKeys(before, even)
    const afterSelf = sumKeys(after, odd)
    const afterEnv = sumKeys(after, even)
    const hasBefore = odd.some((k) => asNumber(before[k]) !== undefined)
    const hasAfter = odd.some((k) => asNumber(after[k]) !== undefined)
    const max = 25
    return (
      <div className="field" data-testid={`field-${field.id}`}>
        <p>{field.label}</p>
        {!hasBefore && !hasAfter ? (
          <p className="hint">
            Füllen Sie zuerst Arbeitsblatt A.2 (vorher) und A.3 (nachher) aus. Die Balken erscheinen automatisch.
          </p>
        ) : (
          <div className="chart">
            <Bar label="Selbst – davor" value={hasBefore ? beforeSelf : 0} max={max} color="var(--iws-green)" />
            <Bar label="Selbst – danach" value={hasAfter ? afterSelf : 0} max={max} color="var(--iws-green-dark)" />
            <Bar label="Umfeld – davor" value={hasBefore ? beforeEnv : 0} max={max} color="var(--iws-lime)" />
            <Bar label="Umfeld – danach" value={hasAfter ? afterEnv : 0} max={max} color="#6a9a20" />
          </div>
        )}
      </div>
    )
  }

  return null
}

function Bar({
  label,
  value,
  max,
  color,
}: {
  label: string
  value: number
  max: number
  color: string
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="bar-row">
      <span>{label}</span>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <strong>{value}</strong>
    </div>
  )
}
