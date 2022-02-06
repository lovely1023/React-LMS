import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Results from './Results';
import Page from 'src/components/Page';
import Header from 'src/components/HeaderBreadcrumbs';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import "src/components/global";
import {
  setLevels,
  setAllLevels,
  setLanguages,
  setAllLanguages,
  setGroups,
  setAllGroups,
  setTextbooks,
  setAllTextbooks,
  setTeachers,
  setAllTeachers,
  setLessoninfos,
  setAllLessoninfos,
  setTopics,
  setAllTopics,
  setRooms,
  setAllRooms,
  setSchemes,
  setAllSchemes,
  setHowdidyouhear,
  setAllHowdidyouhear,
  setAllLessontextbooks,
  setAllStudents,
  setAllUsers,
} from 'src/localstorage';
import httpClient from 'src/utils/httpClient';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
var total = 0;

const StudentsListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [students, setStudents] = useState([]);
  const [totalcount, setTotalcount] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const deleteStudents = (selectedStudents) => {
    let temp = [];
    const eliminatedList = [];
    students.forEach((n) => {
      if (!selectedStudents.includes(n.id)) {
        temp.push(n)
      } else {
        eliminatedList.push(deleteStudent(n.id));
      }
    })
    return eliminatedList;
  }

  const deleteStudent = (id) => {
    httpClient.delete(`api/student/${id}`);
    setStudents((prevState) => prevState.filter((el) => el.id != id))
    return id;
  }

  const getStudents = useCallback(async () => {
    httpClient.get(`api/student/all/${0}/${10}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setStudents(json.students);
          setTotalcount(json.total)
          total = json.total;
          getClassinfo();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getAllStudents = useCallback(async () => {
    httpClient.get(`api/student/all/${0}/200`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          global.Allstudents = json.students;
          setAllStudents(JSON.stringify(json.students));
          getAllUsers();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  })

  const getAllUsers = useCallback(async () => {
    httpClient.get(`api/user/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          global.Allusers = json.users;
          setAllUsers(JSON.stringify(json.users));
          getAllTeachers();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  })

  const getClassinfo = useCallback(async () => {
    httpClient.get(`api/classes/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = []
          json.classes.map((val) => {
            data.push(val.name);
          })
          global.classis = data;
          global.Allclassis = json.classes;
          setLevels(JSON.stringify(data));
          setAllLevels(JSON.stringify(json.classes));
          getLanguageinfo();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getLanguageinfo = useCallback(async () => {
    httpClient.get(`api/languages/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = []
          json.languages.map((val, index) => {
            data.push(val.name);
          })
          global.languages = data;
          global.Alllanguages = json.languages;
          setLanguages(JSON.stringify(data));
          setAllLanguages(JSON.stringify(json.languages));
          getHowdidyouhearinfo();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getHowdidyouhearinfo = useCallback(async () => {
    httpClient.get(`api/howdidyouhear/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = []
          json.howdidyouhears.map((val, index) => {
            data.push(val.name);
          })
          global.howdidyouhear = data;
          global.Allhowdidyouhear = json.howdidyouhears;
          setHowdidyouhear(JSON.stringify(data));
          setAllHowdidyouhear(JSON.stringify(json.howdidyouhears));
          getGroupsinfo();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getGroupsinfo = useCallback(async () => {
    httpClient.get(`api/group/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = []
          json.groups.map((val, index) => {
            data.push(val.name);
          })
          global.groups = data;
          global.Allgroups = json.groups;
          setGroups(JSON.stringify(data));
          setAllGroups(JSON.stringify(json.groups));
          getTextbooksinfo()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getTextbooksinfo = useCallback(async () => {
    httpClient.get(`api/textbooks/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = [];

          let data2 = [];
          json.textbooks.map((val, index) => {
            let data1 = {
              id: 0,
              lessonid: 0,
              textBookid: 0,
              unit: '',
              homework: '',
              exercise: '',
              textBookName: '',
              from: '',
              to: '',
              pages: '',
            };
            data.push(val.name);
            data1.textBookName = val.name;
            data1.id = val.id;
            data2.push(data1);
          })
          global.Alllessontextbooks = data2;
          global.textbooks = data;
          global.Alltextbooks = json.textbooks;
          setAllLessontextbooks(JSON.stringify(data2));
          setTextbooks(JSON.stringify(data));
          setAllTextbooks(JSON.stringify(json.textbooks));
          getAllStudents();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getAllTeachers = useCallback(() => {
    httpClient.get(`api/teacher/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = []
          json.teachers.map((val, index) => {
            data.push(val.name);
          })
          setTeachers(JSON.stringify(data));
          setAllTeachers(JSON.stringify(json.teachers));
          global.teachers = data;
          global.Allteachers = json.teachers;
          getAllLessoninfos();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getAllLessoninfos = useCallback(async () => {
    httpClient.get(`api/lessoninfo/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = []
          json.lessoninfos.map((val, index) => {
            data.push(val.name);
          })
          setLessoninfos(JSON.stringify(data));
          setAllLessoninfos(JSON.stringify(json.lessoninfos));
          global.lessoninfos = data;
          global.Alllessoninfos = json.lessoninfos;
          getAllTopics();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getAllTopics = useCallback(async () => {
    httpClient.get(`api/topics/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = []
          json.topics.map((val, index) => {
            data.push(val.name);
          })
          setTopics(JSON.stringify(data));
          setAllTopics(JSON.stringify(json.topics));
          global.topics = data;
          global.Alltopics = json.topics;
          getAllRooms();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getAllRooms = useCallback(async () => {
    httpClient.get(`api/room/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = []
          json.rooms.map((val, index) => {
            data.push(val.name);
          })
          setRooms(JSON.stringify(data));
          setAllRooms(JSON.stringify(json.rooms));
          global.rooms = data;
          global.Allrooms = json.rooms;
          getAllScheme();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getAllScheme = useCallback(async () => {
    httpClient.get(`api/markingscheme/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          let data = []
          json.schemes.map((val, index) => {
            data.push(val.name);
          })
          setSchemes(JSON.stringify(data));
          setAllSchemes(JSON.stringify(json.schemes));
          global.schemes = data;
          global.Allschemes = json.schemes;
          setOpen(false);
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const handleGetData = (pagenum, limitnum) => {
    httpClient.get(`api/student/all/${pagenum}/${limitnum}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setStudents(json.students);
          setTotalcount(json.total)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSearchData = (data) => {
    const url = `api/student/search`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setStudents(json.students);
          setTotalcount(json.total)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setOpen(!open);
    getStudents();
    // getClassinfo();
    // getLanguageinfo();
    // getHowdidyouhearinfo();
    // getGroupsinfo();
    // getTextbooksinfo();
    // getAllStudents();
    // getAllusers();
  }, [getStudents]);

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.students)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.students)}
          buttonRight={{ to: formatMessage(intl.urlStudentAdd), label: 'new student' }}
        />
        <Box mt={3}>
          {
            loading ?
              <Results
                students={students}
                totalcount={totalcount}
                deleteStudent={deleteStudent}
                deleteStudents={deleteStudents}
                handleGetData={handleGetData}
                handleSearchData={handleSearchData}
              /> :
              <div>
                <Backdrop className={classes.backdrop} open={open}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
          }
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(StudentsListView);
