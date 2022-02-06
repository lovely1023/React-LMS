import moment from 'moment';
import mock from 'src/utils/mock';

const textbooks = [
  {
    id: '1',
    name: 'Aptis preparation',
    given: '1',
    stock: '1',
  },
  {
    id: '2',
    name: 'Aptis preparation',
    given: '2',
    stock: '2',
  },
  {
    id: '3',
    name: 'Aptis preparation',
    given: '3',
    stock: '3',
  },
  {
    id: '4',
    name: 'Aptis preparation',
    given: '4',
    stock: '4',
  },
  {
    id: '5',
    name: 'Aptis preparation',
    given: '5',
    stock: '5',
  },
  {
    id: '6',
    name: 'Aptis preparation',
    given: '6',
    stock: '6',
  },
  {
    id: '7',
    name: 'Aptis preparation',
    given: '7',
    stock: '7',
  },
  {
    id: '8',
    name: 'Aptis preparation',
    given: '8',
    stock: '8',
  },
  {
    id: '9',
    name: 'Aptis preparation',
    given: '9',
    stock: '9',
  },
  {
    id: '10',
    name: 'Aptis preparation',
    given: '10',
    stock: '10',
  },
  {
    id: '11',
    name: 'Aptis preparation',
    given: '11',
    stock: '11',
  },
];

mock.onGet('/api/textbook/all').reply(200, { textbooks });

mock.onGet('/api/textbook/1').reply(() => {
  const textbook = {
    name: "CE3 Upper-Int",
    stock: "13",
  };

  return [200, { textbook }];
});