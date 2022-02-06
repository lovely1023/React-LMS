import axios from 'axios';
const URL_BASE = process.env.REACT_APP_BASE_URL;
/**
 * @param {string}  $url url a la cual consultar
 * esta funcion detecta si es una nueva url base (comienza con http:// o https://).
 * en caso de ser asi, retorna la url. en caso contrario, se asume que es un fragmento
 * de path por lo que se concatena con la constante urlBase
 **/
const readUrl = (url = '') => {
  return (url.startsWith('http://') || url.startsWith('https://'))
    ? url : `${URL_BASE}/${url}`
}

// Authorization Token
const getToken = () => {
  return {
    TOKEN: window.localStorage.getItem('accessToken'),
    TOKEN_2FA: window.localStorage.getItem('accessToken2FA')
  }
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
}


const get = (url = '', options = {}) => {
  const { TOKEN } = getToken();
  return fetch(readUrl(url), {
    method: 'GET',
    headers: {
      ...headers,
      ...options.headers,
      'x-access-token': `${TOKEN}`
      // 'Authorization': `Bearer ${TOKEN || TOKEN_2FA}`
    },
    ...options,
  }).then((response) => response.json());
}

const post = (url = '', body = {}, options = {}) => {
  const { TOKEN } = getToken();
  return fetch(readUrl(url), {
    method: 'POST',
    headers: {
      ...headers,
      ...options.headers,
      'x-access-token': `${TOKEN}`
      // 'Authorization': `Bearer ${TOKEN || TOKEN_2FA}`
    },
    body: JSON.stringify(body),
    ...options
  }).then((response) => response.json())
}

const postFile = (url = '', body = {}, options = {}) => {
  const { TOKEN, TOKEN_2FA } = getToken();
  return axios.post(readUrl(url), body, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${TOKEN || TOKEN_2FA}`
    }
  })
}

const put = (url = '', body = {}, options = {}) => {
  const { TOKEN } = getToken();
  return fetch(readUrl(url), {
    method: 'PUT',
    headers: {
      ...headers,
      ...options.headers,
      'x-access-token': `${TOKEN}`
    },
    body: JSON.stringify(body),
    ...options
  }).then((response) => response.json())
}

const del = (url = '', options = {}) => {
  const { TOKEN } = getToken();
  return fetch(readUrl(url), {
    method: 'DELETE',
    headers: {
      ...headers,
      ...options.headers,
      'x-access-token': `${TOKEN}`
    },
    ...options,
  }).then((response) => response.json())
}

export default {
  get,
  put,
  post,
  postFile,
  delete: del,
}
