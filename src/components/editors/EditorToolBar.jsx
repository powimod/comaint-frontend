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

/**
 * @module EditorToolBar
 */

import { useState, useEffect } from 'react'

import PaletteIcon from '../PaletteIcon';

const MODE_DISPLAY = 0
const MODE_EDIT = 1
const MODE_CREATE = 2

/**
 * Enumeration of display modes
 * @typedef {integer} EditorToolBarModes 
 * @property {integer} display : display mode
 * @property {integer} edit : edit mode
 * @property {integer} create : createmode
 */
const EditorToolBarModes = {
	display : MODE_DISPLAY,
	edit    : MODE_EDIT,
	create  : MODE_CREATE
}

const ACTION_NONE = 0
const ACTION_CLOSE = 1
const ACTION_DELETE = 2
const ACTION_VALIDATE = 3
const ACTION_CANCEL = 4

/**
 * Enumeration of editor actions
 * @typedef {integer} EditorToolBarActions 
 * @property {integer} close : close button was pressed 
 * @property {integer} delete : delete button was pressed
 * @property {integer} validate : OK button was pressed
 * @property {integer} cancel : Cancel button was pressed
 */
const EditorToolBarActions = {
	none     : ACTION_NONE,
	close    : ACTION_CLOSE,
	delete   : ACTION_DELETE,
	validate : ACTION_VALIDATE,
	cancel   : ACTION_CANCEL
}


/**
 * <p>La propriété 'baseMode' indique quel type d'action la barre représente, à savoir 'create' ou 'edit'</p>
 *
 * Si 'baseMode' vaut 'edit' alors la barre affiche :
 * <ul>
 * <li>un bouton Edit</li>
 * <li>un bouton Delete si la propriété 'canDelete' est à true.</li>
 * <li>un bouton Close si la propriété 'canClause' est à true.</li>
 * </ul>
 *
 * <p>En cliquant sur le bouton 'edit', tous les boutons sont remplacés par un bouton OK et un bouton Cancel.</p>
 *
 * Si 'baseMode' vaut 'create' alors la barre affiche :
 * <ul>
 * 	<li>un bouton Edit</li>
 * 	<li>un bouton Cancel</li>
 * 	<li>un bouton Close si la propriété 'canClause' est à true.</li>
 * </ul>
 *
 * @summary Represent a toolbar with buttons to edit / create and validate / cancel
 * @component
 * @param {Object} props - the props object.
 * @param {string=} props.title - a title to display on the left (optionnel)
 * @param {EditorToolBarModes} props.baseMode - indique le mode de base de l'éditeur entre édition et création
 * @param {function} props.setMode : function called when the mode changes from 'display' / 'edit'
 * @param {function} props.setAction : function called when an action is selected (EditorToolBarActions)
 * @param {boolean=} props.canDelete - indique si un bouton de suppression doit être affiché
 * @param {boolean=} props.canClose - indique si un bouton de fermeture (de boîte de dialogue) doit être affiché
 *
 * @returns {JSX.Element} - A React element representing the toolbar.
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
		//setInternalAction( ACTION_EDIT_START)
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
		//setInternalAction( internalMode === MODE_EDIT ? ACTION_EDIT_VALIDATE : ACTION_CREATE_VALIDATE)
		setInternalAction(ACTION_VALIDATE)
		setInternalMode(MODE_DISPLAY)
	}

	const onCancelButtonClick = () => {
		//setInternalAction( internalMode === MODE_EDIT ? ACTION_EDIT_CANCEL: ACTION_CREATE_CANCEL)
		setInternalAction(ACTION_CANCEL)
		setInternalMode(MODE_DISPLAY)
	}

	const onCloseButtonClick = () => {
		setInternalMode(MODE_DISPLAY)
		setInternalAction(ACTION_CLOSE)
	}

	return ( <div className="editor-toolbar">
			{ title && <span>{title}</span> }
			{ baseMode === MODE_EDIT && <>
				{ internalMode === MODE_DISPLAY && <> 
					<PaletteIcon element="edit"   button="true" onClick={onEditButtonClick}/>
					{ canDelete && <PaletteIcon element="delete" button="true" onClick={onDeleteButtonClick}/> }
					{ canClose && <PaletteIcon element="cancel" button="true" onClick={onCloseButtonClick} /> }
				</>}
				{ internalMode === MODE_EDIT && <> 
					<PaletteIcon element="validate" button="true" onClick={onValidateButtonClick}/>
					<PaletteIcon element="cancel"   button="true" onClick={onCancelButtonClick}/>
				</>}
			</>}
			{ baseMode === MODE_CREATE && <>
				<PaletteIcon element="validate" button="true" onClick={onValidateButtonClick}/>
				<PaletteIcon element="cancel"   button="true" onClick={onCancelButtonClick}/>
			</>}

		</div>)
}

export { EditorToolBarModes, EditorToolBarActions}
export default EditorToolbar
