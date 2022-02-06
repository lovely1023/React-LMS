import moment from 'moment';
import mock from 'src/utils/mock';

const bills = [
  {
    id: '1',
    date: '2011-02-07 10:56:31',
    student: 'Pablo Sanchez Ortega',
    user: 'Marco',
    billNumber: 'E-21-10879',
    price: '274,40',
  },
  {
    id: '2',
    date: '2011-02-07 10:56:31',
    student: 'Pablo Sanchez Ortega',
    user: 'Marco',
    billNumber: 'E-21-10879',
    price: '274,40',
  },
  {
    id: '3',
    date: '2011-02-07 10:56:31',
    student: 'Pablo Sanchez Ortega',
    user: 'Marco',
    billNumber: 'E-21-10879',
    price: '274,40',
  },
  {
    id: '4',
    date: '2011-02-07 10:56:31',
    student: 'Pablo Sanchez Ortega',
    user: 'Marco',
    billNumber: 'E-21-10879',
    price: '274,40',
  },
  {
    id: '5',
    date: '2011-02-07 10:56:31',
    student: 'Pablo Sanchez Ortega',
    user: 'Marco',
    billNumber: 'E-21-10879',
    price: '274,40',
  },
];

mock.onGet('/api/bills').reply(200, { bills });


mock.onGet('/api/bill/1').reply(() => {
  const bill = {
    id: "1",
  };

  return [200, { bill }];
});