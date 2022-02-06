/*
 *
 * $messages { object -> object }
 * --------------------------------------
 * Description
 * --------------------------------------
 * Es una constante donde se listarán cada uno de los textos que viven en todo el código.
 * cada clave del objeto $messages es en si mismo un objeto el cual consta de las claves:
 * ---
 * 'key' => Debe ser un valor unico, en caso de existir dos textos con la misma key causará
 * que se sobre escriban los texto de manera inapropiada
 * ---
 * 'defaultMessage' => es el mensaje (texto) que se mostrará por defecto en el primer
 * renderizado de la web, después cuando el usuario quiera cambiar de idioma estos
 * serán buscados en la base de datos por su key y en caso de existir se mostrará su traducción
 * 
**/
const messages = {
	dashboard: {
		key: 1,
		defaultMessage: 'Tablero'
	},
	appContents: {
		key: 2,
		defaultMessage: 'contenido de la App'
	},
	setting: {
		key: 3,
		defaultMessage: 'Configuración'
	},
	language_default: {
		key: 4,
		defaultMessage: 'Español'
	},
	language_en: {
		key: 5,
		defaultMessage: 'Ingles'
	},
	language_cor: {
		key: 6,
		defaultMessage: 'Coreano'
	},
	superAdmin: {
		key: 7,
		defaultMessage: 'Super Admin'
	}
}

export default messages;