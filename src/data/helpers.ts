import type {
  ChartDef,
  ComputedDef,
  FieldDef,
  NoteDef,
  PairDef,
  QuadDef,
  ScaleDef,
  SectionDef,
  TextareaDef,
  WorksheetDef,
} from '../types'

export function note(text: string, tone: NoteDef['tone'] = 'info'): NoteDef {
  return { type: 'note', text, tone }
}

export function area(
  id: string,
  label: string,
  extra?: Partial<TextareaDef>,
): TextareaDef {
  return { type: 'textarea', id, label, rows: 4, ...extra }
}

export function scale7(
  id: string,
  label: string,
  minLabel: string,
  maxLabel: string,
  midLabel?: string,
): ScaleDef {
  return {
    type: 'scale',
    id,
    label,
    min: 1,
    max: 7,
    minLabel,
    midLabel,
    maxLabel,
  }
}

export function scale5(id: string, label: string): ScaleDef {
  return {
    type: 'scale',
    id,
    label,
    min: 1,
    max: 5,
    minLabel: 'stimme überhaupt nicht zu',
    midLabel: 'weder noch',
    maxLabel: 'stimme völlig zu',
  }
}

export function pair(id: string, leftLabel: string, rightLabel: string): PairDef {
  return { type: 'pair', id, leftLabel, rightLabel, rows: 5 }
}

export function quad(
  id: string,
  hint =
    'Zensieren Sie keine Gedanken. Schreiben Sie alle auf. Setzen Sie einen Stern (*) neben die Punkte, die Ihnen besonders wichtig sind.',
): QuadDef {
  return {
    type: 'quad',
    id,
    hint,
    cells: [
      'Kurzfristige Vorteile',
      'Kurzfristige Nachteile',
      'Langfristige Vorteile',
      'Langfristige Nachteile',
    ],
  }
}

export function sum(
  id: string,
  label: string,
  from: string[],
  interpretation?: ComputedDef['interpretation'],
): ComputedDef {
  return { type: 'computed', id, label, from, interpretation }
}

export function chart(
  id: string,
  label: string,
  beforeId: string,
  afterId: string,
  beforeKeys: [string, string],
  afterKeys: [string, string],
): ChartDef {
  return { type: 'chart', id, label, beforeId, afterId, beforeKeys, afterKeys }
}

export function section(title: string, fields: FieldDef[], intro?: string): SectionDef {
  return { title, intro, fields }
}

export function sheet(
  partial: Omit<WorksheetDef, 'sections'> & { sections: SectionDef[] },
): WorksheetDef {
  return partial
}

export const entscheidungOptions = [
  {
    value: 'offenlegen',
    label: 'habe ich mich entschlossen, meine psychische Erkrankung offenzulegen.',
  },
  {
    value: 'nicht',
    label: 'habe ich mich entschlossen, meine psychische Erkrankung nicht offenzulegen.',
  },
  {
    value: 'aufschieben',
    label: 'habe ich mich entschlossen, meine Entscheidung aufzuschieben.',
  },
]

export function vorNachteileSheet(
  id: string,
  number: string,
  title: string,
  lesson: string,
  lessonTitle: string,
  pages: string,
  intro: string,
  extra: FieldDef[] = [],
): WorksheetDef {
  return sheet({
    id,
    number,
    title,
    lesson,
    lessonTitle,
    pages,
    intro,
    sections: [
      section('Umfeld und Person', [
        { type: 'text', id: 'umfeld', label: 'Umfeld' },
        { type: 'text', id: 'wem', label: 'Wem gegenüber?' },
        quad('bilanz'),
        {
          type: 'radio',
          id: 'entscheidung',
          label: 'Aufgrund dieser Vor- und Nachteile',
          options: entscheidungOptions,
        },
        area(
          'ziel',
          'Was ist das Ziel Ihrer Offenlegung (oder: Ihrer Nicht-Offenlegung/Aufschub)?',
        ),
        area(
          'erwartung',
          'Was erwarten Sie nach Ihrer Offenlegung (oder: Ihrer Nicht-Offenlegung/Aufschub)?',
        ),
        ...extra,
      ]),
    ],
  })
}

export function geschichteSheet(
  id: string,
  number: string,
  title: string,
  lesson: string,
  lessonTitle: string,
  pages: string,
  intro: string,
): WorksheetDef {
  return sheet({
    id,
    number,
    title,
    lesson,
    lessonTitle,
    pages,
    intro,
    sections: [
      section('Ihre Geschichte', [
        note(
          'Wenn Sie möchten, können Sie Umfeld und Adressat festlegen (wo und wem erzählen Sie Ihre Geschichte).',
        ),
        { type: 'text', id: 'name', label: 'Hallo, mein Name ist' },
        {
          type: 'text',
          id: 'erkrankung',
          label: 'und ich habe eine psychische Erkrankung, die … heißt',
        },
        { type: 'text', id: 'umfeld', label: 'Umfeld / Setting (optional)' },
        { type: 'text', id: 'adressat', label: 'Adressat (optional)' },
        area(
          'kindheit',
          'Ich erzähle zunächst aus meiner Kindheit / aus der Zeit vor meiner Erkrankung.',
          {
            hint: 'Schildern Sie einige Ereignisse aus Ihrer Kindheit und Jugend, die typisch für das Leben der meisten Menschen sind, und/oder solche, die am Beginn Ihrer psychischen Erkrankung standen.',
          },
        ),
        { type: 'text', id: 'alter', label: 'Meine psychische Erkrankung begann, als ich etwa … Jahre alt war' },
        area(
          'beginn',
          'Beschreiben Sie einige Schwierigkeiten, die Sie erlebten, als Ihre psychische Erkrankung begann.',
        ),
        area(
          'probleme',
          'Leider verschwand meine psychische Erkrankung nicht schnell wieder.',
          {
            hint: 'Schreiben Sie die Probleme auf, mit denen Sie in den letzten Jahren aufgrund Ihrer psychischen Erkrankung zu kämpfen hatten.',
          },
        ),
        area(
          'recovery',
          'Ich habe meinen Weg hin zu Recovery und zum Leben mit der Erkrankung gefunden. Das, was mir dabei hilft, ist:',
        ),
        area(
          'stigma',
          'Auf meinem Weg wurde ich mit Stigma und unfairen Reaktionen auf meine Erkrankung konfrontiert.',
          { hint: 'Beschreiben Sie einige unfaire und harte Reaktionen, die Sie erfahren haben.' },
        ),
        area(
          'erreicht',
          'Trotz und manchmal auch aufgrund meiner Probleme habe ich in meinem Leben Einiges erreicht.',
          {
            hint: 'Listen Sie einige Dinge auf, die Sie hinsichtlich Ihrer Arbeit/Ihres Dienstes, Beziehungen und anderer persönlicher Ziele erreicht haben.',
          },
        ),
        note(
          'Abschluss: Wie alle Menschen mit oder ohne psychische Erkrankung lebe ich, leiste meinen Beitrag und verbringe meine Freizeit – genau wie Sie auch. Behandeln Sie mich bitte wie jeden anderen auch. Reagieren Sie nicht auf mich auf Grundlage unfairer Vorurteile.',
          'tip',
        ),
      ]),
    ],
  })
}

export function gefuehleSheet(
  id: string,
  number: string,
  title: string,
  lesson: string,
  lessonTitle: string,
  pages: string,
  intro: string,
): WorksheetDef {
  return sheet({
    id,
    number,
    title,
    lesson,
    lessonTitle,
    pages,
    intro,
    sections: [
      section('Bewertung', [
        scale7(
          'selbstbestimmt',
          'Wie selbstbestimmt fühlen Sie sich, nachdem Sie Ihre Geschichte erzählt haben?',
          'überhaupt nicht selbstbestimmt',
          'sehr selbstbestimmt',
          'mäßig selbstbestimmt',
        ),
        scale7(
          'heilsam',
          'War es für Sie heilsam, Ihre Geschichte zu erzählen?',
          'überhaupt nicht heilsam',
          'sehr heilsam',
          'mäßig heilsam',
        ),
        scale7(
          'aengstlich',
          'Wie ängstlich haben Sie sich während des Erzählens gefühlt?',
          'sehr ängstlich',
          'überhaupt nicht ängstlich',
          'mäßig ängstlich',
        ),
        scale7(
          'positiv',
          'Wie positiv war die Erfahrung, Ihre Geschichte zu erzählen?',
          'überhaupt nicht positiv',
          'sehr positiv',
          'mäßig positiv',
        ),
        area(
          'sonstiges',
          'Bitte notieren Sie hier alles, was über Ihre Erfahrung beim Erzählen Ihrer Geschichte noch nicht diskutiert wurde.',
        ),
      ]),
    ],
  })
}

export const empowermentItems = [
  'Ich kann meine persönlichen Ziele erreichen.',
  'Ich will die Sichtweise meines Umfeldes über psychische Erkrankungen ändern.',
  'Ich habe Kontrolle über meine Behandlung.',
  'Es ist in Ordnung, wenn ich mich über Personen aufrege, die Menschen mit psychischen Erkrankungen stigmatisieren.',
  'Ich bin wegen meiner psychischen Erkrankung kein schlechter Mensch.',
  'Wir können gegen Stigmatisierung ankämpfen, wenn wir zusammenarbeiten.',
  'Für mich werden sich die Dinge in Zukunft gut entwickeln.',
  'Ich werde auf Stigmatisierung aufmerksam machen.',
  'Ich bin in Ordnung so, wie ich bin, auch wenn ich eine psychische Erkrankung habe.',
  'Ich werde wütend darüber, wie psychische Erkrankungen im Fernsehen dargestellt werden.',
]

export function empowermentSheet(
  id: string,
  number: string,
  title: string,
  when: 'vor' | 'nach',
  pages: string,
): WorksheetDef {
  const keys = empowermentItems.map((_, i) => `q${i + 1}`)
  const odd = keys.filter((_, i) => i % 2 === 0)
  const even = keys.filter((_, i) => i % 2 === 1)
  return sheet({
    id,
    number,
    title,
    lesson: 'anhang',
    lessonTitle: 'Anhang 3',
    pages,
    intro: `Empowerment-Selbstbeurteilungs-Fragebogen ${when === 'vor' ? 'VOR' : 'NACH'} der Teilnahme am Programm. Wie sehr stimmen Sie den folgenden Aussagen zu?`,
    sections: [
      section('Aussagen', [
        ...empowermentItems.map((label, i) => scale5(`q${i + 1}`, `${i + 1}. ${label}`)),
      ]),
      section('Auswertung', [
        sum(
          'kasten1',
          'Kästchen 1 – ungerade Fragen (Empowerment gegenüber sich selbst)',
          odd,
          [
            {
              min: 0,
              max: 7,
              text: 'Unter 8: wenig Empowerment gegenüber sich selbst. Die Vorschläge zur Stärkung in IWS können besonders hilfreich sein.',
            },
            {
              min: 8,
              max: 25,
              text: '8 oder mehr: Sie spüren bereits inneres Empowerment (Selbstwert, Optimismus, eigenen Erfolg).',
            },
          ],
        ),
        note(
          'Kästchen 1 repräsentiert Ansichten über Empowerment gegenüber sich selbst: Selbstwertgefühl, Optimismus und eigenen Erfolg.',
        ),
        sum(
          'kasten2',
          'Kästchen 2 – gerade Fragen (Empowerment gegenüber dem Umfeld)',
          even,
          [
            {
              min: 0,
              max: 7,
              text: 'Unter 8: unsicher, wie Sie Ihr Umfeld mit stigmatisierenden Einstellungen konfrontieren sollen.',
            },
            {
              min: 8,
              max: 25,
              text: '8 oder mehr: gerechtfertigter Zorn und Wille, etwas gegen Stigma zu unternehmen.',
            },
          ],
        ),
        note(
          'Kästchen 2 repräsentiert Ansichten über Empowerment gegenüber dem Umfeld: gerechtfertigter Zorn und den Willen, etwas zu unternehmen.',
        ),
      ]),
    ],
  })
}
