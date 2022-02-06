import moment from 'moment';
import mock from 'src/utils/mock';

const lessons = [
  {
    id: '1',
    time: '18:00 - 20:00',
    teacher: 'Gareth',
    level: 'Advanced',
  },
  {
    id: '2',
    time: '18:00 - 20:00',
    teacher: 'Torm',
    level: 'Elementary',
  },
  {
    id: '3',
    time: '17:00 - 18:00',
    teacher: 'Oran',
    level: 'CAE',
  },
  {
    id: '4',
    time: '18:00 - 19:00',
    teacher: 'Joe',
    level: 'Upper Inteermediate-A',
  },
  {
    id: '5',
    time: '18:00 - 20:00',
    teacher: 'Gareth',
    level: 'Advanced',
  },
  {
    id: '6',
    time: '18:00 - 20:00',
    teacher: 'Gareth',
    level: 'Advanced',
  },
  {
    id: '7',
    time: '18:00 - 20:00',
    teacher: 'Gareth',
    level: 'Advanced',
  },
  {
    id: '8',
    time: '18:00 - 20:00',
    teacher: 'Gareth',
    level: 'Advanced',
  },
  {
    id: '9',
    time: '18:00 - 20:00',
    teacher: 'Gareth',
    level: 'Advanced',
  },
  {
    id: '10',
    time: '18:00 - 20:00',
    teacher: 'Gareth',
    level: 'Advanced',
  },
  {
    id: '11',
    time: '18:00 - 20:00',
    teacher: 'Gareth',
    level: 'Advanced',
  },
  {
    id: '12',
    time: '18:00 - 20:00',
    teacher: 'Gareth',
    level: 'Advanced',
  },
];

mock.onGet('/api/lessons').reply(200, { lessons });

mock.onGet('/api/lesson/1').reply(() => {
  const lesson = {
    id: "1",
    language: "English",
    date: "Thu Feb 18 2021",
    start: "17:00",
    finish: "18:00",
    info: "",
    duration: "01:00",
    group: "176LaJ Elementary (bajo) 17-18h ONLINE (01/10) 1HORA",
    level: "Elementary",
    teacher: "SarahB",
    topics: "speaking practice, pronunciation - diphthongs, Homework check , Listening ",
    textbook: [
      { id: '1', title: 'EF4 Elem (digital)', unit: '8B', pages: '65', ex: '', hw: '' },
      { id: '2', title: 'EF4 Elem (digital)', unit: '', pages: '116', ex: '6a-c', hw: 'x' },
    ],
    students: [
      { id: '1', first_name: 'Andrea', last_name: 'Melgarejo Sanchez' },
      { id: '2', first_name: 'Lilia Raquel', last_name: 'Jaramillo villalta' },
      { id: '3', first_name: 'Margarita', last_name: 'Paez Gaona' },
      { id: '4', first_name: 'Roger', last_name: 'Valarezo Garcia' },
    ]
  };

  return [200, { lesson }];
});
