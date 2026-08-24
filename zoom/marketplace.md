# Zoom App Store – Einreichung IWS Arbeitsblätter

Eine Veröffentlichung im Zoom App Marketplace ist **kein Git-Push**. Zoom prüft die App manuell. Diese Datei ist die Checkliste und der Listing-Text.

## Voraussetzungen

1. Zoom-Konto mit Rolle **Zoom for developers** (Kontoinhaber oder Admin).
2. App im [Zoom Marketplace Build-Flow](https://marketplace.zoom.us/) anlegen: **General App** mit Zoom Apps SDK.
3. Öffentliche **HTTPS-URL** der laufenden App (empfohlen: Vercel oder Netlify wegen CSP-Headern; GitHub Pages funktioniert technisch, setzt aber keine `frame-ancestors`-Header).
4. Live-URLs für Datenschutz, Nutzungsbedingungen und Support (in dieser App: `/#/datenschutz`, `/#/nutzungsbedingungen`, `/#/support`).

## Marketplace-Konfiguration

| Feld | Wert |
| --- | --- |
| App-Name | IWS Arbeitsblätter |
| App-Typ | General App / Zoom App |
| Home URL | `https://<host>/` |
| Redirect URL for OAuth | `https://<host>/auth.html` |
| Domain allow list | Ihr Host + `appssdk.zoom.us` |
| Scopes | `zoomapp:inmeeting` (optional `zoomapp:inwebinar`) |
| SDK APIs | `getRunningContext`, `getUserContext`, `openUrl`, `shareApp`, `expandApp` |
| Guest mode | an (Teilnehmende brauchen kein Zoom-Login für die Formulare) |
| PWA Client | an, falls verfügbar |

Beispiel-Manifest: `app-manifest.example.json`. Platzhalter `YOUR-DOMAIN` ersetzen.

## Listing-Text (deutsch)

**Kurzbeschreibung**
Digitale Arbeitsblätter zum Programm „In Würde zu sich stehen“. Formulare ausfüllen, lokal im Browser speichern, in der IWS-Gruppe oder im Zoom-Meeting nutzen.

**Lange Beschreibung**
IWS Arbeitsblätter macht alle Arbeitsblätter des IWS-Handbuchs (Erwachsene, April 2024) als ausfüllbare Formulare verfügbar – von der Abwägung der Offenlegung über die fünf Stufen und die eigene Geschichte bis zum Auffrischungstermin und den Anhängen.

Angaben bleiben auf dem Gerät (localStorage). Es gibt kein Nutzerkonto und keine serverseitige Speicherung der Formularinhalte. Die App kann in Zoom-Meetings als Seitenpanel geöffnet werden; „Vergrößern“ und „Teilen“ nutzen das Zoom Apps SDK.

IWS ist keine Therapie. Das Urheberrecht am Handbuch bleibt bei Nicolas Rüsch & Kolleginnen/Kollegen bzw. Patrick W. Corrigan & Kolleginnen/Kollegen.

**Kategorie:** Education / Healthcare / Collaboration
**Sprache:** Deutsch

## Listing-Text (english, oft vom Marketplace verlangt)

**Short description**
Fillable worksheets for the Honest, Open, Proud / In Würde zu sich stehen program. Entries stay on the device.

**Long description**
IWS Arbeitsblätter provides every worksheet from the German adult workbook as a web form. Participants and peer facilitators can complete the sheets during or between group sessions, including inside a Zoom meeting panel.

Answers are stored in the browser’s localStorage only. The app does not create accounts and does not upload worksheet content. Optional Zoom Apps SDK calls detect the running context and allow expanding or sharing the app.

This is not therapy. Program materials remain copyrighted by the IWS / HOP authors.

## Screenshots (vor dem Submit)

1. Startseite mit Lektionsübersicht
2. Ausgefülltes Arbeitsblatt 1.3 (Vor- und Nachteile)
3. Skalen auf Arbeitsblatt 2.2
4. Mobile / schmales Zoom-Panel
5. Datenschutzseite

Keine echten Teilnehmerdaten zeigen.

## Was diese Codebasis nicht automatisch kann

- Zoom-Entwicklerkonto anlegen
- Client ID/Secret erzeugen
- Die Marketplace-Review anstoßen oder genehmigen

Nach dem Deploy: App in marketplace.zoom.us anlegen, URLs eintragen, **Local Test** / **Beta** mit der Zoom-Client-App prüfen, dann **Submit for Review**.
