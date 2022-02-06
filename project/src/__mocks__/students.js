import moment from 'moment';
import mock from 'src/utils/mock';

const students = [
  {
    id:'1',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'2',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'3',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'4',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'5',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'6',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'7',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'8',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'9',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'10',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
  {
    id:'11',
    first_name: 'Kostya',
    last_name: 'Kuzmin',
    hours_left: '30',
    days_left: '49',
  },
];

mock.onGet('/api/students').reply(200, { students });

mock.onGet('/api/student/1').reply(() => {
  const student = {
    id:"1",
    firstName:'Kostya',
    lastName:'Kuzmin',
    IDNumber:'X5985829X',
    address:'',
    notes:'',
    startDate:'22/01/2021',
    endDate:'16/04/2021',
    maxHours:'16',
    tel:'663336339',
    tel2:'663336339',
    classid:'',
    languageid:'1',
    idActive:'8',
    email:'volodfree34@gmail.com',
    usealHour:'10',
    price:'100',
    daysOfWeek:'',
    howDidYouHearid:'1',
    renewals:'5',
    enrolled:'Wed Sep 11 2019 (239 hours total)',
    password:'admin123',
    libaccess:'',
    libraryAccess:true,
    hwemail:'1',
    emailstatus:'0',
    pending:true,
    post_code:'28045',
    toeicaccess:false,
    birth_day:'21/08/1993',

    level:'Upper Intermediate-B',
    status:'Active',
    last:'Fri Feb 19 2021',
    attendance:'Tue Fri',
    img:'.'
  };

  return [200, { student }];
});
