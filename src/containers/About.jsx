/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * containers/About.jsx
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

import { useTranslation } from 'react-i18next';
import { Link, useLoaderData } from 'react-router-dom'
import Config from '../components/Config';

import { getApiVersion } from '../api/global-api.js'

const loader = async () => {
	try {
		const result = await getApiVersion()
		return {backendVersion: result.version}
	}
	catch (error) {
		console.error(error);
		return {backendVersion: '?'}
	}
}

const About = (props) => {
	const { t } = useTranslation();
	const { backendVersion } = useLoaderData();

	const sendMail = (ev) => {
		ev.preventDefault();
		window.location.href = `mailto:${Config.contact}`;
	}

	const navigateWebsite = (ev) => {
		ev.preventDefault();
		console.log(Config.website);
		window.location.replace(Config.website);
	}

	return (
		<main className="about">
			<h1>About</h1>
			<img src="logo.svg"/>
			<h2>{t('header_title')}</h2>
			<h3>{t('header_subtitle')}</h3>
			<ul>
			<li>{t('website')} : <a href="#" onClick={navigateWebsite}>{Config.website}</a></li>
			<li>{t('contact')} : <a href="#" onClick={sendMail}>{Config.contact}</a></li>
			<li>{t('frontend_version', {'version': Config.version}) }</li>
			<li>{t('backend_version', {'version': backendVersion ? backendVersion : '...'}) }</li>
			</ul>
			<div> <Link to="/">{t('home')}</Link> </div>
		</main>
	)
}

export default About
export { loader }
