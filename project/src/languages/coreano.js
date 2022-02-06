import routes from './routesMultilanguage';
import { resetKey, keyGen } from './keyGenerate';

/*
 *
 * Resetear el generador de claves (ID) antes de utilizarlo
 * para mantener la coherencia con el resto de ficheros de idiomas
 * 
**/
resetKey();


/*
 *
 * export => { object => object }
 * --------------------------------------
 * Descripción
 * --------------------------------------
 * Se exporta un objeto donde se listarán cada uno de los textos que viven en todo el código.
 * Cada propiedad del objeto exportado es en si mismo un objeto que posee las siguientes
 * propiedades:
 * ---
 * 'key' => Debe ser un valor único, en caso de existir dos textos con la misma key causará
 * que se sobre escriban los texto de manera inapropiada
 * ---
 * 'defaultMessage' => es el mensaje (texto) que se mostrará en la UX.
 *
 * NOTA: Hay ciertos 'defaultMessage' que requeiren recibir parámetros, para poder hacerlo
 * se debe pasar el parámetro entre llaves '{}' con el nombre del parámetro dentro
 * EJEMPLO => defaultMessage: 'Hola {nombre_usuario} como estas?' donde nombre_usuario sería
 * el parámetro que será remplasado al llamar la función formatMessage() que se encuentra en
 * 'src/contexts/Intl.js'
 *
**/
export default {
  // menu languages start
  start: {
    key: keyGen(),
    defaultMessage: 'START'
  },
  user: {
    key: keyGen(),
    defaultMessage: 'USERS'
  },
  profile: {
    key: keyGen(),
    defaultMessage: 'PROFILE'
  },
  product: {
    key: keyGen(),
    defaultMessage: 'PRODUCTS'
  },
  license: {
    key: keyGen(),
    defaultMessage: 'MY LICENSES'
  },
  balance: {
    key: keyGen(),
    defaultMessage: 'BALANCES'
  },
  withdrawal: {
    key: keyGen(),
    defaultMessage: 'WITHDRAWALS'
  },
  affiliate: {
    key: keyGen(),
    defaultMessage: 'MY AFFILIATES'
  },
  marketing: {
    key: keyGen(),
    defaultMessage: 'MARKETING'
  },
  // menu languages end

  language_es: {
    key: keyGen(),
    defaultMessage: 'Español'
  },
  language_en: {
    key: keyGen(),
    defaultMessage: 'English'
  },
  language_ko: {
    key: keyGen(),
    defaultMessage: '한국어'
  },
  // balance languages start
  balanceList: {
    key: keyGen(),
    defaultMessage: 'Balance List'
  },
  performance_of_my_licenses: {
    key: keyGen(),
    defaultMessage: 'PERFORMANCE OF MY LICENSES'
  },
  date: {
    key: keyGen(),
    defaultMessage: 'Date'
  },
  performance_percent: {
    key: keyGen(),
    defaultMessage: 'Performance (%)'
  },
  perfomance_usd: {
    key: keyGen(),
    defaultMessage: 'Performance ($)'
  },
  equivalence_btc: {
    key: keyGen(),
    defaultMessage: 'Equivalence BTC'
  },
  performance_of_my_referals: {
    key: keyGen(),
    defaultMessage: 'PERFORMANCE OF MY REFERRALS'
  },
  amount: {
    key: keyGen(),
    defaultMessage: 'Amount'
  },
  concept: {
    key: keyGen(),
    defaultMessage: 'Concept'
  },
  // balance languages end

  // withdrawl languages start
  withrawalList: {
    key: keyGen(),
    defaultMessage: 'Withrawal List'
  },
  retreats: {
    key: keyGen(),
    defaultMessage: 'Retreats'
  },
  current_balance_usd: {
    key: keyGen(),
    defaultMessage: 'Current balance in usd'
  },
  amount_to_withdraw: {
    key: keyGen(),
    defaultMessage: 'Amount to withdraw'
  },
  request_withdraw: {
    key: keyGen(),
    defaultMessage: 'Request withdrawal'
  },
  application_date: {
    key: keyGen(),
    defaultMessage: 'Application date'
  },
  amount_usd: {
    key: keyGen(),
    defaultMessage: 'Amount USD'
  },
  payment_date: {
    key: keyGen(),
    defaultMessage: 'Payment date'
  },
  // withdrawl languages end

  // affiliate languates start
  affiliateList: {
    key: keyGen(),
    defaultMessage: 'Affiliate List'
  },
  my_affiliates: {
    key: keyGen(),
    defaultMessage: 'LEVEL'
  },
  level: {
    key: keyGen(),
    defaultMessage: 'Level'
  },
  user_name: {
    key: keyGen(),
    defaultMessage: 'User Name'
  },
  email: {
    key: keyGen(),
    defaultMessage: 'Email'
  },
  name_and_surname: {
    key: keyGen(),
    defaultMessage: 'Name and surname'
  },
  country: {
    key: keyGen(),
    defaultMessage: 'Country'
  },
  enrollment_date: {
    key: keyGen(),
    defaultMessage: 'Enrollment date'
  },
  number_of_licenses: {
    key: keyGen(),
    defaultMessage: 'Number of licenses'
  },
  // affiliate languates end

  // marketing languages start
  marketingsList: {
    key: keyGen(),
    defaultMessage: 'Marketings'
  },
  my_affiliate_link: {
    key: keyGen(),
    defaultMessage: 'My affiliate link'
  },
  // marketing languages end

  // operating languages start
  operationList: {
    key: keyGen(),
    defaultMessage: 'Operation List'
  },
  history_of_operations: {
    key: keyGen(),
    defaultMessage: 'HISTORY OF OPERATIONS'
  },
  operation: {
    key: keyGen(),
    defaultMessage: 'Operation'
  },
  market: {
    key: keyGen(),
    defaultMessage: 'Market'
  },
  paire: {
    key: keyGen(),
    defaultMessage: 'Pair'
  },
  type: {
    key: keyGen(),
    defaultMessage: 'Type'
  },
  price: {
    key: keyGen(),
    defaultMessage: 'Price'
  },
  quantity: {
    key: keyGen(),
    defaultMessage: 'Quantity'
  },
  // operating languages end

  // support languages start
  support: {
    key: keyGen(),
    defaultMessage: 'SUPPORT'
  },
  frequent_questions: {
    key: keyGen(),
    defaultMessage: 'Frequent questions'
  },
  ticket_area: {
    key: keyGen(),
    defaultMessage: 'TICKET AREA'
  },
  attach_files: {
    key: keyGen(),
    defaultMessage: 'ATTACH FILES'
  },
  send: {
    key: keyGen(),
    defaultMessage: 'SEND'
  },
  // support languages end

  // legal languages start
  legal: {
    key: keyGen(),
    defaultMessage: 'Legal'
  },
  // legal languages end

  // bot menu language start
  botmenu: {
    key: keyGen(),
    defaultMessage: '봇'
  },
  botControlbot: {
    key: keyGen(),
    defaultMessage: '제어 봇'
  },
  botTickers: {
    key: keyGen(),
    defaultMessage: '티커'
  },
  botOpportunity: {
    key: keyGen(),
    defaultMessage: '기회'
  },
  botOppcertification: {
    key: keyGen(),
    defaultMessage: 'Opp 인증'
  },
  botResults: {
    key: keyGen(),
    defaultMessage: '결과'
  },
  botResultscertification: {
    key: keyGen(),
    defaultMessage: '결과 인증'
  },
  botMlresult: {
    key: keyGen(),
    defaultMessage: 'ML 결과'
  },
  botMainnetresultscertification: {
    key: keyGen(),
    defaultMessage: '메인 넷 결과 인증'
  },
  botMainnetopportunitiescertification: {
    key: keyGen(),
    defaultMessage: '메인 넷 기회 인증'
  },
  // bot menu language end
  /*****************
  * END - NEWS - 2 *
  ******************/

  /*******
  * URLs *
  ********/
  ...routes(keyGen)
};
