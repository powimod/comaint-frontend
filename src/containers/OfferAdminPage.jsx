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
import PagedList from '../components/PagedList'
import ErrorDisplay from '../components/ErrorDisplay'
import Dialog from '../components/dialog/Dialog';
import offerApi from '../api/offer-api.js'

const OfferAdminPage = (props) => {
	const { t } = useTranslation();
	const [ offerList, setOfferList ] = useState([])
	const [ error, setError ] = useState(null);

	const { account } = useContext(AccountContext);

	const asyncGetOfferList = async () => {
		setError(null)
		const result = await offerApi.getOfferList()
		if (! result.ok)
			setError(result.error)
		setOfferList(result.offerList)
	}

	const onOfferClick = (id) => {
		console.log(`Edit offer n°${id}`);
	}

	useEffect( () => {
		asyncGetOfferList()
	}, [ account ])


	if (! account || ! account.administrator) 
		return <ErrorDisplay message={'You are not administrator'}/>

	return (
		<main>
			<h1>Offer admin page</h1>
			{ error !== null && <div className='error-message'>{error}</div> }
			<PagedList list={offerList} label='title' onItemClick={onOfferClick}/>
		</main>
	)
}

export default OfferAdminPage
