import type { WorksheetDef } from '../types'
import {
  area,
  empowermentSheet,
  gefuehleSheet,
  geschichteSheet,
  note,
  pair,
  quad,
  scale7,
  section,
  sheet,
  sum,
  vorNachteileSheet,
} from './helpers'

const L1 = 'Lektion 1'
const L1T = 'Abwägen der Vor- und Nachteile von Offenlegung'
const L2 = 'Lektion 2'
const L2T = 'Stufen der Offenlegung'
const L3 = 'Lektion 3'
const L3T = 'Ihre Geschichte erzählen'
const L4 = 'Lektion 4'
const L4T = 'Auffrischungstermin'

export const worksheets: WorksheetDef[] = [
  sheet({
    id: '1-1',
    number: '1.1',
    title: 'Offenlegung und mehr',
    lesson: '1',
    lessonTitle: `${L1}. ${L1T}`,
    pages: '8–12',
    intro:
      'Christina bezeichnet sich als „psychisch krank“ und spricht öffentlich gegen Stigma. Markus sieht sich nicht als „psychisch krank“ und hält seine Erkrankung geheim. Dieses Blatt hilft, die eigene Position zu klären.',
    sections: [
      section('Teil 1: Identifikation mit psychischer Erkrankung', [
        pair('christina', 'Vorteile (Christina)', 'Nachteile (Christina)'),
        pair('markus', 'Vorteile (Markus)', 'Nachteile (Markus)'),
        {
          type: 'radio',
          id: 'identifikation',
          label: 'Sehen Sie sich selbst als Menschen mit einer psychischen Erkrankung?',
          options: [
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein' },
          ],
        },
        area('identifikation_warum', 'Warum oder warum nicht?'),
      ]),
      section(
        'Teil 2: Welche Rolle spielen Begriffe?',
        [
          area(
            'andere_begriffe',
            'Welche anderen Begriffe (außer „psychische Erkrankung“) gibt es für Ihr stigmatisiertes Problem?',
          ),
          {
            type: 'text',
            id: 'gewaehlter_begriff',
            label: 'Welchen Begriff möchten Sie verwenden?',
          },
        ],
        'Worte können verletzen. Nach der Diskussion können Sie den für Sie passenden Begriff wählen.',
      ),
      section(
        'Teil 3: Leide ich unter Selbststigma?',
        [
          note(
            'Das Programm IWS geht davon aus, dass folgende Stereotypen falsch und ungerecht sind, aber vorkommen: Menschen mit psychischer Erkrankung seien schwach, nichts mehr wert, Menschen zweiter Klasse, keine richtigen Menschen mehr, selbst schuld, nicht belastbar.',
          ),
          note(
            'Unglücklicherweise stimmen manche Menschen mit psychischer Erkrankung diesen Meinungen zu und wenden sie gegen sich selbst.',
            'warn',
          ),
          scale7(
            's_schwach',
            'Manchmal stimme ich Vorurteilen zu. Menschen mit einer psychischen Erkrankung sind schwach.',
            'überhaupt nicht',
            'sehr',
            'etwas',
          ),
          scale7(
            's_schaemen',
            'Manchmal stimme ich Vorurteilen zu. Ich sollte mich für meine psychische Erkrankung schämen.',
            'überhaupt nicht',
            'sehr',
            'etwas',
          ),
          scale7(
            's_wert',
            'Manchmal stimme ich Vorurteilen zu. Ich glaube, dass ich aufgrund meiner psychischen Erkrankung weniger wert bin.',
            'überhaupt nicht',
            'sehr',
            'etwas',
          ),
          scale7(
            's_inkompetent',
            'Manchmal stimme ich Vorurteilen zu. Aufgrund meiner psychischen Erkrankung bin ich inkompetent.',
            'überhaupt nicht',
            'sehr',
            'etwas',
          ),
          sum('summe', 'Bitte Zahlen addieren & Summe eintragen', [
            's_schwach',
            's_schaemen',
            's_wert',
            's_inkompetent',
          ], [
            {
              min: 0,
              max: 20,
              text: '20 oder weniger: Anhang 1 ist optional. Auch bei niedriger Punktzahl können Sie ihn durcharbeiten.',
            },
            {
              min: 21,
              max: 28,
              text: 'Über 20: Anhang 1 (Persönlich verletzendes Selbststigma verändern) kann besonders hilfreich sein. Niemand muss ihn ausfüllen.',
            },
          ]),
        ],
        'Bitte beantworten Sie die folgenden Fragen auf 7-Punkte-Skalen, um festzustellen, ob Ihnen Anhang 1 helfen könnte.',
      ),
    ],
  }),

  sheet({
    id: '1-2',
    number: '1.2',
    title: 'Einige Gründe, warum Menschen ihre psychische Erkrankung offenlegen',
    lesson: '1',
    lessonTitle: `${L1}. ${L1T}`,
    pages: '14–16',
    intro:
      'Markieren Sie die Gründe mit einem Stern (*), die für Sie wichtig sind. Gibt es weitere Gründe? Dann fügen Sie sie am Ende ein.',
    sections: [
      section('Gründe', [
        {
          type: 'starlist',
          id: 'gruende',
          label: 'Gründe, die für Sie wichtig sind (*)',
          items: [
            {
              id: 'geheimnis',
              title: 'Das Geheimnis loswerden',
              quotes: [
                '„Ich wollte einfach, dass andere Bescheid wissen über meinen Klinikaufenthalt.“',
                '„Ich möchte nicht weiter das Geheimnis mit mir herumtragen.“',
                '„Ich habe mich schlecht gefühlt, es für mich zu behalten, und möchte mich nicht mehr schlecht fühlen.“',
              ],
            },
            {
              id: 'verstaendnis',
              title: 'Verständnis und soziale Kontakte',
              quotes: [
                '„Ich hoffe, andere werden nicht nur meine psychische Erkrankung verstehen, sondern auch meine Schwierigkeit damit, sie geheim zu halten.“',
                '„Es wäre schön, wenn mir jemand sagen würde: ‚Ich habe auch Probleme gehabt‘.“',
                '„Indem ich mit meiner Erkrankung offen umgehe, wird es mir leichter fallen, Freunde zu finden.“',
              ],
            },
            {
              id: 'unterstuetzung',
              title: 'Unterstützung und Hilfestellung',
              quotes: [
                '„Manchmal bin ich traurig und suche Leute, die mich unterstützen können.“',
                '„Kannst du mich zum Arzt fahren?“',
                '„Manchmal brauche ich einfach jemanden zum Reden.“',
                '„Ich wollte, dass andere Bescheid wissen und ich sie bei Bedarf um Hilfe bitten kann.“',
              ],
            },
            {
              id: 'arbeitsplatz',
              title: 'Änderungen am Arbeitsplatz',
              quotes: [
                '„Meine Prioritäten haben sich verschoben, heute ist Karriere nicht mehr alles für mich. Meine Gesundheit geht vor.“',
                '„Ich erkenne schneller, wenn meine Belastungsgrenze erreicht ist, und kann mich besser auch gegenüber Vorgesetzten abgrenzen.“',
                '„Ich komme diese Woche später in die Arbeit, mir geht’s nicht so gut, nächste Woche werde ich die Zeit nachholen.“',
              ],
            },
            {
              id: 'selbstwert',
              title: 'Selbstwert / Selbstbild / Selbstbestimmung / Authentizität',
              quotes: [
                '„Freundschaft bedeutet Ehrlichkeit und Zusammenhalt.“',
                '„Die Entscheidung zur Offenlegung bedeutet für mich, selbst bestimmen zu können, wem ich etwas erzähle.“',
                '„Ich möchte sein können, wer ich bin, und mich nicht mehr verstecken.“',
              ],
            },
            {
              id: 'familie',
              title: 'Familie',
              quotes: [
                '„Ich möchte mit meiner Familie offen umgehen können und nichts verschweigen müssen.“',
              ],
            },
            {
              id: 'selbsthilfe',
              title: 'Selbsthilfe, Peer Support',
              quotes: [
                '„Ich möchte Kontakt zu Selbsthilfegruppen und Netzwerken wie EX-IN aufnehmen, und das geht nur, wenn ich mit meiner Erkrankung zumindest dort offen umgehe.“',
              ],
            },
            {
              id: 'stigma',
              title: 'Stigma-Abbau und Klarheit',
              quotes: [
                '„Ich möchte ein Beispiel geben, dass Offenheit möglich ist, und damit öffentliches Stigma und Selbststigma auch bei anderen abbauen helfen.“',
                '„Ich möchte Klarheit schaffen und Missverständnisse anderer, wie sie mit mir umgehen sollen, ausräumen.“',
              ],
            },
          ],
        },
        area(
          'weitere_gruende',
          'Fallen Ihnen weitere Gründe ein, warum Menschen ihre psychischen Erkrankungen offenlegen?',
        ),
      ]),
      section('Einige Vor- und Nachteile von Offenlegung', [
        note(
          'Vorteile sind Argumente für und positive Folgen von Offenlegung. Nachteile sind Gründe gegen Offenlegung bzw. der Schaden, der eintreten könnte.',
        ),
        pair('offenlegung', 'Vorteile', 'Nachteile'),
      ]),
      section('Einige Vor- und Nachteile von Geheimhaltung', [
        pair('geheimhaltung', 'Vorteile', 'Nachteile'),
      ]),
    ],
  }),

  vorNachteileSheet(
    '1-3',
    '1.3',
    'Vor- und Nachteile der Offenlegung meiner psychischen Erkrankung',
    '1',
    `${L1}. ${L1T}`,
    '22',
    'Nur Sie können die Vor- und Nachteile für sich abwägen. Vorteile sind Gründe für Offenlegung. Fragen Sie sich: „Inwiefern wird es mir helfen, wenn ich anderen Menschen über meine psychische Erkrankung berichte?“ Nachteile: „Inwiefern kann es mich verletzen?“',
  ),

  vorNachteileSheet(
    '1-3-hw',
    '1.3 Hausaufgabe',
    'Vor- und Nachteile – weiteres Umfeld',
    '1',
    `${L1}. ${L1T}`,
    '24',
    'Füllen Sie dieses Blatt für ein anderes Umfeld und eine andere Person aus, gegenüber der Sie sich möglicherweise öffnen wollen.',
  ),

  sheet({
    id: '2-1',
    number: '2.1',
    title: 'Vor- und Nachteile der fünf Stufen oder Wege der Offenlegung',
    lesson: '2',
    lessonTitle: `${L2}. ${L2T}`,
    pages: '30',
    intro:
      'Wenn Sie derzeit keinen Arbeitsplatz haben, nehmen Sie einen, an dem Sie in der Vergangenheit gearbeitet haben oder an dem Sie sich vorstellen können, in Zukunft zu arbeiten.',
    sections: [
      section('Fünf Stufen', [
        { type: 'text', id: 'umfeld', label: 'Umfeld' },
        {
          type: 'stages',
          id: 'stufen',
          stages: [
            { id: 'vermeidung', title: '1. Vermeidung sozialer Kontakte' },
            { id: 'geheimhaltung', title: '2. Geheimhaltung' },
            { id: 'ausgewaehlt', title: '3. Ausgewählte Offenlegung' },
            { id: 'uneingeschraenkt', title: '4. Uneingeschränkte Offenlegung' },
            { id: 'aktiv', title: '5. Aktive Verbreitung Ihrer Erfahrung' },
          ],
        },
      ]),
    ],
  }),

  sheet({
    id: '2-2',
    number: '2.2',
    title: 'Bei einer Person für die Offenlegung „vorfühlen“',
    lesson: '2',
    lessonTitle: `${L2}. ${L2T}`,
    pages: '36–37',
    intro:
      'Suchen Sie eine Person, der Sie sich eventuell anvertrauen könnten. Überlegen Sie sich ein positives Beispiel aus Nachrichten, Fernsehen oder Film und bewerten Sie die Reaktion.',
    sections: [
      section('Gespräch', [
        { type: 'text', id: 'name', label: 'Name des Gesprächspartners' },
        area(
          'geschichte',
          'Geschichte aus Nachrichten/TV-Serie/Film (positive Darstellung einer Person mit einer psychischen Erkrankung)',
        ),
        area('denken_geschichte', 'Was denken Sie über Geschichten wie diese?'),
        area(
          'denken_personen',
          'Was denken Sie über Personen wie diese in der Geschichte?',
        ),
        area('kennen', 'Kennen Sie jemanden, der so ist?'),
      ]),
      section('Bewertung der Reaktion', [
        scale7(
          'verstaendnisvoll',
          'Die Reaktion der Person war verständnisvoll.',
          'stimme gar nicht zu',
          'stimme völlig zu',
          'stimme teilweise zu',
        ),
        scale7(
          'freundlich',
          'Seine/Ihre Reaktion war freundlich.',
          'stimme gar nicht zu',
          'stimme völlig zu',
          'stimme teilweise zu',
        ),
        scale7(
          'antworten',
          'Es sind die Antworten, die ich hören möchte, wenn ich mich ihm/ihr gegenüber öffne.',
          'stimme gar nicht zu',
          'stimme völlig zu',
          'stimme teilweise zu',
        ),
        sum(
          'summe',
          'Zählen Sie die Punkte zusammen',
          ['verstaendnisvoll', 'freundlich', 'antworten'],
          [
            { min: 16, max: 21, text: '16–21: Wahrscheinlich eine geeignete Person, um sich ihr gegenüber zu öffnen.' },
            { min: 10, max: 15, text: '10–15: Unsicher.' },
            { min: 3, max: 9, text: '3–9: Wahrscheinlich keine geeignete Person, um sich ihr gegenüber zu öffnen.' },
          ],
        ),
        area(
          'sonstiges',
          'Gab es sonst noch etwas Wichtiges in Bezug auf die Reaktion?',
        ),
      ]),
    ],
  }),

  sheet({
    id: '2-3',
    number: '2.3',
    title: 'Sind Sie in der Lage, mit negativen Reaktionen anderer auf Ihre Offenlegung umzugehen?',
    lesson: '2',
    lessonTitle: `${L2}. ${L2T}`,
    pages: '41–42',
    intro:
      'Suchen Sie sich einen Partner für das Rollenspiel. Ziel ist nicht schlagfertige Antworten zu üben, sondern wahrzunehmen, wie Sie sich fühlen, wenn jemand harsch reagiert. Mehr als 4 Punkte auf einer Skala deuten an, dass diese Art von Beleidigung Sie verletzen wird.',
    sections: [
      section('Ihr Beispiel', [
        note(
          'Beispiel aus dem Arbeitsbuch: „Ich war schon sechs Mal wegen Schizophrenie im Krankenhaus.“',
        ),
        area('beispiel', 'Schreiben Sie Ihr Beispiel hier auf'),
        note(
          'Ihr Partner sagt unter anderem: „Echt – und die haben dich wieder rausgelassen?“, „Verlieren Sie öfters mal die Kontrolle?“, „Ich lasse mich versetzen.“, „Gehen Sie dann abends zum Schlafen in die Klapse?“',
          'warn',
        ),
      ]),
      section('Wie fühlen Sie sich?', [
        scale7('scham', 'Ich schäme mich …', 'überhaupt nicht', 'sehr', 'etwas'),
        scale7('nervos', 'Ich bin … nervös', 'überhaupt nicht', 'sehr', 'etwas'),
        scale7('trauer', 'Ich bin … traurig', 'überhaupt nicht', 'sehr', 'etwas'),
        scale7('wut', 'Ich bin … wütend', 'überhaupt nicht', 'sehr', 'etwas'),
        area('reaktionen_erlebt', 'Welche Reaktionen haben Sie erlebt? Gibt es noch andere Beispiele?'),
        area(
          'antworten',
          'Wie könnten Sie antworten, wenn andere sich so negativ äußern?',
        ),
      ]),
    ],
  }),

  geschichteSheet(
    '3-1',
    '3.1',
    'Leitfaden für die Entwicklung Ihrer Geschichte',
    '3',
    `${L3}. ${L3T}`,
    '52–53',
    'Dies ist nur eine Möglichkeit, Ihre Geschichte zu erzählen. Für diese Übung nehmen wir an, Sie erzählen sie einem vertrauten Freund. Sagen Sie nichts, mit dem Sie sich unwohl fühlen. Nehmen Sie keine Traumainhalte auf.',
  ),

  gefuehleSheet(
    '3-2',
    '3.2',
    'Wie haben Sie sich gefühlt?',
    '3',
    `${L3}. ${L3T}`,
    '55',
    'Verwenden Sie die 7-Punkte-Skalen, um Ihre Erfahrung während des Erzählens Ihrer Geschichte zu bewerten. Werten Sie Ihre Gefühle nicht ab.',
  ),

  sheet({
    id: '3-3',
    number: '3.3',
    title: 'Details Ihrer Offenlegung – Wie ist es Ihnen ergangen?',
    lesson: '3',
    lessonTitle: `${L3}. ${L3T}`,
    pages: '57',
    intro:
      'Bewerten Sie ein spezifisches Beispiel von Offenlegung. Halten Sie das Gesagte möglichst genau fest.',
    sections: [
      section('Der Austausch', [
        { type: 'text', id: 'person', label: 'Name der Person, gegenüber der Sie sich geöffnet haben' },
        { type: 'text', id: 'datum_ort', label: 'Datum und Ort der Offenlegung' },
        pair('inhalt', 'Ihr(e) Ziel(e)', 'Was Sie gesagt haben'),
        area(
          'reaktion',
          'Wie hat die Person reagiert (evtl. auch Tonfall, Körpersprache)?',
        ),
        scale7(
          'zufrieden',
          'Wie zufrieden sind Sie mit dem Austausch?',
          'überhaupt nicht zufrieden',
          'sehr zufrieden',
          'weder noch',
        ),
        scale7(
          'positiv',
          'Wie positiv war der Austausch?',
          'überhaupt nicht positiv',
          'sehr positiv',
          'weder noch',
        ),
        sum(
          'summe',
          'Zählen Sie die Punkte zusammen',
          ['zufrieden', 'positiv'],
          [
            { min: 11, max: 14, text: '> 10: Gute Erfahrung; lohnt sich zu wiederholen.' },
            { min: 6, max: 10, text: '6–10: Brauche mehr Informationen.' },
            { min: 2, max: 5, text: '< 6: Nicht so gut; was ist falsch gelaufen?' },
          ],
        ),
      ]),
    ],
  }),

  sheet({
    id: '3-4',
    number: '3.4',
    title: 'Wo finde ich Selbsthilfe-/Peer-geleitete Programme?',
    lesson: '3',
    lessonTitle: `${L3}. ${L3T}`,
    pages: '59–60',
    intro:
      'Schreiben Sie alle Selbsthilfe-/Peer-geleiteten Programme auf, die Sie kennen, und was Ihnen daran gefällt. Danach sollte die Gruppe eine gemeinsame Liste erstellen.',
    sections: [
      section('Ihre Liste', [
        {
          type: 'table',
          id: 'programme',
          minRows: 3,
          columns: [
            { id: 'name', label: 'Name des Programms' },
            { id: 'ort', label: 'Ort und Ansprechpartner' },
            { id: 'gefallen', label: 'Was mir an diesem Programm gefällt' },
          ],
        },
        note(
          'Deutschland: Aktionsbündnis Seelische Gesundheit (seelischegesundheit.net), NetzG (netzg.org), DGBS, EX-IN (ex-in.de), NAKOS (nakos.de, 030 31018960), Stiftung Deutsche Depressionshilfe. Europa: ENUSP (enusp.org).',
          'tip',
        ),
      ]),
    ],
  }),

  sheet({
    id: '3-5',
    number: '3.5',
    title: 'Erkenntnisse und weiteres Vorgehen',
    lesson: '3',
    lessonTitle: `${L3}. ${L3T}`,
    pages: '62–63',
    intro:
      'Überdenken Sie, was Sie im Laufe dieses Programms gelernt haben. Diese Fragen sollen Diskussionsgrundlage sein.',
    sections: [
      section('Fragen zur Diskussion', [
        area('gelernt', 'Was haben Sie aus diesem Programm zum Thema Stigma und Offenlegung gelernt?'),
        area(
          'vor_nachteile',
          'Was sind die Vor- und Nachteile einer Offenlegung? Würden Sie sich in bestimmten Situationen anderen gegenüber öffnen? Wenn ja – wo? (Arbeitsblatt 1.3)',
        ),
        area('stufe', 'Welche Stufe der Offenlegung würden Sie wählen? (Arbeitsblatt 2.1)'),
        area('wem', 'Wem gegenüber würden Sie sich öffnen? (Arbeitsblatt 2.2)'),
        area(
          'gefuehle',
          'Welche Gefühle hatten Sie bei stigmatisierenden Antworten, die Sie von anderen erhalten haben? (Arbeitsblatt 2.3)',
        ),
        area(
          'selbsthilfe',
          'Gibt es Selbsthilfe-/Unterstützungsangebote durch Peers, die für Sie geeignet sein könnten? (Arbeitsblatt 3.4)',
        ),
        area(
          'geschichte',
          'Was denken Sie über Ihre eigene Geschichte? Wie können Sie Ihre Erzählung verbessern? (Arbeitsblätter 3.1 und 3.2)',
        ),
        area(
          'zukunft',
          'Als Zusammenfassung listen Sie drei Dinge auf, die Sie im Hinblick auf Ihre Offenlegung in Zukunft tun möchten.',
        ),
      ]),
    ],
  }),

  sheet({
    id: '4-1',
    number: '4.1',
    title: 'Absicht der Offenlegung – Wem gegenüber? Wann? Wo? Was?',
    lesson: '4',
    lessonTitle: `${L4}. ${L4T}`,
    pages: '66',
    intro:
      'Als Sie vor einem Monat das IWS-Programm beendet haben, hatten Sie da die Absicht, sich zu öffnen?',
    sections: [
      section('Ihre Absicht', [
        {
          type: 'radio',
          id: 'absicht',
          label: 'Hatten Sie die Absicht, sich zu öffnen?',
          options: [
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein' },
          ],
        },
        note('Falls ja, beantworten Sie bitte die folgenden Fragen:'),
        area('wem', 'Wem gegenüber wollten Sie sich öffnen?'),
        area('zeitpunkt', 'Zu welchem Zeitpunkt wollten Sie sich öffnen?'),
        area('ort', 'Welchen Ort hatten Sie sich für die Offenlegung ausgesucht?'),
        area('ziel', 'Welches Ziel wollten Sie durch die Offenlegung erreichen?'),
        area('warum_nicht', 'Falls nein, warum haben Sie sich dagegen entschieden?'),
      ]),
    ],
  }),

  sheet({
    id: '4-2',
    number: '4.2',
    title: 'Haben Sie sich anderen gegenüber geöffnet? Wie hat es funktioniert?',
    lesson: '4',
    lessonTitle: `${L4}. ${L4T}`,
    pages: '68–69',
    intro:
      'Füllen Sie bitte diese Seite über eine Offenlegung im letzten Monat aus. Falls nein, können Sie von den Erfahrungen anderer Teilnehmer lernen und das Blatt als Übung ausfüllen.',
    sections: [
      section('Der Austausch', [
        { type: 'text', id: 'person', label: 'Name der Person, gegenüber der Sie sich geöffnet haben' },
        { type: 'text', id: 'datum_ort', label: 'Datum und Ort der Offenlegung' },
        pair('inhalt', 'Ihr(e) Ziel(e)', 'Was Sie gesagt haben'),
        area(
          'reaktion',
          'Wie hat die Person reagiert (evtl. auch Tonfall, Körpersprache)?',
        ),
        scale7(
          'zufrieden',
          'Wie zufrieden sind Sie mit dem Austausch?',
          'überhaupt nicht zufrieden',
          'sehr zufrieden',
          'weder noch',
        ),
        scale7(
          'positiv',
          'Wie positiv war der Austausch?',
          'überhaupt nicht positiv',
          'sehr positiv',
          'weder noch',
        ),
        sum(
          'summe',
          'Zählen Sie die Punkte zusammen',
          ['zufrieden', 'positiv'],
          [
            { min: 11, max: 14, text: '> 10: Gute Erfahrung; lohnt sich zu wiederholen.' },
            { min: 6, max: 10, text: '6–10: Brauche mehr Informationen.' },
            { min: 2, max: 5, text: '< 6: Nicht so gut; was ist falsch gelaufen?' },
          ],
        ),
        {
          type: 'radio',
          id: 'meinung_geaendert',
          label:
            'Hat diese Erfahrung Ihre Meinung darüber geändert, ob Sie sich in Zukunft anderen gegenüber öffnen werden oder nicht?',
          options: [
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein' },
          ],
        },
        area('was_veraendert', 'Was hat sich verändert?'),
      ]),
    ],
  }),

  sheet({
    id: '4-3',
    number: '4.3',
    title: 'Haben Sie an Selbsthilfe-/Peer-geleiteten Programmen teilgenommen?',
    lesson: '4',
    lessonTitle: `${L4}. ${L4T}`,
    pages: '72–74',
    sections: [
      section('Teil 1', [
        area('bedeutung', 'Beschreiben Sie kurz, was Selbsthilfe/Peer-Unterstützung für Sie bedeutet.'),
        pair('bilanz', 'Vorteile', 'Nachteile'),
      ]),
      section('Teil 2', [
        {
          type: 'radio',
          id: 'teilgenommen',
          label: 'Haben Sie seit Ende des IWS-Programms an einem Selbsthilfe-/Peer-geleiteten Programm teilgenommen?',
          options: [
            { value: 'ja', label: 'Ja' },
            { value: 'nein', label: 'Nein' },
          ],
        },
        { type: 'text', id: 'programm', label: 'Wenn ja, wie hieß das Programm?' },
        { type: 'text', id: 'wann', label: 'Wann fand das Treffen statt?' },
        { type: 'text', id: 'wo', label: 'Wo fand das Treffen statt?' },
        scale7(
          'gut',
          'Ich fand das Selbsthilfe-/Peer-geleitete Programm gut.',
          'stimme überhaupt nicht zu',
          'stimme völlig zu',
          'weder noch',
        ),
        scale7(
          'wieder',
          'Ich werde wieder an dem Selbsthilfe-/Peer-geleiteten Programm teilnehmen.',
          'stimme überhaupt nicht zu',
          'stimme völlig zu',
          'weder noch',
        ),
        scale7(
          'empfehlen',
          'Ich würde das Selbsthilfe-/Peer-geleitete Programm auch anderen empfehlen.',
          'stimme überhaupt nicht zu',
          'stimme völlig zu',
          'weder noch',
        ),
        area(
          'wieder_warum',
          'Werden Sie wieder bei diesem Selbsthilfe-/Peer-geleiteten Programm teilnehmen? Warum oder warum nicht?',
        ),
        area(
          'anderes',
          'Werden Sie sich ein anderes Selbsthilfe-/Peer-geleitetes Programm suchen? Warum oder warum nicht?',
        ),
      ]),
    ],
  }),

  sheet({
    id: '4-4',
    number: '4.4',
    title: 'Erneute Bewertung der Vor- und Nachteile der Offenlegung',
    lesson: '4',
    lessonTitle: `${L4}. ${L4T}`,
    pages: '78–79',
    intro:
      'Listen Sie alle Vor- und Nachteile auf, die Ihnen jetzt in den Sinn kommen – auch wenn Sie sie schon einmal notiert haben. Vergleichen Sie anschließend mit Arbeitsblatt 1.3.',
    sections: [
      section('Aktuelle Abwägung', [
        { type: 'text', id: 'erkrankung', label: 'Erkrankung' },
        { type: 'text', id: 'umfeld', label: 'Umfeld' },
        { type: 'text', id: 'wem', label: 'Wem gegenüber?' },
        {
          type: 'radio',
          id: 'entscheidung',
          label: 'Seit Ende des IWS-Programms',
          options: [
            { value: 'offenlegen', label: 'habe ich mich entschlossen, meine psychische Erkrankung offenzulegen.' },
            { value: 'nicht', label: 'habe ich mich entschlossen, meine psychische Erkrankung nicht offenzulegen.' },
            { value: 'aufschieben', label: 'habe ich mich entschlossen, meine Entscheidung aufzuschieben.' },
          ],
        },
        quad('bilanz'),
        area(
          'sterne_unterschied',
          'Unterscheiden sich die mit einem Stern (*) markierten Punkte zwischen den beiden Arbeitsblättern?',
        ),
        area(
          'neue_sterne',
          'Haben Sie einige neue Punkte mit einem Stern (*) als besonders wichtig markiert? Wenn ja, welche?',
        ),
        area('warum_aenderung', 'Warum, glauben Sie, haben Sie diese Änderungen vorgenommen?'),
      ]),
    ],
  }),

  sheet({
    id: '4-5',
    number: '4.5',
    title: 'Inwieweit hat sich Ihre Geschichte geändert?',
    lesson: '4',
    lessonTitle: `${L4}. ${L4T}`,
    pages: '82–83',
    intro:
      'Schauen Sie sich erneut Ihr ausgefülltes Arbeitsblatt 3.1 an. Teil 1 nur ausfüllen, wenn Sie sich bereits geöffnet haben. Sonst direkt mit Teil 2 weitermachen.',
    sections: [
      section('Teil 1 – wenn Sie sich geöffnet haben', [
        pair('erfahrung', 'Das hat funktioniert', 'Das hat nicht funktioniert'),
      ]),
      section('Teil 2 – Anpassungen', [
        pair('aenderungen', 'Punkte, die ich hinzufügen möchte', 'Punkte, die ich streichen möchte'),
        area(
          'ziel_geaendert',
          'Hat sich Ihr Ziel der Offenlegung geändert, nachdem Sie Ihre Geschichte neu geschrieben haben? Bitte erläutern.',
        ),
      ]),
    ],
  }),

  geschichteSheet(
    '4-6',
    '4.6',
    'Leitfaden für die Entwicklung Ihrer Geschichte (aktualisiert)',
    '4',
    `${L4}. ${L4T}`,
    '84–85',
    'Leere Vorlage für Ihre überarbeitete Geschichte. Übernehmen Sie die Änderungen, für die Sie sich in Arbeitsblatt 4.5 entschieden haben.',
  ),

  gefuehleSheet(
    '4-7',
    '4.7',
    'Wie haben Sie sich gefühlt? (aktualisierte Geschichte)',
    '4',
    `${L4}. ${L4T}`,
    '87',
    'Bewerten Sie die Qualität Ihrer Erfahrung während des Erzählens Ihrer umgeschriebenen Geschichte.',
  ),

  sheet({
    id: 'a-1',
    number: 'A.1',
    title: 'Einstellungen verändern',
    lesson: 'anhang',
    lessonTitle: 'Anhang 1. Persönlich verletzendes Selbststigma verändern',
    pages: '94',
    intro:
      'Vier Schritte, um persönlich verletzende Aussagen zu ändern. Wählen Sie Personen, denen Sie vertrauen und die Ihnen ehrlich antworten.',
    sections: [
      section('Vier Schritte', [
        note(
          'Beispiel: „Ich muss schwach sein, weil ich eine psychische Erkrankung habe.“ → allgemeingültige Annahme: „Alle Menschen mit einer psychischen Erkrankung sind schwach.“ → Rückmeldung einholen → Kontersatz: „Ich bin nicht schwach, weil ich eine psychische Erkrankung habe. Im Gegenteil: Ich bin stark, weil ich dennoch weiter meinen Weg gehe.“',
          'tip',
        ),
        {
          type: 'text',
          id: 'annahme',
          label: '1. Nennen Sie eine negative Annahme über sich selbst: Ich muss … sein, weil ich eine psychische Erkrankung habe.',
        },
        area('allgemein', '2. Definieren Sie die dahinterstehende allgemeingültige Annahme.'),
        area('hinweise', '3. Sammeln Sie Hinweise und Rückmeldungen, um die Annahme zu überprüfen.'),
        area(
          'kontersatz',
          '4. Formulieren Sie die Annahme so um, dass sie nicht mehr negativ ist. Das ist ein Kontersatz.',
        ),
      ]),
    ],
  }),

  empowermentSheet(
    'a-2',
    'A.2',
    'VOR der Teilnahme am Programm – Empowerment-Selbstbeurteilungs-Fragebogen',
    'vor',
    '97–99',
  ),

  empowermentSheet(
    'a-3',
    'A.3',
    'NACH der Teilnahme am Programm – Empowerment-Selbstbeurteilungs-Fragebogen',
    'nach',
    '100–102',
  ),

  sheet({
    id: 'a-4',
    number: 'A.4',
    title: 'Vergleich Ihrer Empowerment-Punktzahlen',
    lesson: 'anhang',
    lessonTitle: 'Anhang 3',
    pages: '104',
    intro:
      'Die Balken werden automatisch aus Arbeitsblatt A.2 (davor) und A.3 (danach) berechnet, sobald diese ausgefüllt sind. Inwiefern unterscheiden sich Ihre Punktzahlen vor und nach der Teilnahme?',
    sections: [
      section('Vergleich', [
        {
          type: 'chart',
          id: 'vergleich',
          label: 'Vergleich für Sie selbst und Ihr Umfeld – haben sich Ihre Punktzahlen verbessert?',
          beforeId: 'a-2',
          afterId: 'a-3',
          beforeKeys: ['kasten1', 'kasten2'],
          afterKeys: ['kasten1', 'kasten2'],
        },
        area(
          'reflexion',
          'Schauen Sie sich die Balkengrafik an. Inwiefern unterscheiden sich Ihre Punktzahlen vor und nach der Teilnahme?',
        ),
      ]),
    ],
  }),

  vorNachteileSheet(
    '1-3-extra-1',
    '1.3 Extra 1',
    'Vor- und Nachteile der Offenlegung (Leerformular)',
    'anhang',
    'Anhang 4. Zusätzliche Leerformulare',
    '106',
    'Zusätzliches Leerformular aus Anhang 4 – für ein weiteres Umfeld.',
  ),

  vorNachteileSheet(
    '1-3-extra-2',
    '1.3 Extra 2',
    'Vor- und Nachteile der Offenlegung (Leerformular)',
    'anhang',
    'Anhang 4. Zusätzliche Leerformulare',
    '107',
    'Zweites zusätzliches Leerformular aus Anhang 4.',
  ),

  geschichteSheet(
    '3-1-extra-1',
    '3.1 Extra 1',
    'Leitfaden für die Entwicklung Ihrer Geschichte (Leerformular)',
    'anhang',
    'Anhang 4. Zusätzliche Leerformulare',
    '108–109',
    'Zusätzliches Leerformular aus Anhang 4.',
  ),

  geschichteSheet(
    '3-1-extra-2',
    '3.1 Extra 2',
    'Leitfaden für die Entwicklung Ihrer Geschichte (Leerformular)',
    'anhang',
    'Anhang 4. Zusätzliche Leerformulare',
    '110–111',
    'Zweites zusätzliches Leerformular aus Anhang 4.',
  ),
]

export const worksheetIds = worksheets.map((w) => w.id)

export function getWorksheet(id: string): WorksheetDef | undefined {
  return worksheets.find((w) => w.id === id)
}

export type NavGroup = {
  id: string
  title: string
  items: WorksheetDef[]
}

export const navGroups: NavGroup[] = [
  { id: '1', title: 'Lektion 1 – Vor- und Nachteile', items: worksheets.filter((w) => w.lesson === '1') },
  { id: '2', title: 'Lektion 2 – Stufen der Offenlegung', items: worksheets.filter((w) => w.lesson === '2') },
  { id: '3', title: 'Lektion 3 – Ihre Geschichte', items: worksheets.filter((w) => w.lesson === '3') },
  { id: '4', title: 'Lektion 4 – Auffrischung', items: worksheets.filter((w) => w.lesson === '4') },
  { id: 'anhang', title: 'Anhänge', items: worksheets.filter((w) => w.lesson === 'anhang') },
]
