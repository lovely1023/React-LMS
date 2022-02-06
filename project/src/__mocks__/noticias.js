import mock from 'src/utils/mock';

mock.onGet('/api/noticias').reply(() => {
  const noticias = [
    {
      id: '1',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '2',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '3',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '4',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '5',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '6',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '7',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '8',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '9',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '10',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
    {
      id: '11',
      title: 'Titulo de esta noticia A',
      category: 'Educación',
      fecha: '31-Dic-3.3.',
      publish: "Yes"
    },
  ];

  return [200, { noticias }];
});


mock.onGet('/api/noticias/1').reply(() => {
  const noticias = {
    title: 'title',
    titleen: 'title(inglish)',
    content: 'content',
    contenten: 'content(inglish)',
    category1: true,
    category2: true,
    category3: false,
    category4: true,
    category5: false,
    everyone: false,
    profile1: false,
    profile2: true,
    emlocation1: true,
    emlocation2: false,
    emdepartment1: false,
    emdepartment2: true,
    emarea1: true,
    emarea2: false,
    emsubarea1: false,
    emsubarea2: true,
    emtype1: false,
    emtype2: true,
    emtype3: false,
    image: './static/images/covers/cover_1.jpg',
    archivo: 'cover_1.jpg',
    promote: false,
    publish: true,
    expira: false,
    date: '2017-05-24',
  };

  return [200, { noticias }];
});

mock.onGet('/api/noticias/1/detail').reply(() => {
  const noticias = {
    title: 'title',
    titleen: 'title(inglish)',
    content: 'content',
    contenten: 'content(inglish)',
    category1: true,
    category2: true,
    category3: false,
    category4: true,
    category5: false,
    everyone: false,
    profile1: false,
    profile2: true,
    emlocation1: true,
    emlocation2: false,
    emdepartment1: false,
    emdepartment2: true,
    emarea1: true,
    emarea2: false,
    emsubarea1: false,
    emsubarea2: true,
    emtype1: false,
    emtype2: true,
    emtype3: false,
    image: './static/images/covers/cover_1.jpg',
    archivo: 'cover_1.jpg',
    promote: false,
    publish: true,
    expira: false,
    date: '2017-05-24',
  };

  return [200, { noticias }];
});
