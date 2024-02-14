/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/editors/OfferEditor.jsx
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

/**
 * @module OfferEditor
 */

import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import EditorToolbar, {EditorToolBarModes, EditorToolBarActions} from './EditorToolBar'
import Dialog from '../dialog/Dialog'
import MessageDialog from '../dialog/MessageDialog'
import ConfirmDialog from '../dialog/ConfirmDialog'
import { DialogContext } from '../dialog/DialogContext'

import { createObjectInstance, controlObjectProperty, controlObject, diffObjects } from '../../api/objects/object-util.mjs'
import offerObjectDef from '../../api/objects/offer-object-def.mjs'
import offerApi from '../../api/offer-api.js'

/**
 * Represent an Offer editor.
 * @component
 * @param {Object} props - the props object.
 * @param {integer} props.offerId - ID of object to edit or -1 to create a new offer
 * @param {function=} props.onClose - function to callback when the close button is pressed.
 *	If not specified, no close button will be shown.
 * @returns {JSX.Element} - A React element representing the toolbar.
 *
 * @example
 *   <OfferEditor offerId={-1} onClose={()=>console.log('Close button clicked')} />
 * 
 */
const OfferEditor = ({offerId, onClose = null}) => {
	if (offerId === undefined)
		throw new Error('Offer ID is not defined')
	if (isNaN(offerId) )
		throw new Error('Offer ID is not number')
	offerId = parseInt(offerId)

	const { t } = useTranslation();
	const [ dialogRequestList, pushDialogRequest ] = useContext(DialogContext)

	const initialFieldSet = createObjectInstance(offerObjectDef) // important !

	const [ error, setError ] = useState(null);
	const [ editorMode, setEditorMode ] = useState(0)
	const [ editorAction, setEditorAction ] = useState(0)

	const [ editedFieldSet, setEditedFieldSet ] = useState(initialFieldSet)
	const [ originalFieldSet, setOriginalFieldSet ] = useState(initialFieldSet)

	const [ isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen ] = useState(false)

	useEffect( () => {
		setError(null) // reset the "form is locked" error
	}, [ editorMode ])

	useEffect( () => {
		if (offerId === -1)
			setEditorMode(EditorToolBarModes.create)
		else
			setEditorMode(EditorToolBarModes.display) // when mode is Edit, start in display mode waiting the Edit button to be pressed 
		asyncLoadOfferFromDb()
	}, [ offerId ])

	useEffect( () => {
		// do not reset error here (should erase control object error)
		switch (editorAction){
			case EditorToolBarActions.cancel:
				// restore previous values
				setEditedFieldSet({...originalFieldSet})
				if (offerId === -1 && onClose)
					onClose()
				break;
			case EditorToolBarActions.validate:
				const error = controlObject(offerObjectDef, editedFieldSet, /*controlId=*/false, t)
				if (error) {
					setError(error)
					return
				}
				asyncSaveOfferToDb()
				/* FIXME if dialog is closed before asynchronous save, it hides save errors
				 * if (offerId === -1 && onClose) onClose()
				 */
				break;
			case EditorToolBarActions.delete:
				setIsConfirmDeleteDialogOpen(true)
				break;
			case EditorToolBarActions.close:
				if (onClose)
					onClose()
				break;
		}
	}, [ editorAction ])


	const asyncLoadOfferFromDb = async () =>  {
		setError(null)
		if (offerId === -1) {
			const fieldSet = createObjectInstance(offerObjectDef)
			setOriginalFieldSet(fieldSet)
			setEditedFieldSet(fieldSet)
		}
		else {
			const result = await offerApi.getOfferDetails(offerId)
			if (! result.ok) {
				setError(result.error)
				return
			}
			setOriginalFieldSet(result.offer)
			setEditedFieldSet(result.offer)
		}
	}

	const asyncSaveOfferToDb = async () => {
		setError(null)
		const deltaFieldSet = diffObjects(offerObjectDef, originalFieldSet, editedFieldSet)
		console.log("Delta", deltaFieldSet)
		if (Object.values(deltaFieldSet).length === 1) {
			console.log("No change to save")
			return // there is nothing to save if delta contains only ID 
		}
		if (offerId === -1) {
			const result = await offerApi.createOffer(editedFieldSet)
			if (! result.ok) {
				setError(result.error)
				return
			}
			setOriginalFieldSet(result.offer)
			setEditedFieldSet(result.offer)
		}
		else {
			const result = await offerApi.editOffer(deltaFieldSet)
			if (! result.ok) {
				setError(result.error)
				return
			}
			setOriginalFieldSet(result.offer)
			setEditedFieldSet(result.offer)
		}
	}

	const asyncDeleteOfferToDb = async () => {
		setError(null)
		if (offerId === -1) {
			console.error('Should not try to delete a newly offer')
			return
		}
		console.log("dOm delete", typeof(offerId))
		const result = await offerApi.deleteOffer(offerId)
		if (! result.ok) {
			setError(result.error)
			return
		}

		if (onClose)
			onClose()
		pushDialogRequest({type:'flash', message: t('form.offer.delete_success', { offerId }), duration:3000})
	}

	const changeFieldValue = (ev) => {
		setError(null)
		if (editorMode === EditorToolBarModes.display) {
			setError(t('error.form_locked'))
			return
		}
		const field = ev.target
		const propName = field.id
		let propValue = field.value
		if (field.type === 'checkbox') // React's checkbox have always value=on 
			propValue = ! editedFieldSet[propName]
		if (field.type === 'number'){ // Input with type=number have always a string value
			if (isNaN(propValue) === false) 
				propValue = parseFloat(propValue) // do not use parseInt ! (float values)
		}
		const error = controlObjectProperty(offerObjectDef, propName, propValue, t)
		if (error) 
			setError(error) // accept change, it's only a warning
		const newEditedFieldSet = {...editedFieldSet}
		newEditedFieldSet[propName] = propValue
		setEditedFieldSet(newEditedFieldSet)
	}

	const onConfirmDeleteDialogClose = (confirmation) => {
		if (confirmation) {
			asyncDeleteOfferToDb ()
		}
		setIsConfirmDeleteDialogOpen(false)
	}

	return (<>
			<EditorToolbar 
				title={ t( offerId === -1 ? 'form.offer.create_title' : 'form.offer.edit_title' ) }
				baseMode={offerId === -1 ? EditorToolBarModes.create : EditorToolBarModes.edit}
				setMode={setEditorMode}
				setAction={setEditorAction}
				canDelete={true}
				canClose={(onClose !== null)}
			/> 
			{ error !== null && <div className='error-message'>{error}</div> }
				<form className="editor-content">

					<label htmlFor="title">{t('form.offer.field_title')}</label>
					<input 
						id="title" 
						type="text"
						value={editedFieldSet.title} 
						maxLength={offerObjectDef.title.maximum}
						onChange={changeFieldValue}/>

					<label htmlFor="title">{t('form.offer.field_description')}</label>
					<textarea
						id="description"
						type="text"
						value={editedFieldSet.description}
						maxLength={offerObjectDef.description.maximum}
						onChange={changeFieldValue}/>

					<input
						id="active"
						type="checkbox"
						checked={editedFieldSet.active}
						onChange={changeFieldValue}/>
					<label htmlFor="active">{t('form.offer.field_active')}</label>

					<fieldset className="subscription_limit_fieldset">
						<legend>{t('form.offer.subscription_fieldset_legend')}</legend>

						<label htmlFor="duration">{t('form.offer.field_duration')}</label>
						<input 
							id="duration" 
							type="number"
							value={editedFieldSet.duration} 
							onChange={changeFieldValue}/>

						<label htmlFor="price">{t('form.offer.field_price')}</label>
						<input 
							id="price" 
							type="number"
							step="0.01"
							value={editedFieldSet.price} 
							onChange={changeFieldValue}/>
					</fieldset>

					<fieldset className="offer_limit_fieldset">
						<legend>{t('form.offer.limit_fieldset_legend')}</legend>

						<label htmlFor="userLimit">{t('form.offer.field_user_limit')}</label>
						<input 
							id="userLimit" 
							type="number"
							value={editedFieldSet.userLimit} 
							onChange={changeFieldValue}/>

						<label htmlFor="equipmentLimit">{t('form.offer.field_equipment_limit')}</label>
						<input 
							id="equipmentLimit" 
							type="number"
							value={editedFieldSet.equipmentLimit} 
							onChange={changeFieldValue}/>

						<label htmlFor="articleLimit">{t('form.offer.field_article_limit')}</label>
						<input 
							id="articleLimit" 
							type="number"
							value={editedFieldSet.articleLimit} 
							onChange={changeFieldValue}/>

						<label htmlFor="interventionLimit">{t('form.offer.field_intervention_limit')}</label>
						<input 
							id="interventionLimit" 
							type="number"
							value={editedFieldSet.interventionLimit} 
							onChange={changeFieldValue}/>

						<label htmlFor="storageLimit">{t('form.offer.field_storage_limit')}</label>
						<input 
							id="storageLimit" 
							type="number"
							value={editedFieldSet.storageLimit} 
							onChange={changeFieldValue}/>

					</fieldset>
				</form>
				<ConfirmDialog isOpen={isConfirmDeleteDialogOpen} onResponse={onConfirmDeleteDialogClose}>
					{t('form.offer.delete_question', { offerId })}
				</ConfirmDialog>
		</>)
}

/**
 * Represent a dialog with a offer editor.
 * @component
 * @param {Object} props - the props object.
 * @param {integer} props.offerId - ID of object to edit or -1 to create a new offer
 * @param {boolean} props.isDialogOpen - indicate if dialog is shown or hidden
 * @param {function=} props.onDialogClose - function to callback when the close button is pressed.
 *	If not specified, no close button will be shown.
 * @returns {JSX.Element} - A React element representing the toolbar.
 *
 * @example
 *     const OfferAdminPage = (props) => {
 *         const [ isEditorDialogOpen, setIsEditorDialogOpen ] = useState(false)
 *         const [ editedId, setEditedId ] = useState(-1)
 *
 *         const onOfferClick = (id) => {
 *             setEditedId(id)
 *             setIsEditorDialogOpen(true)
 *         }
 *         const onCreateButtonClick = () => {
 *             setEditedId(-1)
 *             setIsEditorDialogOpen(true)
 *         }
 *         const onEditorDialogClose = () => {
 *             setEditedId(-1)
 *             setIsEditorDialogOpen(false)
 *         }
 *
 *         // [...]
 *
 *         return (<>
 *              [...]
 *              <OfferEditorDialog offerId={editedId} isDialogOpen={isEditorDialogOpen} onDialogClose={onEditorDialogClose}/>
 *         </>)
 *     }
 */
const OfferEditorDialog = ({offerId, isDialogOpen, onDialogClose}) => {
	return (<Dialog isOpen={isDialogOpen} onClose={onDialogClose} className='object-editor'>
			<OfferEditor offerId={offerId} onClose={onDialogClose}/>
		</Dialog>)
}

export {OfferEditorDialog, OfferEditor};
