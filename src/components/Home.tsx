import { fiveStages } from '../data/glossary'
import { navGroups, worksheets } from '../data/worksheets'
import { loadAll, sheetHasContent } from '../storage'

type Props = {
  onOpen: (id: string) => void
}

export function Home({ onOpen }: Props) {
  const store = loadAll()
  const filled = worksheets.filter((w) => sheetHasContent(store[w.id])).length

  return (
    <article className="worksheet-card home">
      <header className="worksheet-header">
        <div className="icon" aria-hidden="true">
          IWS
        </div>
        <div>
          <p className="ab-number">Arbeitsbuch für Gruppenleiter &amp; Teilnehmer</p>
          <h2>Digitale Arbeitsblätter</h2>
        </div>
      </header>

      <p className="intro">
        Diese App stellt alle Arbeitsblätter des Programms <strong>In Würde zu sich stehen</strong>{' '}
        (Version für Erwachsene, April 2024) als ausfüllbare Formulare bereit. Ihre Angaben bleiben
        auf diesem Gerät im Browser (localStorage) – sie werden nicht auf einen Server übertragen.
      </p>

      <div className="status-bar">
        {filled} von {worksheets.length} Arbeitsblättern mit Einträgen
      </div>

      <section className="form-section">
        <h3>So beginnen wir jede Gruppensitzung</h3>
        <blockquote>
          Unser Ziel ist es, Vor- und Nachteile abzuwägen, wenn Sie Ihre eigenen Erfahrungen mit
          psychischer Erkrankung gegenüber anderen Menschen offenlegen. Wir werden auch Strategien
          für eine möglichst effektive Offenlegung diskutieren, falls Sie sich dazu entscheiden.
        </blockquote>
        <ul className="rules">
          <li>Vertraulichkeit – was in diesem Raum gesagt wird, bleibt unter uns.</li>
          <li>Jede einzelne Meinung zählt.</li>
          <li>Wir respektieren einander.</li>
          <li>IWS ist keine Therapie und kann psychiatrisch-psychotherapeutische Behandlung nicht ersetzen.</li>
          <li>Traumainhalte sollten nicht genannt werden, um andere Teilnehmer nicht zu belasten.</li>
          <li>Handys u. Ä. bitte ausschalten (auch keine Bild- oder Tonaufnahmen).</li>
        </ul>
      </section>

      <section className="form-section">
        <h3>Fünf Stufen der Offenlegung</h3>
        <ol className="stage-list">
          {fiveStages.map((s) => (
            <li key={s.title}>
              <strong>{s.title}.</strong> {s.text}
            </li>
          ))}
        </ol>
      </section>

      <section className="form-section">
        <h3>Arbeitsblätter</h3>
        {navGroups.map((group) => (
          <div key={group.id} className="home-group">
            <h4>{group.title}</h4>
            <ul className="home-links">
              {group.items.map((w) => (
                <li key={w.id}>
                  <button type="button" onClick={() => onOpen(w.id)}>
                    <span>AB {w.number}</span>
                    {w.title}
                    {sheetHasContent(store[w.id]) ? <em>gespeichert</em> : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <p className="star-hint">
        Inhalte nach Patrick W. Corrigan &amp; Co / deutsche Adaption Nicolas Rüsch &amp; Co,
        Klinik für Psychiatrie und Psychotherapie II, Universität Ulm. Digitale Formulare als
        Arbeitsmittel für IWS-Gruppen. Das Urheberrecht am Handbuch bleibt bei den Autorinnen und
        Autoren.
      </p>
    </article>
  )
}
