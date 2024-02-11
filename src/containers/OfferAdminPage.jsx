/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * containers/OfferAdminPage.jsx
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

import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { AccountContext } from '../AccountContext'
import ErrorDisplay from '../components/ErrorDisplay'

const OfferAdminPage = (props) => {
	const { t } = useTranslation();

	const { account } = useContext(AccountContext);
	if (! account.administrator) 
		return <ErrorDisplay message={'You are not administrator'}/>

	return (
		<main>
			<section>
				<h1>Offer admin page</h1>
			</section>
		</main>
	)
}

export default OfferAdminPage
