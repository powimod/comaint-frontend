/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/editors/EditorToolbar.jsx
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

import PaletteIcon from '../PaletteIcon';

const MODE_DISPLAY = 0
const MODE_EDIT = 1
const MODE_CREATE = 2

const EditorToolBarModes = {
	display : MODE_DISPLAY,
	edit    : MODE_EDIT,
	create  : MODE_CREATE
}

const ACTION_NONE = 0
const ACTION_CLOSE = 1
const ACTION_DELETE = 2
const ACTION_EDIT_START = 3
const ACTION_EDIT_VALIDATE = 4
const ACTION_EDIT_CANCEL = 5
const ACTION_CREATE_START = 6
const ACTION_CREATE_VALIDATE = 7
const ACTION_CREATE_CANCEL = 8

const EditorToolBarActions = {
	none     : ACTION_NONE,
	close    : ACTION_CLOSE,
	delete   : ACTION_DELETE,
	edit_start      : ACTION_EDIT_START,
	edit_validate   : ACTION_EDIT_VALIDATE,
	edit_cancel     : ACTION_EDIT_CANCEL,
	create_start    : ACTION_CREATE_START,
	create_validate : ACTION_CREATE_VALIDATE,
	create_cancel   : ACTION_CREATE_CANCEL,
}


/**
 *
 * @param {string} title
 * @param {EditorToolBarModes} baseMode - indique le mode de base de l'éditeur entre édition et création
 * @param {function} setMode : fonction rappelée quand l'éditeur passe du mode affichage au mode édition
 * @param {function} setAction : fonction rappelée indiquant le type d'action à prendre en compte (EditorToolBarActions)
 * @param {boolean} canDelete - indique si un bouton de suppression doit être affiché
 * @param {boolean} canClose - indique si un bouton de fermeture (de boîte de dialogue) doit être affiché
 *
 * La propriété 'baseMode' indique quel type d'action la barre représente, à savoir 'create' ou 'edit'
 * Si 'baseMode' vaut 'edit' alors la barre affiche :
 *  - un bouton Edit
 *  - un bouton Delete si la propriété 'canDelete' est à true.
 *  - un bouton Close si la propriété 'canClause' est à true.
 * En cliquant sur le bouton 'edit', tous les boutons sont remplacés par un bouton OK et un bouton Cancel.
 *
 * Si 'baseMode' vaut 'create' alors la barre affiche :
 *  - un bouton Edit
 *  - un bouton Cancel
 *  - un bouton Close si la propriété 'canClause' est à true.
 *
 */

const EditorToolbar = ({title=null, baseMode, setMode, setAction, canDelete=false, canClose=true}) => {
	if (baseMode === undefined)
		throw new Error('baseMode argument is not defined')
	if (setMode === undefined)
		throw new Error('setAction argument is not defined')
	if (setAction === undefined)
		throw new Error('setAction argument is not defined')

	const [ internalMode, setInternalMode ] = useState(MODE_DISPLAY)
	const [ internalAction, setInternalAction ] = useState(ACTION_NONE)

	useEffect( () => {
		setMode(() => internalMode)
	}, [internalMode])

	useEffect( () => {
		setAction(() => internalAction)
		setInternalAction(() => ACTION_NONE)
	}, [internalAction])

	useEffect( () => {
		setInternalMode(() => MODE_DISPLAY)
		setInternalAction(() => ACTION_NONE)
	}, [])

	const onEditButtonClick = () => {
		setInternalMode(MODE_EDIT)
		setInternalAction( ACTION_EDIT_START)
	}
	/*
	const onCreateButtonClick = () => {
		setInternalMode(MODE_CREATE)
		setInternalAction( ACTION_CREATE_START)
	}
	*/
	const onDeleteButtonClick = () => {
		setInternalAction(ACTION_DELETE)
	}

	const onValidateButtonClick = () => {
		setInternalAction( internalMode === MODE_EDIT ? ACTION_EDIT_VALIDATE : ACTION_CREATE_VALIDATE)
		setInternalMode(MODE_DISPLAY)
	}

	const onCancelButtonClick = () => {
		setInternalAction( internalMode === MODE_EDIT ? ACTION_EDIT_CANCEL: ACTION_CREATE_CANCEL)
		setInternalMode(MODE_DISPLAY)
	}

	const onCloseButtonClick = () => {
		setInternalMode(MODE_DISPLAY)
		setInternalAction(ACTION_CLOSE)
	}

	return ( <div className="editor-toolbar">
			{title && <span>{title}</span> }
			{ baseMode === MODE_EDIT } && <>
				{ internalMode === MODE_DISPLAY && <> 
					<PaletteIcon element="edit"   button="true" onClick={onEditButtonClick}/>
					{ canDelete && <PaletteIcon element="delete" button="true" onClick={onDeleteButtonClick}/> }
					{ canClose && <PaletteIcon element="cancel" button="true" onClick={onCloseButtonClick} /> }
				</>}
				{ internalMode === MODE_EDIT && <> 
					<PaletteIcon element="validate" button="true" onClick={onValidateButtonClick}/>
					<PaletteIcon element="cancel"   button="true" onClick={onCancelButtonClick}/>
				</>}
			</>
			{ baseMode === MODE_CREATE } && <>
				<PaletteIcon element="validate" button="true" onClick={onValidateButtonClick}/>
				<PaletteIcon element="cancel"   button="true" onClick={onCancelButtonClick}/>
				{ canClose && <PaletteIcon element="cancel" button="true" onClick={onCloseButtonClick} /> }
			</>
		</div>)
}

export { EditorToolBarModes, EditorToolBarActions}
export default EditorToolbar
