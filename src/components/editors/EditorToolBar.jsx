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

const MODE_NONE = 0
const MODE_DISPLAY = 1
const MODE_EDIT = 2
const MODE_CREATE = 3

/**
 * Enumeration of display modes
 * @typedef {integer} EditorToolBarModes 
 * @property {integer} display : display mode
 * @property {integer} edit : edit mode
 * @property {integer} create : createmode
 */
const EditorToolBarModes = {
	none:     MODE_NONE, /* when dialog which contains the toolbar is hidden */
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
 * @summary Represent a toolbar with buttons depending on the current mode (edit/create/display)
 *
 * In Display mode, the toolbar displays :
 * <ul>
 * <li>An Edit button</li>
 * <li>Eventually a Delete button if the 'canDelete' property is true.</li>
 * <li>Eventually a Close button if the property 'canClose' is true.</li>
 * </ul>
 *
 * <p>When the Edit button is pressed, editor switches in Edit mode and these buttons are replaced by OK/Cancel buttons.</p>
 * <p>When the Delete button is pressed, setAction is called with [EditorToolBarActions.delete] as argument.
 * <p>When the Close button is pressed, setAction is called with [EditorToolBarActions.close] as argument.
 *
 *
 * In Edit mode, the toolbar displays :
 * <ul>
 * 	<li>A Validate button</li>
 * 	<li>A Cancel button</li>
 * </ul>
 *
 * <p>When the Validate button is pressed, setAction is called with [EditorToolBarActions.validate] as argument and 
 * the editor switches in Display mode showing the Edit/Delete/Close buttons.</p>
 *
 * <p>When the Cancel button is pressed, setAction is called with [EditorToolBarActions.cancel] and the editor switches in Display mode.</p>
 *
 * In Create mode, the toolbar displays :
 * <ul>
 * 	<li>A Validate button</li>
 * 	<li>A Cancel button</li>
 * </ul>
 *
 * <p>When the Validate button is pressed, setAction is called with [EditorToolBarActions.validate] as argument and 
 * the editor switches in Display mode showing the Edit/Delete/Close buttons.</p>
 *
 * <p>When the Cancel button is pressed, setAction is closed with the (EditorToolBarActions.cancel) :
 * The called function should close the dialog editor. </p>
 *
 *
 * @component
 * @param {Object} props - the props object.
 * @param {string=} props.title - a title to display on the left (optionnel)
 * @param {EditorToolBarModes} props.mode - indique le mode de base de l'éditeur entre édition et création
 * @param {function} props.setMode : function called when the mode changes from 'display' / 'edit'
 * @param {function} props.setAction : function called when an action is selected (EditorToolBarActions)
 * @param {boolean=} props.canDelete - indique si un bouton de suppression doit être affiché
 * @param {boolean=} props.canClose - indique si un bouton de fermeture (de boîte de dialogue) doit être affiché
 *
 * @returns {JSX.Element} - A React element representing the toolbar.
 */

const EditorToolbar = ({title=null, mode, setMode, setAction, canDelete=false, canClose=true}) => {
	if (mode === undefined)
		throw new Error('Mode argument is not defined')
	if (setMode === undefined)
		throw new Error('setAction argument is not defined')
	if (setAction === undefined)
		throw new Error('setAction argument is not defined')

	const [ internalAction, setInternalAction ] = useState(ACTION_NONE)

	useEffect( () => {
		setMode(mode)
	}, [mode])

	useEffect( () => {
		setAction(() => internalAction)
		setInternalAction(() => ACTION_NONE)
	}, [internalAction])

	useEffect( () => {
		setMode(() => MODE_DISPLAY)
		setInternalAction(() => ACTION_NONE)
	}, [])

	const onEditButtonClick = () => {
		setMode(MODE_EDIT)
	}

	const onDeleteButtonClick = () => {
		setInternalAction(ACTION_DELETE)
	}

	const onValidateButtonClick = () => {
		setInternalAction(ACTION_VALIDATE)
		setMode(MODE_DISPLAY)
	}

	const onCancelButtonClick = () => {
		setInternalAction(ACTION_CANCEL)
		setMode(MODE_DISPLAY)
	}

	const onCloseButtonClick = () => {
		setMode(MODE_DISPLAY)
		setInternalAction(ACTION_CLOSE)
	}

	return ( <div className="editor-toolbar">
			{ title && <span>{title}</span> }
			{ mode === MODE_DISPLAY && <> 
				<PaletteIcon element="edit"   button="true" onClick={onEditButtonClick}/>
				{ canDelete && <PaletteIcon element="delete" button="true" onClick={onDeleteButtonClick}/> }
				{ canClose && <PaletteIcon element="cancel" button="true" onClick={onCloseButtonClick} /> }
			</>}
			{ mode === MODE_EDIT && <> 
				<PaletteIcon element="validate" button="true" onClick={onValidateButtonClick}/>
				<PaletteIcon element="cancel"   button="true" onClick={onCancelButtonClick}/>
			</>}
			{ mode === MODE_CREATE && <>
				<PaletteIcon element="validate" button="true" onClick={onValidateButtonClick}/>
				<PaletteIcon element="cancel"   button="true" onClick={onCancelButtonClick}/>
			</>}

		</div>)
}

export { EditorToolBarModes, EditorToolBarActions}
export default EditorToolbar
