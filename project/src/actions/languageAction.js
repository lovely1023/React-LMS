import axios from 'src/utils/axios';
import messages from 'src/initialLanguage';
import {
	CHANGE_LANGUAGE,
} from 'src/constants.js';

/*
 * @param {Object} payload
 * @param {Function} dispatch
*/
export const changeLanguage = async (language, dispatch, store) => {
	let messagesTmp, languageTmp;

	let messagesCache = store.intl.languageList[language.cod];

	if(language.cod === 'default') {
		messagesTmp = messages;
		languageTmp = findCurrentLanguage(language, messages);
	} else if(messagesCache) {
		messagesTmp = messagesCache;
		languageTmp = findCurrentLanguage(language, messagesTmp);
	} else {
		let { data } = await axios.post('/api/languaje', {
			messages,
			language: language.cod,
		});

		if(data) {
			messagesTmp = data;
			languageTmp = findCurrentLanguage(language, data);
		}
	}

	if(messagesTmp && languageTmp) {
		dispatch({
			type: CHANGE_LANGUAGE,
			payload: {
				messages: messagesTmp,
				language: languageTmp,
			}
		})
	}
}

const findCurrentLanguage = (old, data) => {
	for(let i in data) {
		if(data[i].key === old.key) {
			var currentLanguage = {
				...data[i],
				cod: old.cod,
			}
			break;
		}
	}
	return currentLanguage;
}