// import React from 'react';
// import {
//   Box,
//   Container,
//   makeStyles
// } from '@material-ui/core';
// import Page from 'src/components/Page';
// import TeacherAddForm from '../Form/CertificationAddEditForm';
// import Header from 'src/components/HeaderBreadcrumbs';

// /* connectIntl */
// import { connectIntl, formatMessage } from 'src/contexts/Intl';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '100%',
//     paddingTop: theme.spacing(3),
//     paddingBottom: theme.spacing(3),
//     backgroundColor: theme.palette.background.dark,
//   }
// }));

// const TeacherEditView = ({ intl }) => {
//   const classes = useStyles();

//   return (
//     <Page
//       className={classes.root}
//       title={formatMessage(intl.addTeacher)}
//     >
//       <Container maxWidth={false}>
//         <Header goBack />
//       </Container>
//       <Box mt={3}>
//         <Container maxWidth="md">
//           <TeacherAddForm />
//         </Container>
//       </Box>
//     </Page>
//   );
// };

// const mapStateToProps = (store) => ({
//   intl: store.intl.messages,
// })

// export default connectIntl(mapStateToProps)(TeacherEditView);


import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import CertificationEditForm from '../Form/CertificationAddEditForm';
import Header from 'src/components/HeaderBreadcrumbs';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import httpClient from 'src/utils/httpClient';
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
  }
}));

const CertificationEditView = ({ match, intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [certification, setCertification] = useState([]);
  const [flag, setFlag] = React.useState(false);

  const stringTomin = (str) => {
    let n = str.search(":");
    let hour = str.substr(0, n - 1);
    let min = str.substr(n + 1, str.length);
    let res = parseInt(hour) * 60 + parseInt(min);
    if (String(res) === 'NaN')
      res = 0;
    return res;
  }

  const getStudentinfo = useCallback(async () => {
    httpClient.get(`api/student/${params.studentId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          var student = json.student[0];
          console.log(student)
          const urlAPI = 'api/auth/profile';
          var accessToken = window.localStorage.getItem('accessToken');
          httpClient.post(urlAPI, {
            accessToken: accessToken
          })
            .then(json => {
              if (json.success) {
                var user = json.user[0];
                var data = {
                  id: window.localStorage.getItem('userid'),
                  studentId: student.id,
                  certNumber: '21 - 21',
                  startDate: student.startDate,
                  endDate: student.endDate,
                  mins: stringTomin(student.totalHours),
                  level: student.LEVEL,
                  studentName: `${student.firstName} ${student.lastName}`,
                  IDNumber: student.IDNumber,
                  title: user.title,
                  userName: user.fullName,
                }
                setCertification(data);
                setFlag(true)
              }
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef, params.studentId]);

  useEffect(() => {
    getStudentinfo();
  }, [getStudentinfo]);

  if (!flag) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.editCertification)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth="md">
          <CertificationEditForm
            certification={certification}
          />
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(CertificationEditView);
