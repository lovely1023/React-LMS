import moment from 'moment';
import mock from 'src/utils/mock';

const teachers = [
  {
    id: '1',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '2',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '3',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '4',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '5',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '6',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '7',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '8',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '9',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '10',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
  {
    id: '11',
    name: 'Alfredo',
    total: '(15 + 0) 150 / 125 (110 left)',
    projection: '25',
    active: 'x',
  },
];

mock.onGet('/api/teacher/all').reply(200, { teachers });

mock.onGet('/api/teacher/1').reply(() => {
  const teacher = {
    name: "Ben",
    isteacher: true,
    hours: '30',
  };

  return [200, { teacher }];
});