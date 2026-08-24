import { useCallback, useEffect, useMemo, useState } from 'react'
import { getWorksheet, navGroups, worksheets } from './data/worksheets'
import {
  clearAll,
  exportJson,
  importJson,
  loadAll,
  sheetHasContent,
} from './storage'
import { expandInZoom, initZoom, shareInZoom, type ZoomState } from './zoom'
import { Home } from './components/Home'
import { Glossary, Privacy, Support, Terms } from './components/Pages'
import { WorksheetView } from './components/WorksheetView'

type Route =
  | { name: 'home' }
  | { name: 'glossary' }
  | { name: 'privacy' }
  | { name: 'terms' }
  | { name: 'support' }
  | { name: 'sheet'; id: string }

function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, '') || '/'
  if (path === '/' || path === '') return { name: 'home' }
  if (path === '/glossar') return { name: 'glossary' }
  if (path === '/datenschutz') return { name: 'privacy' }
  if (path === '/nutzungsbedingungen') return { name: 'terms' }
  if (path === '/support') return { name: 'support' }
  const m = path.match(/^\/ab\/([^/]+)$/)
  if (m) return { name: 'sheet', id: decodeURIComponent(m[1]) }
  return { name: 'home' }
}

function toHash(route: Route): string {
  if (route.name === 'home') return '#/'
  if (route.name === 'glossary') return '#/glossar'
  if (route.name === 'privacy') return '#/datenschutz'
  if (route.name === 'terms') return '#/nutzungsbedingungen'
  if (route.name === 'support') return '#/support'
  return `#/ab/${encodeURIComponent(route.id)}`
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  const [tick, setTick] = useState(0)
  const [navOpen, setNavOpen] = useState(false)
  const [zoom, setZoom] = useState<ZoomState>({ available: false, inZoom: false })

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash(window.location.hash))
      setNavOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    void initZoom().then(setZoom)
  }, [])

  const go = (next: Route) => {
    const hash = toHash(next)
    if (window.location.hash !== hash) window.location.hash = hash
    else setRoute(next)
  }

  const onSaved = useCallback(() => setTick((n) => n + 1), [])
  const store = useMemo(() => loadAll(), [tick])

  const sheet = route.name === 'sheet' ? getWorksheet(route.id) : undefined

  return (
    <>
      {zoom.inZoom ? (
        <div className="zoom-banner">
          Zoom-App{zoom.runningContext ? ` · ${zoom.runningContext}` : ''}
          <button type="button" onClick={() => void expandInZoom()}>
            Vergrößern
          </button>
          <button type="button" onClick={() => void shareInZoom()}>
            Teilen
          </button>
        </div>
      ) : null}

      <header className="app-header">
        <div className="brand">
          <Logo />
          <div>
            <h1>In Würde zu sich stehen</h1>
            <p className="subtitle">um das Stigma psychischer Erkrankung abzubauen</p>
          </div>
        </div>
        <p className="header-band">Version für Erwachsene · Digitale Arbeitsblätter</p>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((v) => !v)}
        >
          {navOpen ? 'Menü schließen' : 'Arbeitsblätter'}
        </button>
      </header>

      <div className="layout">
        <aside className={navOpen ? 'sidebar open' : 'sidebar'} data-testid="sidebar">
          <button type="button" className={route.name === 'home' ? 'active' : ''} onClick={() => go({ name: 'home' })}>
            Start
          </button>
          <button
            type="button"
            className={route.name === 'glossary' ? 'active' : ''}
            onClick={() => go({ name: 'glossary' })}
          >
            Fachbegriffe
          </button>

          {navGroups.map((group) => (
            <div key={group.id}>
              <h2>{group.title}</h2>
              {group.items.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className={route.name === 'sheet' && route.id === w.id ? 'active' : ''}
                  onClick={() => go({ name: 'sheet', id: w.id })}
                  data-testid={`nav-${w.id}`}
                >
                  <span className={sheetHasContent(store[w.id]) ? 'dot filled' : 'dot'} />
                  AB {w.number}
                </button>
              ))}
            </div>
          ))}

          <h2>Daten</h2>
          <button
            type="button"
            onClick={() => {
              const blob = new Blob([exportJson()], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'iws-arbeitsblaetter.json'
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            Daten exportieren
          </button>
          <label className="import-label">
            Daten importieren
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                void file.text().then((text) => {
                  try {
                    importJson(text)
                    setTick((n) => n + 1)
                    alert('Backup importiert.')
                  } catch {
                    alert('Import fehlgeschlagen. Bitte eine gültige JSON-Datei wählen.')
                  }
                })
                e.target.value = ''
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Alle gespeicherten Arbeitsblätter auf diesem Gerät löschen?')) {
                clearAll()
                setTick((n) => n + 1)
                window.location.reload()
              }
            }}
          >
            Alle Daten löschen
          </button>
        </aside>

        <main className="main">
          {route.name === 'home' ? <Home onOpen={(id) => go({ name: 'sheet', id })} /> : null}
          {route.name === 'glossary' ? <Glossary /> : null}
          {route.name === 'privacy' ? <Privacy /> : null}
          {route.name === 'terms' ? <Terms /> : null}
          {route.name === 'support' ? <Support /> : null}
          {route.name === 'sheet' && sheet ? (
            <WorksheetView worksheet={sheet} onSaved={onSaved} />
          ) : null}
          {route.name === 'sheet' && !sheet ? (
            <article className="worksheet-card">
              <h2>Arbeitsblatt nicht gefunden</h2>
              <p>Bitte wählen Sie ein Blatt in der Navigation.</p>
            </article>
          ) : null}
        </main>
      </div>

      <footer className="footer">
        <nav>
          <a href="#/datenschutz">Datenschutz</a>
          <a href="#/nutzungsbedingungen">Nutzungsbedingungen</a>
          <a href="#/support">Support</a>
        </nav>
        <p>
          {worksheets.length} Arbeitsblätter · Speicherung lokal · In Würde zu sich stehen © 2024
          Rüsch &amp; Co · App MIT
        </p>
      </footer>
    </>
  )
}

function Logo() {
  return (
    <svg className="iws-logo" viewBox="0 0 64 64" role="img" aria-label="IWS">
      <rect width="64" height="64" rx="8" fill="#37A76F" />
      <circle cx="16" cy="20" r="5" fill="#fff" />
      <circle cx="28" cy="18" r="5.5" fill="#fff" />
      <circle cx="40" cy="18" r="5.5" fill="#fff" />
      <circle cx="52" cy="20" r="5" fill="#fff" />
      <path
        fill="#fff"
        d="M8 38c0-6 4-10 8-10s8 4 8 10v10H8V38zm12-2c0-7 5-12 12-12s12 5 12 12v12H20V36zm20 2c0-6 4-10 8-10s8 4 8 10v10H40V38z"
      />
      <text x="32" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
        IWS
      </text>
    </svg>
  )
}
