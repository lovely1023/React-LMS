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
	// start new code
	students: {
		key: keyGen(),
		defaultMessage: 'Students'
	},
	lessons: {
		key: keyGen(),
		defaultMessage: 'Lessons'
	},
	bills: {
		key: keyGen(),
		defaultMessage: 'Bills'
	},
	groups: {
		key: keyGen(),
		defaultMessage: 'Groups'
	},
	teachers: {
		key: keyGen(),
		defaultMessage: 'Teachers'
	},
	certification: {
		key: keyGen(),
		defaultMessage: 'Certifications'
	},
	certificationDetail: {
		key: keyGen(),
		defaultMessage: 'Certification Detail'
	},
	addGroup: {
		key: keyGen(),
		defaultMessage: 'addGroup'
	},
	addBill: {
		key: keyGen(),
		defaultMessage: 'create Bill'
	},
	textbooks: {
		key: keyGen(),
		defaultMessage: 'Textbooks'
	},
	more: {
		key: keyGen(),
		defaultMessage: 'More(26)'
	},
	edit: {
		key: keyGen(),
		defaultMessage: 'Edit'
	},
	log: {
		key: keyGen(),
		defaultMessage: 'Log'
	},
	library: {
		key: keyGen(),
		defaultMessage: 'Library(26)'
	},
	certificates: {
		key: keyGen(),
		defaultMessage: 'Certificates'
	},
	bell: {
		key: keyGen(),
		defaultMessage: 'Bell'
	},
	users: {
		key: keyGen(),
		defaultMessage: 'Users'
	},
	obs: {
		key: keyGen(),
		defaultMessage: 'Obs'
	},
	exams: {
		key: keyGen(),
		defaultMessage: 'Exams'
	},
	contracts: {
		key: keyGen(),
		defaultMessage: 'Contracts'
	},
	addContract: {
		key: keyGen(),
		defaultMessage: 'Add Contract'
	},
	editContract: {
		key: keyGen(),
		defaultMessage: 'Edit Contract'
	},
	studentDetail: {
		key: keyGen(),
		defaultMessage: 'Student Detail'
	},
	addStudent: {
		key: keyGen(),
		defaultMessage: 'Add Student'
	},
	lessonDetail: {
		key: keyGen(),
		defaultMessage: 'Lesson Detail'
	},
	addLesson: {
		key: keyGen(),
		defaultMessage: 'Add Lesson'
	},
	billDetail: {
		key: keyGen(),
		defaultMessage: 'Bill Detail'
	},
	groupDetail: {
		key: keyGen(),
		defaultMessage: 'Group Detail'
	},
	teacherDetail: {
		key: keyGen(),
		defaultMessage: 'Teacher Detail'
	},
	textbookDetail: {
		key: keyGen(),
		defaultMessage: 'Textbook Detail'
	},
	// end new code










	start: {
		key: keyGen(),
		defaultMessage: 'START'
	},
	users: {
		key: keyGen(),
		defaultMessage: 'Users'
	},
	user: {
		key: keyGen(),
		defaultMessage: 'User'
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
	operation: {
		key: keyGen(),
		defaultMessage: 'OPERATIONS'
	},
	support: {
		key: keyGen(),
		defaultMessage: 'SUPPORT'
	},
	legal: {
		key: keyGen(),
		defaultMessage: 'LEGAL'
	},
	botmenu: {
		key: keyGen(),
		defaultMessage: 'Bot'
	},
	botControlbot: {
		key: keyGen(),
		defaultMessage: 'Control bot'
	},
	botTickers: {
		key: keyGen(),
		defaultMessage: 'Tickers'
	},
	botOpportunity: {
		key: keyGen(),
		defaultMessage: 'Opportunity'
	},
	botOppcertification: {
		key: keyGen(),
		defaultMessage: 'Opp Certification'
	},
	botResults: {
		key: keyGen(),
		defaultMessage: 'Results'
	},
	botResultscertification: {
		key: keyGen(),
		defaultMessage: 'Results Certification'
	},
	botMlresult: {
		key: keyGen(),
		defaultMessage: 'ML Result'
	},
	botMainnetresultscertification: {
		key: keyGen(),
		defaultMessage: 'Mainnet Results Certification'
	},
	botMainnetopportunitiescertification: {
		key: keyGen(),
		defaultMessage: 'Mainnet Opportunities Certification'
	},
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
	surname: {
		key: keyGen(),
		defaultMessage: 'Surname'
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
	documentType: {
		key: keyGen(),
		defaultMessage: 'Document type'
	},
	passport: {
		key: keyGen(),
		defaultMessage: 'Passport'
	},
	dni: {
		key: keyGen(),
		defaultMessage: 'DNI'
	},
	documentNumber: {
		key: keyGen(),
		defaultMessage: 'Document Number'
	},
	emailAddress: {
		key: keyGen(),
		defaultMessage: 'Email Address'
	},
	address: {
		key: keyGen(),
		defaultMessage: 'Address'
	},
	marketingsList: {
		key: keyGen(),
		defaultMessage: 'Marketings'
	},
	my_affiliate_link: {
		key: keyGen(),
		defaultMessage: 'My affiliate link'
	},
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
	legal: {
		key: keyGen(),
		defaultMessage: 'Legal'
	},
	disabled2faSuccessfully: {
		key: keyGen(),
		defaultMessage: '2FA disabled successfully'
	},
	enabled2faSuccessfully: {
		key: keyGen(),
		defaultMessage: '2FA enabled successfully'
	},
	secretNumberIsNotValid: {
		key: keyGen(),
		defaultMessage: 'Secret number is not valid!'
	},
	disable2FA: {
		key: keyGen(),
		defaultMessage: 'Disable 2 Factor'
	},
	enable2FA: {
		key: keyGen(),
		defaultMessage: 'Enable 2 Factor'
	},
	expiredCredentials: {
		key: keyGen(),
		defaultMessage: 'expired credentials. try again please'
	},
	interestCompound: {
		key: keyGen(),
		defaultMessage: 'Interest compound'
	},
	off: {
		key: keyGen(),
		defaultMessage: 'Off'
	},
	on: {
		key: keyGen(),
		defaultMessage: 'On'
	},
	activateCompoundInterest: {
		key: keyGen(),
		defaultMessage: 'Activate compound interest'
	},
	isNotEnabled2FA: {
		key: keyGen(),
		defaultMessage: '2FA is not enabled'
	},
	compoundInterestActivated: {
		key: keyGen(),
		defaultMessage: 'Compound interest activated'
	},
	compoundInterestDisabled: {
		key: keyGen(),
		defaultMessage: 'Compound interest disabled'
	},
	unexpectedError: {
		key: keyGen(),
		defaultMessage: 'An unexpected error occurred. Please try again later'
	},
	enter2FACode: {
		key: keyGen(),
		defaultMessage: 'Enter 2FA Code'
	},
	verify: {
		key: keyGen(),
		defaultMessage: 'Verify'
	},
	passwordChanged: {
		key: keyGen(),
		defaultMessage: 'Password changed successfully'
	},
	password: {
		key: keyGen(),
		defaultMessage: 'Password'
	},
	newPassword: {
		key: keyGen(),
		defaultMessage: 'New password'
	},
	repeadPassword: {
		key: keyGen(),
		defaultMessage: 'Repead Password'
	},
	saveChanges: {
		key: keyGen(),
		defaultMessage: 'Save Changes'
	},
	login: {
		key: keyGen(),
		defaultMessage: 'Login'
	},
	signIn: {
		key: keyGen(),
		defaultMessage: 'Sign In'
	},
	createNewAccount: {
		key: keyGen(),
		defaultMessage: 'Create new account'
	},
	theFieldIsRequired: {
		key: keyGen(),
		defaultMessage: 'The field is required'
	},
	mustBeAValidEmail: {
		key: keyGen(),
		defaultMessage: 'Must be a valid email'
	},
	maximumCharacters: {
		key: keyGen(),
		defaultMessage: 'Must be at most {characters} characters'
	},
	logIn: {
		key: keyGen(),
		defaultMessage: 'Log In'
	},
	aienesisBot04: {
		key: keyGen(),
		defaultMessage: 'Aienesis Bot 0.4'
	},
	invitationLinkIsCopied: {
		key: keyGen(),
		defaultMessage: 'Invitation Link is copied to clipboard'
	},
	invitationLink: {
		key: keyGen(),
		defaultMessage: 'Invitation Link'
	},
	roiDaily: {
		key: keyGen(),
		defaultMessage: 'Roi daily'
	},
	roiWeekly: {
		key: keyGen(),
		defaultMessage: 'Roi weekly'
	},
	monthly: {
		key: keyGen(),
		defaultMessage: 'Monthly'
	},
	myLicense: {
		key: keyGen(),
		defaultMessage: 'My license'
	},
	valueOfMyLicenses: {
		key: keyGen(),
		defaultMessage: 'Value of my licenses'
	},
	currentBalance: {
		key: keyGen(),
		defaultMessage: 'Current balance'
	},
	actions: {
		key: keyGen(),
		defaultMessage: 'Actions'
	},
	eliminatedSuccess: {
		key: keyGen(),
		defaultMessage: 'Eliminated successful'
	},
	alertDelete: {
		key: keyGen(),
		defaultMessage: 'You are about to do a permanent erase. Do you want to continue?'
	},
	deleteAll: {
		key: keyGen(),
		defaultMessage: 'Delete all'
	},
	passwordIsIncorrect: {
		key: keyGen(),
		defaultMessage: 'Password is incorrect'
	},
	invalidDateFormat: {
		key: keyGen(),
		defaultMessage: 'Invalid Date Format'
	},
	name: {
		key: keyGen(),
		defaultMessage: 'Name'
	},
	locality: {
		key: keyGen(),
		defaultMessage: 'Locality'
	},
	postalCode: {
		key: keyGen(),
		defaultMessage: 'Postal Code'
	},
	province: {
		key: keyGen(),
		defaultMessage: 'Province'
	},
	birthday: {
		key: keyGen(),
		defaultMessage: 'Birthday'
	},
	profileSuccessfullyUpdated: {
		key: keyGen(),
		defaultMessage: 'Profile successfully updated'
	},
	walletIsCreatedSuccessfully: {
		key: keyGen(),
		defaultMessage: 'Wallet is created successfully'
	},

	/*******
	* URLs *
	********/
	...routes(keyGen)
};
