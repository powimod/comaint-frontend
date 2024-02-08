/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * containers/ErrorPage.jsx
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

import { useRouteError, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ErrorPage() {

	const { t } = useTranslation();
	const error = useRouteError()

	return (<>
		<Header/>
		<main>
			<h1>{t('error-page-title')}</h1>
			<p>{t('error-page-message')}</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<div>
				<Link to="/">{t('error-page-home-link')}</Link>
			</div>
		</main>
		<Footer/>
	</>);
}
