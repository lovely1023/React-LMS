import moment from 'moment';
import mock from 'src/utils/mock';

const topics = [
  {
    id: '1',
    name: 'mini presntations',
  },
  {
    id: '2',
    name: '"A pair of" used to talk about certain types of clothing"',
  },
  {
    id: '3',
    name: 'mini presntations',
  },
  {
    id: '4',
    name: '"A pair of" used to talk about certain types of clothing"',
  },
  {
    id: '5',
    name: 'mini presntations',
  },
  {
    id: '6',
    name: '"A pair of" used to talk about certain types of clothing"',
  },
  {
    id: '7',
    name: 'mini presntations',
  },
  {
    id: '8',
    name: '"A pair of" used to talk about certain types of clothing"',
  },
  {
    id: '9',
    name: 'mini presntations',
  },
  {
    id: '10',
    name: '"A pair of" used to talk about certain types of clothing"',
  },
  {
    id: '11',
    name: 'mini presntations',
  },
  {
    id: '12',
    name: '"A pair of" used to talk about certain types of clothing"',
  },
];

mock.onGet('/api/more/topics/all').reply(200, { topics });

const textbooks = [
  {
    id: '1',
    name: '100 essential business nouns',
    tracked: '',
  },
  {
    id: '2',
    name: '100 essential business nouns',
    tracked: 'x',
  },
  {
    id: '3',
    name: '100 essential business nouns',
    tracked: '',
  },
  {
    id: '4',
    name: '100 essential business nouns',
    tracked: 'x',
  },
  {
    id: '5',
    name: '100 essential business nouns',
    tracked: '',
  },
  {
    id: '6',
    name: '100 essential business nouns',
    tracked: 'x',
  },
  {
    id: '7',
    name: '100 essential business nouns',
    tracked: '',
  },
  {
    id: '8',
    name: '100 essential business nouns',
    tracked: 'x',
  },
  {
    id: '9',
    name: '100 essential business nouns',
    tracked: '',
  },
  {
    id: '10',
    name: '100 essential business nouns',
    tracked: 'x',
  },
  {
    id: '11',
    name: '100 essential business nouns',
    tracked: '',
  },
  {
    id: '12',
    name: '100 essential business nouns',
    tracked: 'x',
  },
];

mock.onGet('/api/more/textbooks/all').reply(200, { textbooks });

const levels = [
  {
    id: '1',
    name: 'Advanced',
    exam_level: '',
  },
  {
    id: '2',
    name: 'Advanced',
    exam_level: 'x',
  },
  {
    id: '3',
    name: 'Advanced',
    exam_level: '',
  },
  {
    id: '4',
    name: 'Advanced',
    exam_level: 'x',
  },
  {
    id: '5',
    name: 'Advanced',
    exam_level: '',
  },
  {
    id: '6',
    name: 'Advanced',
    exam_level: 'x',
  },
  {
    id: '7',
    name: 'Advanced',
    exam_level: '',
  },
  {
    id: '8',
    name: 'Advanced',
    exam_level: 'x',
  },
  {
    id: '9',
    name: 'Advanced',
    exam_level: '',
  },
  {
    id: '10',
    name: 'Advanced',
    exam_level: 'x',
  },
  {
    id: '11',
    name: 'Advanced',
    exam_level: '',
  },
  {
    id: '12',
    name: 'Advanced',
    exam_level: 'x',
  },
];

mock.onGet('/api/more/levels/all').reply(200, { levels });

const rooms = [
  {
    id: '1',
    name: '1',
  },
  {
    id: '2',
    name: '2',
  },
  {
    id: '3',
    name: '3',
  },
  {
    id: '4',
    name: '4',
  },
  {
    id: '5',
    name: '5',
  },
  {
    id: '6',
    name: '6',
  },
  {
    id: '7',
    name: '7',
  },
  {
    id: '8',
    name: '8',
  },
  {
    id: '9',
    name: '9',
  },
  {
    id: '10',
    name: '10',
  },
];

mock.onGet('/api/more/rooms/all').reply(200, { rooms });

const languages = [
  {
    id: '1',
    name: 'English',
  },
];

mock.onGet('/api/more/languages/all').reply(200, { languages });

const certifications = [
  {
    id: '1',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '2',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '3',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '4',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '5',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '6',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '7',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '8',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '9',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '10',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
  {
    id: '11',
    number: '21-17',
    student: 'Veronica Zegarra Hinojosa',
    user: 'Marco',
    issued: '20-04-2021',
  },
];

mock.onGet('/api/more/certification/all').reply(200, { certifications });

mock.onGet('/api/more/certification/1').reply(() => {
  const certification = {
    student: "Veronica Zegarra Hinojosa (517245380W)",
    name: "Veronica Zegarra Hinojosa",
    id_number: "517245380W",
    hours: "733:00",
    dates: "27-03-2017-11-11-2020",
    level_reached: "Advanced",
    certificate_number: "21-17",
    issue_date: "20-04-2021",
    from: "03-27-2017",
    to: "11-11-2021",
    user: "Marco",
    user_title: "Manager",
    full_user_name: "Leila Seif",
  };

  return [200, { certification }];
});

const lessons = [
  {
    id: '1',
    name: 'Cancellation',
    extra: '',
  },
  {
    id: '2',
    name: 'Cancellation',
    extra: 'x',
  },
  {
    id: '3',
    name: 'Cancellation',
    extra: '',
  },
  {
    id: '4',
    name: 'Cancellation',
    extra: 'x',
  },
  {
    id: '5',
    name: 'Cancellation',
    extra: '',
  },
  {
    id: '6',
    name: 'Cancellation',
    extra: 'x',
  },
  {
    id: '7',
    name: 'Cancellation',
    extra: '',
  },
  {
    id: '8',
    name: 'Cancellation',
    extra: 'x',
  },
  {
    id: '9',
    name: 'Cancellation',
    extra: '',
  },
  {
    id: '10',
    name: 'Cancellation',
    extra: 'x',
  },
  {
    id: '11',
    name: 'Cancellation',
    extra: '',
  },
  {
    id: '12',
    name: 'Cancellation',
    extra: 'x',
  },
];

mock.onGet('/api/more/lessons/all').reply(200, { lessons });

const heards = [
  {
    id: '1',
    name: 'Autobus',
  },
  {
    id: '2',
    name: 'Autobus',
  },
  {
    id: '3',
    name: 'Autobus',
  },
  {
    id: '4',
    name: 'Autobus',
  },
  {
    id: '5',
    name: 'Autobus',
  },
  {
    id: '6',
    name: 'Autobus',
  },
  {
    id: '7',
    name: 'Autobus',
  },
  {
    id: '8',
    name: 'Autobus',
  },
  {
    id: '9',
    name: 'Autobus',
  },
  {
    id: '10',
    name: 'Autobus',
  },
  {
    id: '11',
    name: 'Autobus',
  },
];

mock.onGet('/api/more/heards/all').reply(200, { heards });

const logs = [
  {
    id: '1',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '2',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'added bill of 170.00 € for student Nombre: Elia Corrales Gonzalez',
  },
  {
    id: '3',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '4',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '5',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '6',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '7',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '8',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '9',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '10',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '11',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
  {
    id: '12',
    date: '11-03-2021',
    time: '22:22',
    user: 'ben (Admin)',
    entry: 'edited student Esther Alvarez Arquilos',
  },
];

mock.onGet('/api/more/logs/all').reply(200, { logs });

const exams_results = [
  {
    id: '1',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '2',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '3',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '4',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '5',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '6',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '7',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '8',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '9',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '10',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
  {
    id: '11',
    date: '24-03-2021',
    teacher: 'Joe',
    exam: '[SCHEDULED] EF4 Elem (End of course test)',
    group: '170Laj 17h-18h Intermadiate ONLINE (26/10) 1 HORA',
  },
];

mock.onGet('/api/more/exams/results/all').reply(200, { exams_results });

const exams_schemes = [
  {
    id: '1',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '2',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '3',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '4',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '5',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '6',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '7',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '8',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '9',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '10',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '11',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
  {
    id: '12',
    scheme: 'Cambridge Advanced',
    section: 'Reading: 50 Use of English: 28 Writing: 40 Listening: 20 Speaking: 10',
  },
];

mock.onGet('/api/more/exams/schemes/all').reply(200, { exams_schemes });

const contracts = [
  {
    id: '1',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '2',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '3',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '4',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '5',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '6',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '7',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '8',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '9',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '10',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '11',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
  {
    id: '12',
    contract: 'Trimetre intensivo (hours: 120:00)',
    payment: '322 + +270 + +22 (812,00 €)',
  },
];

mock.onGet('/api/more/contracts/all').reply(200, { contracts });

mock.onGet('/api/more/contracts/1').reply(() => {
  const contract = {
    contract: "Trimestre 3 dias/semana",
    hours: "72:00"
  };

  return [200, { contract }];
});

mock.onGet('/api/more/result/1').reply(() => {
  const result = {
    textbook: 'textbook',
    textbook_name: "EF4 Upper-Int",
    end_of_course_exam: 'end_of_course_exam',
    exam_date: '11/03/2021',
    teacher: 'Vanessa',
    test_name: '',
    marking_scheme: 'English File',
    scheduled_exam: false,
  };

  return [200, { result }];
});

mock.onGet('/api/more/schemes/1').reply(() => {
  const result = {
    name: 'Cambridge Advanced',
    weighted: 'weighted',
    sectionName: 'Reading',
    outof: '10',
  };

  return [200, { result }];
});