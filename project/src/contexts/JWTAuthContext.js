import React, {
  createContext,
  useEffect,
  useReducer
} from 'react';
import { useSnackbar } from 'notistack';
import { useHistory, Redirect } from 'react-router-dom'
import httpClient from 'src/utils/httpClient';
import SplashScreen from 'src/components/SplashScreen';
import {
  setLevels,
  setAllLevels,
  setLanguages,
  setAllLanguages,
  setHowdidyouhear,
  setAllHowdidyouhear,
  setGroups,
  setAllGroups,
  setTextbooks,
  setAllTextbooks,
  setAllLessontextbooks,
  setPersonGroupinfo,
  setTeachers,
  setAllTeachers,
  setLessoninfos,
  setAllLessoninfos,
  setAllUsers,
  setRooms,
  setAllRooms,
  setSchemes,
  setAllSchemes,
  setTopics,
  setAllTopics,
  setStudents,
  setAllStudents
} from 'src/localstorage';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  } else {
    localStorage.removeItem('accessToken');
  }
};

const setUserid = (data) => {
  if (data) {
    localStorage.setItem('userid', data);
  } else {
    localStorage.removeItem('userid');
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    case 'INIT_LOGIN2FA': {
      const { user } = action.payload;

      return {
        ...state,
        user,
        isAuthenticated: false,
      };
    }
    case 'ENABLE2FA': {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...state.user,
          google2fa_enabled: true
        }
      };
    }
    case 'DISABLE2FA': {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...state.user,
          google2fa_enabled: false
        }
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        // isAuthenticated: true,
        user
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  logout: () => { },
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  login_2fa: () => Promise.resolve(),
  enable_2fa: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
  disable_2fa: () => Promise.resolve(),
});

export const AuthProviderWrapper = ({ children, intl }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const login_2fa = async (secret2FA) => {
    let { user } = state;
    if (!user) {
      enqueueSnackbar(formatMessage(intl.expiredCredentials), {
        variant: 'warning',
      })
      history.push(formatMessage(intl.urlLogin))
    } else {
      const urlAPI = `api/auth${(user.role === 'ADMIN') ? '/admin' : ''}/login`;
      httpClient.post(urlAPI, { secret2FA, userId: state.user.id })
        .then(({ success, data }) => {
          if (success) {
            const { user, access_token } = data;
            setSession(data.access_token);
            dispatch({
              type: 'LOGIN',
              payload: { user }
            });
          }
          else {
            enqueueSnackbar(formatMessage(intl.secretNumberIsNotValid), {
              variant: 'danger',
            })
          }
        })
        .catch((error) => {
          enqueueSnackbar(error, {
            variant: 'danger',
          })
        });
    }
  };

  const login = async (email, password, isAdmin) => {
    // let user = 'data.user'
    // setSession('data.access_token')
    // dispatch({
    //   type: 'LOGIN',
    //   payload: {
    //     user
    //   }
    // });
    // const urlAPI = `api/auth${isAdmin ? '/admin' : ''}/login`;

    const urlAPI = `api/auth/signin`;

    httpClient.post(urlAPI, {
      name: email,
      pass: password
    })
      .then(json => {
        if (json.success) {
          const { data } = json;
          let user = json.user
          setSession(json.access_token)
          setUserid(user[0].id)
          dispatch({
            type: 'LOGIN',
            payload: {
              user
            }
          });
        }
        else {
          enqueueSnackbar(json.message, {
            variant: 'danger',
          })
        }
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: 'danger',
        })
      });
  };

  const enable_2fa = () => {
    dispatch({
      type: 'ENABLE2FA'
    });
  };

  const disable_2fa = () => {
    dispatch({
      type: 'DISABLE2FA'
    });
  };

  const updateUser = (user) => {
    dispatch({
      type: 'REGISTER',
      payload: { user }
    });
  };

  const logout = () => {
    setSession(null);
    setLevels(null);
    setAllLevels(null);
    setLanguages(null);
    setAllLanguages(null);
    setHowdidyouhear(null);
    setAllHowdidyouhear(null);
    setGroups(null);
    setAllGroups(null);
    setTextbooks(null);
    setAllTextbooks(null);
    setAllLessontextbooks(null);
    setPersonGroupinfo(null);
    setTeachers(null);
    setAllTeachers(null);
    setLessoninfos(null);
    setAllLessoninfos(null);
    setAllUsers(null);
    setRooms(null);
    setAllRooms(null);
    setSchemes(null);
    setAllSchemes(null);
    setTopics(null);
    setAllTopics(null);
    setStudents(null);
    setAllStudents(null);
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (name, surnames, email, password, password_confirmation, doc_type, doc_number, dob, phone_prefix, phone_number, address, locality, postal_code, country_code, province_code) => {
    httpClient.post('/api/auth/register', {
      name: name,
      email: email,
      surnames: surnames,
      password: password,
      password_confirmation: password_confirmation,
      doc_type: doc_type,
      doc_number: doc_number,
      dob: dob,
      phone_prefix: phone_prefix,
      phone_number: phone_number,
      address: address,
      locality: locality,
      postal_code: postal_code,
      country_code: country_code,
      province_code: province_code
    })
      .then(json => {
        if (json.success)
          return <Redirect to='/login' />
        else {
          enqueueSnackbar(json.message, {
            variant: 'danger',
          })
        }
      })
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          setSession(accessToken);
          const urlAPI = 'api/auth/profile';

          httpClient.post(urlAPI, {
            accessToken: accessToken
          })
            .then(json => {
              if (json.success) {
                let user = json.user
                dispatch({
                  type: 'INITIALISE',
                  payload: {
                    isAuthenticated: true,
                    user: user
                  }
                });
              }
              else {
                dispatch({
                  type: 'INITIALISE',
                  payload: {
                    isAuthenticated: false,
                    user: null
                  }
                });
              }
            })
            .catch((error) => {
              dispatch({
                type: 'INITIALISE',
                payload: {
                  isAuthenticated: false,
                  user: null
                }
              });
            });
        }
        else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
        login_2fa,
        enable_2fa,
        updateUser,
        disable_2fa,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
});

export const AuthProvider = connectIntl(mapStateToProps)(AuthProviderWrapper);

export default AuthContext;
