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
import { OfferEditorDialog } from '../components/editors/OfferEditor'
import PaletteIcon from '../components/PaletteIcon';
import offerApi from '../api/offer-api.js'


const OfferAdminPage = (props) => {
	const { t } = useTranslation();
	const [ offerList, setOfferList ] = useState([])
	const [ error, setError ] = useState(null);
	const [ isEditorDialogOpen, setIsEditorDialogOpen ] = useState(false)
	const [ editedId, setEditedId ] = useState(-1)

	const { account } = useContext(AccountContext);

	const asyncGetOfferList = async () => {
		setError(null)
		const result = await offerApi.getOfferList()
		if (! result.ok)
			setError(result.error)
		setOfferList(result.offerList)
	}

	useEffect( () => {
		asyncGetOfferList()
	}, [ account ])

	const onOfferClick = (id) => {
		setEditedId(parseInt(id))
		setIsEditorDialogOpen(true)
	}

	const onCreateButtonClick = () => {
		setEditedId(-1)
		setIsEditorDialogOpen(true)
	}

	const onEditorDialogClose = (editedOffer) => {
		if (editedOffer === undefined)
			return;
		if (editedOffer === null) {
			setOfferList( offerList.filter( offer => offer.id !== editedId) )
		}
		else {
			if (editedId === -1) {
				setOfferList( [...offerList, editedOffer ]  )
			}
			else {
				setOfferList( offerList.map( offer => offer.id == editedId ? editedOffer : offer) )
			}
		}
		setEditedId(-1)
		setIsEditorDialogOpen(false)
	}


	if (! account || ! account.administrator) 
		return <ErrorDisplay message={t('error.not_administrator')}/>

	return (
		<main>
			<h1>Offer admin page</h1>
			{ error !== null && <div className='error-message'>{error}</div> }
			<PaletteIcon element="create" button="true" onClick={onCreateButtonClick}/>

			<PagedList list={offerList} label='title' onItemClick={onOfferClick}/>
			<OfferEditorDialog offerId={editedId} isDialogOpen={isEditorDialogOpen} onDialogClose={onEditorDialogClose}/>
		</main>
	)
}

export default OfferAdminPage
