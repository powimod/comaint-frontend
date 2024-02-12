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

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import EditorToolbar, {EditorToolBarModes, EditorToolBarActions} from './EditorToolBar'
import Dialog from '../dialog/Dialog'
import offerApi from '../../api/offer-api.js'

/**
 * Represent a offer editor.
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

	const { t } = useTranslation();
	const [editorMode, setEditorMode] = useState(0)
	const [editorAction, setEditorAction] = useState(0)

	useEffect( () => {

		switch (editorAction){
			case EditorToolBarActions.cancel:
				console.log("dOm cancel")
				if (onClose)
					onClose()
				break;
			case EditorToolBarActions.validate:
				console.log("dOm validate")
				if (onClose)
					onClose()
				break;
			case EditorToolBarActions.delete:
				console.log("dOm delete action")
				if (onClose)
					onClose()
				break;
			case EditorToolBarActions.close:
				if (onClose)
					onClose()
				break;
		}
	}, [ editorAction ])

	return (<>
			<EditorToolbar 
				title="Offer editor toolbar"  
				baseMode={offerId === -1 ? EditorToolBarModes.create : EditorToolBarModes.edit}
				setMode={setEditorMode}
				setAction={setEditorAction}
				canDelete={true}
				canClose={(onClose !== null)}
			/> {/* TODO title translation */}
			<div className="editor-content">
				<div>abc</div>
				<div>cde</div>
				<div>efg</div>
				<div>ghi</div>
			</div>
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
