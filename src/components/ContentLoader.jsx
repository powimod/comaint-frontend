/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/ContenttLoader.jsx
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the 
 * GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied 
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import Async, { useAsync } from 'react-async'
import i18n from 'i18next';

const MODE_NONE = 0; // FIXME really used ?
const MODE_TITLE_1 = 1;
const MODE_TITLE_2 = 2;
const MODE_TITLE_3 = 3;
const MODE_PARAGRAPH = 5;
const MODE_UNORDERED_LIST = 6;
const MODE_ORDERED_LIST = 7;

const ContentLoader = ({source}) => {
	const { t } = useTranslation()
	const orderedListRegExp =  new RegExp('^\\d+ +(.*)')

	const [ lang, setLang ] = useState(null)


	useEffect(() => {
		setLang(i18n.language)
	}, []);


	const onLanguageChanged = (lang) => {
		setLang(lang);
	}

	useEffect( () => {
		i18n.on('languageChanged', onLanguageChanged);
		return () => {
			i18n.off('languageChanged', onLanguageChanged);
		}
		
	}, [onLanguageChanged]);


	const render = (data) => {
		return new Promise( (resolve, reject) => {
			const componentStack = []
			let currentComponent = null 
			let bulletList = []
			let orderedList = []
			let paragraph = []
			let n = 0;
			let lastMode = MODE_NONE

			const lines = data.split('\n')
			lines.push(''); // add an empty line at then end to force last data to be rendered

			for (let line of lines) {
				line = line.trim()

				if (currentComponent === null) {
					currentComponent = []
					componentStack.push(currentComponent)
				}
				
				const extractOrderedItem =  orderedListRegExp.exec(line)

				let newMode = MODE_NONE
				if (line.startsWith('###'))
					newMode = MODE_TITLE_3 
				else if (line.startsWith('##'))
					newMode = MODE_TITLE_2 
				else if (line.startsWith('#'))
					newMode = MODE_TITLE_1 
				else if (line.startsWith('-'))
					newMode = MODE_ORDERED_LIST
				else if (extractOrderedItem !== null)
					newMode = MODE_UNORDERED_LIST
				else if (line.length > 0)
					newMode = MODE_PARAGRAPH

				// render and empty buffers when mode changes
				switch (lastMode) {
					case MODE_PARAGRAPH:
						if (newMode !== MODE_PARAGRAPH) {
							currentComponent.push(<p key={n++}>{paragraph.join('\n')}</p>)
							paragraph = []
						}
						break;
					case MODE_ORDERED_LIST:
						if (newMode !== MODE_ORDERED_LIST) {
							currentComponent.push( <ul key={n++}> { bulletList.map( (line,i) => <li key={i}>{line}</li> ) } </ul>)
							bulletList = []
						}
						break;
					case MODE_UNORDERED_LIST:
						if (lastMode === MODE_UNORDERED_LIST && newMode !== MODE_UNORDERED_LIST) {
							currentComponent.push( <ol key={n++}> { orderedList.map( (line,i) => <li key={i}>{line}</li> ) } </ol>)
							orderedList = []
						}
						break;
				}

				switch (newMode) {
					case MODE_PARAGRAPH:
						paragraph.push(line)
						break;
					case MODE_ORDERED_LIST:
						bulletList.push(line.substr(1).trim())
						break;
					case MODE_UNORDERED_LIST:
						orderedList.push(extractOrderedItem[1])
						break;
					case MODE_TITLE_3 :
						currentComponent.push(<h3 key={n++}>{line.substr(3).trim()}</h3>)
						break;
					case MODE_TITLE_2 :
						currentComponent.push(<h2 key={n++}>{line.substr(2).trim()}</h2>)
						break;
					case MODE_TITLE_1 :
						currentComponent.push(<h1 key={n++}>{line.substr(1).trim()}</h1>)
						break;
				}

				lastMode = newMode
			}

			if (componentStack.length > 1)
				console.error('Component stack root is not unique')
			resolve(<>{componentStack[0]}</>)
		});
	}

	const loadUrl = async ({ url }, {signal}) => {
		let response = await fetch(url, { signal })
		// When the resource does not exist, Vite always returns status=200 and response content is index.html !
		// This does not happen when running on a real HTTP server
		if (! response.ok)
			throw new Error(`Ressource "${url}" not found`) // TODO translation
		let data  = await response.text()
		return render(data);
	}


	const sourceUrl = `content/${lang}/${source}`

	return (
		lang == null ?
			<div>Language not set</div>
		: 
			<Async promiseFn={loadUrl} url={sourceUrl}>
				{({ data, error, isPending }) => {
					if (isPending)
						return 'Loading...' // TODO translation
					if (error)
						return 'Something went wrong: ' + error.message // TODO translation
					if (data) 
						return data
					return null
				}}
			</Async>
	)
}

export default ContentLoader
