/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/AccessibilityDialog.jsx
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
import i18n from "i18next";

import PaletteIcon from './PaletteIcon';
import Dialog from './dialog/Dialog';

const AccessibilityDialog = ({isOpen, onClose}) => {
	const { t } = useTranslation();
 
	const [theme, setTheme] = useState(() => {
		let value = localStorage.getItem('theme');
		return (value === 'dark' ? 'dark' : 'light'); 
	});

	const [lineSpacing, setLineSpacing] = useState(() => {
		let value = localStorage.getItem('line-spacing');
		return (value === 'simple' ? 'simple' : 'double'); 
	});

	const [lang, setLang] = useState(() => {
		let value = localStorage.getItem('i18nextLng');
		return (value === 'en' ? 'en' : 'fr'); 
	});

	useEffect( () => {
		activateTheme();
		activateLineSpacing();
	}, []);

	useEffect( () => {
		localStorage.setItem('theme', theme);
		activateTheme();
	}, [ theme ]);

	useEffect( () => {
		localStorage.setItem('line-spacing', lineSpacing);
		activateLineSpacing();
	}, [ lineSpacing ]);

	useEffect( () => {
		localStorage.setItem('i18nextLng', lang);
		activateLang();
	}, [ lang]);

	const activateTheme = () => {
		if (theme === 'dark')
			document.body.classList.add('dark-theme');
		else
			document.body.classList.remove('dark-theme');
	}

	const activateLineSpacing= () => {
		if (lineSpacing === 'simple') 
			document.body.classList.remove('line-spacing-theme');
		else 
			document.body.classList.add('line-spacing-theme');
	}
	
	const activateLang = () => {
		i18n.changeLanguage(lang);
	}

	const onThemeChange = (ev) => {
		setTheme(ev.target.value);
	}

	const onLineSpacingChange = (ev) => {
		setLineSpacing(ev.target.value);
	}

	const onLangChange = (ev) => {
		setLang(ev.target.value);
	}

	return (<>
		<Dialog isOpen={isOpen} onClose={onClose} className='accessibility-dialog'>
			<fieldset>
				<legend>{t('accessibility-theme')}</legend>
				<div>
					<input id='light_theme' type='radio' value='light' checked={theme=='light'} onChange={onThemeChange}/>
					<label htmlFor='light_theme'>{t('accessibility-light-theme')}</label>
				</div>
				<div>
					<input id='dark_theme' type='radio' value='dark' checked={theme=='dark'} onChange={onThemeChange}/>
					<label htmlFor='dark_theme'>{t('accessibility-dark-theme')}</label>
				</div>
			</fieldset>
			<fieldset>
				<legend>{t('accessibility-line-spacing')}</legend>
				<div>
					<input id='line_spacing_simple' type='radio' value='simple' checked={lineSpacing==='simple'} onChange={onLineSpacingChange}/>
					<label htmlFor='line_spacing_simple'>{t('accessibility-line-spacing-simple')}</label>
				</div>
				<div>
					<input id='line_spacing_double' type='radio' value='double' checked={lineSpacing==='double'} onChange={onLineSpacingChange}/>
					<label htmlFor='line_spacing_double'>{t('accessibility-line-spacing-double')}</label>
				</div>

			</fieldset>
			<fieldset>
				<legend>{t('accessibility-lang')}</legend>
				<div>
					<input id='lang_fr' type='radio' value='fr' checked={lang==='fr'} onChange={onLangChange}/>
					<label htmlFor='lang_fr'>{t('accessibility-lang-fr')}</label>
				</div>
				<div>
					<input id='lang_en' type='radio' value='en' checked={lang==='en'} onChange={onLangChange}/>
					<label htmlFor='lang_en'>{t('accessibility-lang-en')}</label>
				</div>
			</fieldset>

			<div className='button-bar'>
				<button onClick={onClose}>{t('close')}</button>
			</div>
		</Dialog>
	</>)
}

export default AccessibilityDialog;
