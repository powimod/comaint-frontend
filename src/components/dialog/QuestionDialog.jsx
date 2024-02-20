/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * QuestionDialog.js
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
 * @module QuestionDialog
 */

import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react'
import Dialog from './Dialog';

/**
 * Display a confirmation dialog box with Yes/No buttons
 * @param {Array} props - the props array
 * @param {boolean} props.isOpen - a boolean which indicates if the dialog box is shown or hidden.
 * @param {function} props.onResponse - function called when buttons is pressed. 
 * 	The response is null passed with a response argument which can be a boolean or null :
 * 	it' true if Yes button was pressed and is false if No button pressed.
 * 	It can be null if dialog was presse by pressing the Escape key !
 * @param {string} props.className : CSS style to apply.
 * @param {Array.<JSX.Element} props.children - children to insert as content in the dialog box.
 * @returns {JSX.Element} - A React element representing the dialog box.
 *
 * @example
 * import QuestionDialog from './dialog/QuestionDialog'
 * 
 * const MyComponent = (props) => {
 * 	const [isMyDialogOpen, setMyDialogOpen] = useState(false)
 * 
 * 	const openMyDialog = () => {
 * 		setMyDialogOpen(true)
 * 	}
 * 
 * 	const onMyDialogResponse = (response) => {
 * 		if (response !== null)  {
 * 			if (response === true)
 * 				console.log("Your response is Yes")
 * 			else
 * 				console.log("Your response is No")
 * 		}
 * 		else {
 * 			console.log("Escapke key was pressed to close dialog")
 * 		}
 * 		setMyDialogOpen(false)
 * 	}
 * 
 * 	return (<>
 * 		<button onClick={openMyDialog}>Display dialog</button>
 * 		<QuestionDialog isOpen={isMyDialogOpen} onResponse={onMyDialogResponse}>My question here</QuestionDialog> 
 * 	</>)
 * }
 *
 */
const QuestionDialog = ({isOpen, onResponse, className = '', children}) => {
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

	const dialogResponseRef = useRef(null) // null is returned when escape key is pressed

	useEffect( () => {
		if (isOpen) {
			dialogResponseRef.current = null
		}
	}, [isOpen])

	const onYesResponse = () => {
		dialogResponseRef.current = true
		onDialogClosed()
	}

	const onNoResponse = () => {
		dialogResponseRef.current = false 
		onDialogClosed()
	}

	const onDialogClosed = () => {
		// called by Dialog when Escape key is pressed or when dialog.close is called
		onResponse(dialogResponseRef.current)
		dialogResponseRef.current = null
	}

	className = [ 'confirm-dialog', className ].join(' ').trim()

	return (<Dialog isOpen={isOpen} onClose={onDialogClosed} className={className}>
			<div>{children}</div>
			<div>
				<button onClick={onYesResponse}>{t('button.yes')}</button>
				<button onClick={onNoResponse}>{t('button.no')}</button>
			</div>
		</Dialog>)
}

export default QuestionDialog;
