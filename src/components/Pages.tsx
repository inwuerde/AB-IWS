import { glossary } from '../data/glossary'
import { worksheets } from '../data/worksheets'

export function Glossary() {
  return (
    <article className="worksheet-card">
      <header className="worksheet-header">
        <div className="icon" aria-hidden="true">
          ?
        </div>
        <div>
          <p className="ab-number">Handbuch</p>
          <h2>Fachbegriffe</h2>
        </div>
      </header>
      <dl className="glossary">
        {glossary.map((g) => (
          <div key={g.term}>
            <dt>{g.term}</dt>
            <dd>{g.def}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export function Privacy() {
  return (
    <article className="worksheet-card legal">
      <header className="worksheet-header">
        <h2>Datenschutzerklärung</h2>
      </header>
      <p>Stand: 24. August 2026</p>
      <p>
        Die Web-App <strong>IWS Arbeitsblätter</strong> (AB-IWS) ist ein digitales Arbeitsmittel zum
        Programm „In Würde zu sich stehen“. Sie ist so gebaut, dass ausgefüllte Arbeitsblätter
        <strong> nur lokal in Ihrem Browser</strong> gespeichert werden (Web Storage / localStorage).
      </p>
      <h3>Verantwortliche Stelle</h3>
      <p>
        Betreiber dieser App-Instanz ist die Organisation bzw. Person, die die App bereitstellt
        (GitHub: inwuerde). Kontakt: über die Support-Seite dieser App.
      </p>
      <h3>Welche Daten verarbeitet werden</h3>
      <ul>
        <li>
          Inhalte, die Sie in die Formulare eintragen (Freitext, Skalen, Auswahlen). Diese Daten
          können sensible Gesundheitsangaben enthalten.
        </li>
        <li>
          Ein Zeitstempel der letzten Speicherung je Arbeitsblatt, ebenfalls nur lokal.
        </li>
        <li>
          Keine Konten, keine Tracking-Cookies, keine Analyse-Dienste, keine Werbenetzwerke.
        </li>
      </ul>
      <h3>Speicherung und Übermittlung</h3>
      <p>
        Die Formulardaten verlassen Ihr Gerät nicht, solange Sie sie nicht selbst exportieren, drucken
        oder in einem Backup-Download speichern. Es findet keine serverseitige Speicherung der
        Arbeitsblatt-Inhalte statt. Wenn Sie die App in Zoom öffnen, läuft sie in einem Zoom-Webview;
        Zoom erhält dadurch den normalen Verbindungsdatensatz einer eingebetteten Web-App (z. B. IP,
        User-Agent), nicht aber den Inhalt Ihrer Formulare.
      </p>
      <h3>Zoom Apps</h3>
      <p>
        Bei Nutzung als Zoom App kann das Zoom Apps SDK den Laufkontext (z. B. „in Meeting“)
        auslesen, um die Darstellung anzupassen. Es werden keine Meeting-Inhalte, Chat-Nachrichten
        oder Teilnehmerlisten angefordert. Optional kann die App die Zoom-Funktionen „App teilen“
        und „App vergrößern“ aufrufen – nur nach Ihrer Aktion.
      </p>
      <h3>Ihre Rechte</h3>
      <p>
        Sie können einzelne Blätter oder alle Daten jederzeit in der App löschen. Über
        „Daten exportieren“ erhalten Sie eine JSON-Kopie. Da keine Serverkopie existiert, können wir
        keine Auskunft über bei uns gespeicherte Formularinhalte erteilen – sie sind nicht bei uns.
      </p>
      <h3>Hinweis</h3>
      <p>
        Teilen Sie Geräte und Browser nicht ungeprüft mit anderen Personen. localStorage ist an das
        Gerät und den Browser gebunden und nicht verschlüsselt. IWS ist keine Therapie.
      </p>
    </article>
  )
}

export function Terms() {
  return (
    <article className="worksheet-card legal">
      <header className="worksheet-header">
        <h2>Nutzungsbedingungen</h2>
      </header>
      <p>Stand: 24. August 2026</p>
      <h3>Zweck</h3>
      <p>
        Die App stellt die Arbeitsblätter des IWS-Programms (Version für Erwachsene, April 2024) als
        ausfüllbare Formulare bereit. Sie richtet sich an Gruppenleiterinnen, Gruppenleiter und
        Teilnehmerinnen und Teilnehmer des Programms.
      </p>
      <h3>Urheberrecht am Handbuch</h3>
      <p>
        Alle Inhalte des Programms „In Würde zu sich stehen“, insbesondere Texte, Arbeitsblätter,
        HOP-/IWS-Logos und Tabellen, sind urheberrechtlich geschützt. Das Urheberrecht für die
        deutschsprachige Fassung liegt bei Nicolas Rüsch &amp; Kolleginnen und Kollegen; für die
        US-amerikanische Originalversion bei Patrick W. Corrigan &amp; Kolleginnen und Kollegen.
        Die digitale Umsetzung ersetzt das Handbuch nicht und räumt keine zusätzlichen
        Vervielfältigungsrechte ein. Anfragen zur Nutzung des Programms:
        nicolas.ruesch@uni-ulm.de, www.uni-ulm.de/med/iws.
      </p>
      <h3>Nutzung der Software</h3>
      <p>
        Der Quellcode dieser App steht unter der MIT-Lizenz (siehe LICENSE im Repository). Die
        Software wird ohne Gewähr bereitgestellt. Sie verpflichten sich, die App nicht zu nutzen, um
        andere zu identifizieren, zu outen oder vertrauliche Gruppeninhalte zu verbreiten.
      </p>
      <h3>Keine medizinische Leistung</h3>
      <p>
        IWS ist keine Therapie und ersetzt keine psychiatrisch-psychotherapeutische Behandlung. In
        Krisen wenden Sie sich an lokale Notdienste (in Deutschland z. B. 112) oder die Telefonseelsorge
        0800 111 0 111 / 0800 111 0 222.
      </p>
      <h3>Zoom App Store</h3>
      <p>
        Die Installation über Zoom unterliegt zusätzlich den Nutzungsbedingungen von Zoom. Die App
        speichert keine Zoom-Nutzerdaten auf eigenen Servern.
      </p>
    </article>
  )
}

export function Support() {
  return (
    <article className="worksheet-card legal">
      <header className="worksheet-header">
        <h2>Support</h2>
      </header>
      <p>
        Technische Fragen zur App: GitHub-Repository{' '}
        <a href="https://github.com/inwuerde/AB-IWS">github.com/inwuerde/AB-IWS</a> (Issues).
      </p>
      <p>
        Fachliche Fragen zum IWS-Programm: Nicolas Rüsch,{' '}
        <a href="mailto:nicolas.ruesch@uni-ulm.de">nicolas.ruesch@uni-ulm.de</a>,{' '}
        <a href="https://www.uni-ulm.de/med/iws">www.uni-ulm.de/med/iws</a>.
      </p>
      <h3>Häufige Hinweise</h3>
      <ul>
        <li>Einträge werden automatisch gespeichert. Ein anderes Gerät oder ein anderer Browser sieht sie nicht.</li>
        <li>Wenn Sie den Browser-Speicher leeren, gehen lokale Einträge verloren – nutzen Sie vorher „Daten exportieren“.</li>
        <li>In Zoom kann das Seitenpanel schmal sein; nutzen Sie „App vergrößern“, falls angeboten.</li>
        <li>Diese App enthält {worksheets.length} Arbeitsblätter inklusive Anhang-Leerformulare.</li>
      </ul>
    </article>
  )
}
