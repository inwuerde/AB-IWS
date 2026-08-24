# IWS Arbeitsblätter

Digitale Formulare zu allen Arbeitsblättern des IWS-Handbuchs
**In Würde zu sich stehen – um das Stigma psychischer Erkrankung abzubauen**
(Version für Erwachsene, April 2024).

Die App folgt dem Layout des Arbeitsbuchs (Grün-/Limetten-Bänder, Abschnittsüberschriften, Vor-/Nachteil-Tabellen, 7-Punkte-Skalen). Ausgefüllte Blätter bleiben **im localStorage des Browsers** – ohne Konto und ohne Server-Upload der Inhalte.

Repository: [https://github.com/inwuerde/AB-IWS](https://github.com/inwuerde/AB-IWS)

## Funktionen

- Alle Arbeitsblätter der Lektionen 1–4 und der Anhänge als Formulare, inklusive Leerformulare aus Anhang 4
- Automatisches Speichern (localStorage-Schlüssel `iws-ab-v1`)
- Export/Import als JSON, Druckansicht, einzelnes Blatt oder alle Daten löschen
- Fortschrittsanzeige in der Navigation
- Automatische Summen (z. B. Selbststigma 1.1, Vorfühlen 2.2, Bewertung 3.3/4.2, Empowerment A.2–A.4)
- Zoom Apps SDK: Laufkontext, App vergrößern und teilen
- Datenschutz, Nutzungsbedingungen und Support als Seiten (Voraussetzung für den Zoom App Store)

## Arbeitsblätter

| Nr. | Titel |
| --- | --- |
| 1.1 | Offenlegung und mehr |
| 1.2 | Gründe, warum Menschen ihre psychische Erkrankung offenlegen |
| 1.3 | Vor- und Nachteile der Offenlegung (+ Hausaufgabe + 2 Leerformulare) |
| 2.1 | Fünf Stufen oder Wege der Offenlegung |
| 2.2 | Bei einer Person für die Offenlegung „vorfühlen“ |
| 2.3 | Negative Reaktionen anderer |
| 3.1 | Leitfaden für die Entwicklung Ihrer Geschichte (+ 2 Leerformulare) |
| 3.2 | Wie haben Sie sich gefühlt? |
| 3.3 | Details Ihrer Offenlegung |
| 3.4 | Selbsthilfe-/Peer-geleitete Programme |
| 3.5 | Erkenntnisse und weiteres Vorgehen |
| 4.1 | Absicht der Offenlegung |
| 4.2 | Hat die Offenlegung funktioniert? |
| 4.3 | Selbsthilfe-/Peer-Programme nach einem Monat |
| 4.4 | Erneute Bewertung der Vor- und Nachteile |
| 4.5–4.7 | Geschichte überarbeiten und erneut bewerten |
| A.1 | Einstellungen verändern |
| A.2–A.4 | Empowerment vorher/nachher und Vergleich |

## Starten

Voraussetzung: Node.js 22+.

```bash
npm install
npm run dev
```

App: [http://127.0.0.1:5173](http://127.0.0.1:5173)

```bash
npm run build      # Produktion
npm run preview    # gebundelte App lokal
npm run test:e2e   # Playwright, alle Arbeitsblätter
```

Beim ersten E2E-Lauf:

```bash
npx playwright install chromium
```

## Speicherung

| Was | Wo |
| --- | --- |
| Formularinhalte | `localStorage['iws-ab-v1']` |
| Pro Blatt | Objekt unter der Blatt-ID, plus `_updatedAt` |
| Andere Geräte | nicht synchron; JSON-Export nutzen |

Keine Tracking-Cookies. Inhalte sind an Browser und Gerät gebunden und nicht verschlüsselt – gemeinsame Rechner nach der Sitzung leeren oder Export mitnehmen.

## Zoom App

Die App lädt das [Zoom Apps SDK](https://appssdk.zoom.us/) und ruft `config` mit `getRunningContext`, `shareApp` und `expandApp` auf. Außerhalb von Zoom läuft sie als normale Website.

**Im Zoom App Store veröffentlichen** (manueller Schritt im Zoom-Konto):

1. App öffentlich per HTTPS bereitstellen (Vercel/Netlify empfohlen, damit CSP `frame-ancestors` für `*.zoom.us` gesetzt wird). GitHub Pages: `https://inwuerde.github.io/AB-IWS/`.
2. Unter [marketplace.zoom.us](https://marketplace.zoom.us/) eine **General App** mit Zoom Apps SDK anlegen.
3. Home URL, OAuth-Redirect (`/auth.html`), Domain-Allowlist und Gastmodus eintragen.
4. Datenschutz, Nutzungsbedingungen und Support verlinken.
5. Screenshots ohne echte Teilnehmerdaten hochladen und zur Review einreichen.

Details und Listing-Texte: [`zoom/marketplace.md`](zoom/marketplace.md), Manifest-Vorlage: [`zoom/app-manifest.example.json`](zoom/app-manifest.example.json).

Die Review bei Zoom kann diese Codebasis nicht ersetzen: ohne Entwicklerkonto und ohne Submit im Marketplace erscheint die App nicht im Store.

## Deploy

- **GitHub Pages:** Workflow `.github/workflows/pages.yml` (Basispfad `/AB-IWS/`).
- **Vercel / Netlify:** `vercel.json` bzw. `netlify.toml` setzen die Zoom-CSP-Header.

## Technik

- React 19, TypeScript, Vite
- Hash-Routing (`#/ab/1-3`), geeignet für GitHub Pages und Zoom-Webviews
- Playwright-E2E für jedes Arbeitsblatt (öffnen, ausfüllen, Reload, Persistenz)

## Urheberrecht

Die **Software** steht unter der MIT-Lizenz (siehe `LICENSE`).

Die **Handbuchtexte** stammen aus dem IWS-Programm (Original: Patrick W. Corrigan & Co, Chicago; deutsche Adaption: Nicolas Rüsch & Co, Universität Ulm / BKH Günzburg, Version April 2024). Sie bleiben urheberrechtlich geschützt. Die App ist ein Arbeitsmittel für IWS-Gruppen, kein Ersatz des gedruckten Arbeitsbuchs und keine Lizenz zur freien Weiterverbreitung des Programms.

Kontakt Programm: [nicolas.ruesch@uni-ulm.de](mailto:nicolas.ruesch@uni-ulm.de) · [www.uni-ulm.de/med/iws](https://www.uni-ulm.de/med/iws)

IWS ist keine Therapie. In Krisen: lokale Notdienste (112) oder Telefonseelsorge 0800 111 0 111 / 0800 111 0 222.
