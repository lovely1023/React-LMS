import moment from 'moment';
import mock from 'src/utils/mock';

const regal = [
  {
    title: 'TERMS AND CONDITIONS',
  },
  {
    title: 'TERMS AND CONDITIONS',
  },
  {
    title: 'TERMS AND CONDITIONS',
  },
  {
    title: 'TERMS AND CONDITIONS',
  },
  {
    title: 'TERMS AND CONDITIONS',
  },
  {
    title: 'TERMS AND CONDITIONS',
  },
];

mock.onGet('/api/notifications').reply(200, { regal });
