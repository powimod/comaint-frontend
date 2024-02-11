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

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import EditorToolbar, {EditorToolBarModes, EditorToolBarActions} from './EditorToolBar'
import Dialog from '../dialog/Dialog'
import offerApi from '../../api/offer-api.js'

const OfferEditor = ({onClose = null}) => {
	const { t } = useTranslation();
	const [editorMode, setEditorMode] = useState(0)
	const [editorAction, setEditorAction] = useState(0)

	useEffect( () => {

		switch (editorAction){
			case EditorToolBarActions.validate:
				console.log("dOm validate " + modeStr)
				break;

			case EditorToolBarActions.create_start:
				console.log("dOm create start")
				break;
			case EditorToolBarActions.create_cancel:
				console.log("dOm create cancel")
				break;
			case EditorToolBarActions.create_validate:
				console.log("dOm create validate")
				break;

			case EditorToolBarActions.edit_start:
				console.log("dOm edit start")
				break;
			case EditorToolBarActions.edit_cancel:
				console.log("dOm edit cancel")
				break;
			case EditorToolBarActions.edit_validate:
				console.log("dOm edit validate")
				break;

			case EditorToolBarActions.delete:
				console.log("dOm delete action")
				onDialogClose()
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
				setMode={setEditorMode}
				setAction={setEditorAction}
				canCreate={false}
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

const OfferEditorDialog = ({offerId, isDialogOpen, onDialogClose}) => {
	return (<Dialog isOpen={isDialogOpen} onClose={onDialogClose} className='object-editor'>
			<OfferEditor onClose={onDialogClose}/>
		</Dialog>)
}

export {OfferEditorDialog, OfferEditor};
