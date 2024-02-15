/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * ConfirmDialog.js
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
 * @module ConfirmDialog
 */

import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react'
import Dialog from './Dialog';

/**
 * Display a confirmation dialog box with Yes/No buttons
 * @param {Array} props - the props array
 * @param {boolean} props.isOpen - a boolean which indicates if the dialog box is shown or hidden.
 * @param {function} props.onResponse - function called when buttons is pressed. The response is passed a boolean argument.
 * @param {string} props.className : CSS style to apply.
 * @param {Array.<JSX.Element} props.children - children to insert as content in the dialog box.
 * @returns {JSX.Element} - A React element representing the dialog box.
 *
 * @example
 * import ConfirmDialog from './dialog/ConfirmDialog'
 * 
 * const MyComponent = (props) => {
 * 	const [isMyDialogOpen, setMyDialogOpen] = useState(false)
 * 
 * 	const openMyDialog = () => {
 * 		setMyDialogOpen(true)
 * 	}
 * 
 * 	const onMyDialogResponse = () => {
 * 		setMyDialogOpen(false)
 * 	}
 * 
 * 	return (<>
 * 		<button onClick={openMyDialog}>Display dialog</button>
 * 		<ConfirmDialog isOpen={isMyDialogOpen} onResponse={onMyDialogResponse}>My question here</ConfirmDialog> 
 * 	</>)
 * }
 *
 */
const ConfirmDialog = ({isOpen, onResponse, className = '', children}) => {
	if (isOpen === undefined)
		throw new Error('Argument [isOpen] is missing')
	if (typeof(isOpen) !== 'boolean')
		throw new Error('Argument [isOpen] is not a boolean')
	if (onResponse === undefined)
		throw new Error('Argument [onResponse] is missing')
	if (typeof(onResponse) !== 'function')
		throw new Error('Argument [onResponse] is not a function')
	if (children === undefined)
		throw new Error('Argument [children] is missing')

	const { t } = useTranslation();

	const dialogResponseRef = useRef(null)

	/*
	useEffect( () => {
		dialogResponseRef.current = null
	}, [])
	*/

	useEffect( () => {
		if (isOpen) {
			dialogResponseRef.current = null
		}
	}, [isOpen])

	const onConfirm = () => {
		dialogResponseRef.current = true
		onDialogClosed()
	}

	const onCancel = () => {
		dialogResponseRef.current = false 
		onDialogClosed()
	}

	const onDialogClosed = () => {
		// called by Dialog when Escape key is pressed or when dialog.close is called
		onResponse(dialogResponseRef.current)
	}

	className = [ 'confirm-dialog', className ].join(' ').trim()

	return (<Dialog isOpen={isOpen} onClose={onDialogClosed} className={className}>
			<div>{children}</div>
			<div>
				<button onClick={onConfirm}>{t('button.yes')}</button>
				<button onClick={onCancel}>{t('button.no')}</button>
			</div>
		</Dialog>)
}

export default ConfirmDialog;
