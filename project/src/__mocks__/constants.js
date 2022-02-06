import moment from 'moment';
import mock from 'src/utils/mock';

const levels = [
  { title: 'CAE', value: 1 },
  { title: 'Elementary', value: 2 },
  { title: 'FCE-conversation class', value: 3 },
  { title: 'FCE-regular class', value: 4 },
  { title: 'feedback', value: 5 },
  { title: 'Int Plus', value: 6 },
  { title: 'Intermediate', value: 7 },
  { title: 'mock exam', value: 8 },
  { title: 'PET', value: 9 },
  { title: 'Pre+', value: 10 },
  { title: 'Pre-Int', value: 11 },
  { title: 'PREPARATION', value: 12 },
  { title: 'Private', value: 13 },
  { title: 'Proficiency', value: 14 },
  { title: 'Stand by', value: 15 },
  { title: 'TOEFL', value: 16 },
  { title: 'TOEIC', value: 17 },
  { title: 'Upper Intermediate-A', value: 18 },
  { title: 'Upper Intermediate-B', value: 19 },
  { title: 'workshop', value: 20 },
];

mock.onGet('/api/levels').reply(200, { levels });

const languages = [
  { title: 'English', value: 1 },
];

mock.onGet('/api/languages').reply(200, { languages });

const howdidheards = [
  { title: 'Autobus', value: 1 },
  { title: 'Caballete', value: 2 },
  { title: 'Capman', value: 3 },
  { title: 'Dub 20', value: 4 },
  { title: 'ex alumnos', value: 5 },
  { title: 'Facebook', value: 6 },
  { title: 'from a friend', value: 7 },
  { title: 'Google', value: 8 },
  { title: 'Info idiomas', value: 9 },
  { title: 'Instagram', value: 10 },
  { title: 'Just walking past the school', value: 11 },
  { title: 'Metro', value: 12 },
  { title: 'University flyers', value: 13 },
  { title: 'Wuolah', value: 14 },
  { title: 'Yinius', value: 15 },
];

mock.onGet('/api/howdidheards').reply(200, { howdidheards });

const users = [
  { title: '(Ana) Elena Garcia Gil', value: 1 },
  { title: '(Ana) Isabel Nevado Gomez', value: 2 },
  { title: '(Bertha) Patricia Storm', value: 3 },
  { title: '(Cecilia) Catalina Amaya Mazo', value: 4},
];

mock.onGet('/api/users').reply(200, { users });

const payments = [
  { title: 'Blank', value: 1 },
  { title: 'Trimestre intensivo', value: 1 },
  { title: 'Trimestre 3 dias/sem', value: 2 },
  { title: 'Trimestre 2 dias/sem', value: 3 },
  { title: 'Trimestre 1 dias/sem', value: 4 },
];

mock.onGet('/api/payments').reply(200, { payments });

const teachers = [
  { title: 'Rory', value: 1 },
  { title: 'Sarah B', value: 2 },
  { title: 'Sarah I', value: 3 },
  { title: 'Simon', value: 4},
];

mock.onGet('/api/teachers').reply(200, { teachers });

const lessoninfos = [
  { title: 'Cancellation', value: 1 },
  { title: 'end of book exam', value: 2 },
  { title: 'feedback', value: 3 },
  { title: 'Instagram', value: 4},
  { title: 'Instagram Foto y video', value: 5},
  { title: 'mock exam', value: 6},
  { title: 'No show', value: 7},
  { title: 'observation', value: 8},
  { title: 'preparation', value: 9},
];

mock.onGet('/api/lessoninfos').reply(200, { lessoninfos });

const groups = [
  { title: '176LaJ Elementary (bajo) 17-18h ONLINE (01/10) 1HORA', value: 1 },
  { title: 'Francisco Bermejo', value: 2 },
  { title: '180M Upper-Int B/Advanced Conversation ONLINE', value: 3 },
  { title: '180M Upper-Int B/Advanced Conversation ONLINE181LaJ 18-19h LaJ Upper-Int A ONLINE (06/04) 1HORA (EOB examen 10/03)', value: 4 },
  { title: '181PRLaJ Elementary PRESENCIAL (09/12)', value: 5 },
  { title: '181PRV Upper Int A/Upper Int B Conversation PRESENCIAL (22/01)', value: 6 },
];

mock.onGet('/api/groups').reply(200, { groups });

const topics = [
  { title: 'Speaking practice', value: 1 },
  { title: 'speaking practice', value: 2 },
  { title: 'speaking practice (controversial topics)', value: 3 },
  { title: 'speaking practice (crazy inteview questions)', value: 4 },
  { title: 'speaking practice (describe a relationship)', value: 5 },
];

mock.onGet('/api/topics').reply(200, { topics });


const textbooks = [
  { title: '100 essential business nouns', value: 1 },
  { title: '5 present perfect simple or present perfect continuous sentences', value: 2 },
  { title: '50 questions', value: 3 },
];

mock.onGet('/api/textbooks').reply(200, { textbooks });
