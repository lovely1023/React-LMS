import moment from 'moment';
import mock from 'src/utils/mock';

const groups = [
  {
    id: '1',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '1',
    teacher: 'Any',
    room: '1',
  },
  {
    id: '2',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '2',
    teacher: 'Any',
    room: '2',
  },
  {
    id: '3',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '3',
    teacher: 'Any',
    room: '3',
  },
  {
    id: '4',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '4',
    teacher: 'Any',
    room: '4',
  },
  {
    id: '5',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '5',
    teacher: 'Any',
    room: '5',
  },
  {
    id: '6',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '6',
    teacher: 'Any',
    room: '6',
  },
  {
    id: '7',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '7',
    teacher: 'Any',
    room: '7',
  },
  {
    id: '8',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '8',
    teacher: 'Any',
    room: '8',
  },
  {
    id: '9',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '9',
    teacher: 'Any',
    room: '9',
  },
  {
    id: '10',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '10',
    teacher: 'Any',
    room: '10',
  },
  {
    id: '1',
    time: '00:00',
    group: 'ALUMNOS A DESACTIVAR',
    textbook: 'EF4 Pre-Int',
    unit: '1',
    teacher: 'Any',
    room: '1',
  },
];

mock.onGet('/api/group/all').reply(200, { groups });

mock.onGet('/api/group/1').reply(() => {
  const group = {
    name: "111Grupo Prueba",
    mon: "l (1)",
    tue: "l (1)",
    wed: "l (1)",
    thurs: "l (1)",
    fri: "l (1)",
    exam: "No scheduled exam",
    room: "",
    teacher: "Any",
    level: "Pre-Int",
    time: "00:00-00:00",
    textbook: "EF4 Pre-Int",
    unit: "1",
    total: "1",
  };

  return [200, { group }];
});