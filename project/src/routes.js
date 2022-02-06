import React, {
  lazy,
  Suspense,
  Fragment,
} from 'react';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';
import RestricGuard from 'src/components/RestricGuard';
import LoadingScreen from 'src/components/LoadingScreen';
import DashboardLayout from 'src/layouts/DashboardLayout';

/* connectIntl */
import { formatMessage } from 'src/contexts/Intl';

export const renderRoutes = (routes = [], intl) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const propsRoute = route.props || {};
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          function renderComponent(props) {
            return (route.roles)
              ? (
                <RestricGuard roles={route.roles} >
                  <Component {...props} />
                </RestricGuard>
              )
              : <Component intl={intl} {...props} />
          }

          let path = route.path;
          if (route.multilanguage) {
            if (typeof path === 'object') {
              path = formatMessage(intl[path.value], path.params);
            } else {
              path = formatMessage(intl[path]);
            }
          }

          return (
            <Route
              key={i}
              path={path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {
                      route.routes
                        ? renderRoutes(route.routes, intl)
                        : renderComponent({ ...props, ...propsRoute })
                    }
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

const routes = [
  {
    exact: true,
    path: '/testing',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: 'urlLogin',
    multilanguage: true,
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: 'urlAdminLogin',
    multilanguage: true,
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/verification',
    component: lazy(() => import('src/views/auth/VerificationView/JWTVerification'))
  },
  {
    exact: true,
    path: '/verification-unprotected',
    component: lazy(() => import('src/views/auth/VerificationView/JWTVerification'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: 'urlRegister',
    multilanguage: true,
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/forgotpassword',
    component: lazy(() => import('src/views/auth/ForgotpasswordView'))
  },
  {
    exact: true,
    path: '/resetpass',
    component: lazy(() => import('src/views/auth/ResetPasswordView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: 'url2FA',
    multilanguage: true,
    component: lazy(() => import('src/views/2falogin'))
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '*',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      // NEW ROUTER START
      // student start
      {
        exact: true,
        multilanguage: true,
        path: 'urlStudents',
        component: lazy(() => import('src/views/students/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlStudentDetail',
          params: {
            studentId: ':studentId'
          }
        },
        component: lazy(() => import('src/views/students/DetailsView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlStudentEdit',
          params: {
            studentId: ':studentId'
          }
        },
        component: lazy(() => import('src/views/students/EditView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlStudentAdd',
        component: lazy(() => import('src/views/students/AddView'))
      },
      // student end
      // lesson start
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlLesson',
          params: {
            studentId: ':studentId',
          }
        },
        component: lazy(() => import('src/views/lessons/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlLessonEdit',
          params: {
            lessonId: ':lessonId',
            topicsName: ':topicsName'
          }
        },
        component: lazy(() => import('src/views/lessons/EditView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlLessonDetail',
          params: {
            lessonId: ':lessonId',
            topicsName: ':topicsName'
          }
        },
        component: lazy(() => import('src/views/lessons/DetailsView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlLessonAdd',
        component: lazy(() => import('src/views/lessons/AddView'))
      },
      // lesson end
      // bill start
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlBill',
          params: {
            studentId: ':studentId',
          }
        },
        component: lazy(() => import('src/views/bills/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlBillDetail',
          params: {
            billId: ':billId',
            billNum: ':billNum',
          }
        },
        component: lazy(() => import('src/views/bills/DetailsView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlBillAdd',
          params: {
            studentId: ':studentId'
          }
        },
        component: lazy(() => import('src/views/bills/AddView'))
      },
      // bill end
      // groups start
      {
        exact: true,
        multilanguage: true,
        path: 'urlGroup',
        component: lazy(() => import('src/views/groups/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlGroupAdd',
        component: lazy(() => import('src/views/groups/AddView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlGroupDetail',
          params: {
            groupId: ':groupId'
          }
        },
        component: lazy(() => import('src/views/groups/DetailsView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlGroupEdit',
          params: {
            groupId: ':groupId'
          }
        },
        component: lazy(() => import('src/views/groups/EditView'))
      },
      // groups end

      // teacher start
      {
        exact: true,
        multilanguage: true,
        path: 'urlTeachers',
        component: lazy(() => import('src/views/teachers/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlTeacherAdd',
        component: lazy(() => import('src/views/teachers/AddView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlTeacherEdit',
          params: {
            teacherId: ':teacherId'
          }
        },
        component: lazy(() => import('src/views/teachers/EditView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlTeacherDetail',
          params: {
            teacherId: ':teacherId'
          }
        },
        component: lazy(() => import('src/views/teachers/DetailsView'))
      },
      // teacher end

      // textbook start
      {
        exact: true,
        multilanguage: true,
        path: 'urlTextbooks',
        component: lazy(() => import('src/views/textbooks/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlTextbookDetail',
          params: {
            textbookId: ':textbookId'
          }
        },
        component: lazy(() => import('src/views/textbooks/DetailsView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlTextbookEdit',
          params: {
            textbookId: ':textbookId'
          }
        },
        component: lazy(() => import('src/views/textbooks/EditView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlTextbookAdd',
          params: {
            textbookId: ':textbookId'
          }
        },
        component: lazy(() => import('src/views/textbooks/AddView'))
      },
      // textbook end

      // more_edit start
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreEditTopic',
        component: lazy(() => import('src/views/More/Edit/Topic/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreEditTextbook',
        component: lazy(() => import('src/views/More/Edit/Textbook/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreEditLevel',
        component: lazy(() => import('src/views/More/Edit/Level/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreEditRoom',
        component: lazy(() => import('src/views/More/Edit/Room/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreEditLanguage',
        component: lazy(() => import('src/views/More/Edit/Language/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreEditLesson',
        component: lazy(() => import('src/views/More/Edit/Lesson/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreEditHeard',
        component: lazy(() => import('src/views/More/Edit/Heard/ListView'))
      },
      // more_edit end

      // log start
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreLog',
        component: lazy(() => import('src/views/More/Log/ListView'))
      },
      // log end

      // start certification
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreCertificates',
        component: lazy(() => import('src/views/More/Certification/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlCertificationDetail',
          params: {
            certificationId: ':certificationId'
          }
        },
        component: lazy(() => import('src/views/More/Certification/DetailsView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlCertificationEdit',
          params: {
            certificationId: ':certificationId'
          }
        },
        component: lazy(() => import('src/views/More/Certification/EditView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlCertificationAdd',
          params: {
            studentId: ':studentId'
          }
        },
        component: lazy(() => import('src/views/More/Certification/AddView'))
      },
      // end certification

      // start exams
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreExams',
        component: lazy(() => import('src/views/More/Exams/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlMoreExamsEdit',
          params: {
            itemId: ':itemId',
            itemType: ':itemType'
          }
        },
        component: lazy(() => import('src/views/More/Exams/EditView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlMoreExamsAdd',
          params: {
            itemType: ':itemType'
          }
        },
        component: lazy(() => import('src/views/More/Exams/AddView'))
      },
      // end exams

      // start contract
      {
        exact: true,
        multilanguage: true,
        path: 'urlMoreContracts',
        component: lazy(() => import('src/views/More/Contracts/ListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlContractAdd',
        component: lazy(() => import('src/views/More/Contracts/AddView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: {
          value: 'urlContractEdit',
          params: {
            contractId: ':contractId'
          }
        },
        component: lazy(() => import('src/views/More/Contracts/EditView'))
      },
      // end contract
      // NEW ROUTER END
      {
        component: () => <Redirect to="/" />
      }
    ]
  },
];

export default routes;
