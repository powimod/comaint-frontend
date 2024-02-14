/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * Dialog.js
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
 * @module Dialog
 */

import { useState, useRef, useEffect } from 'react'

/**
 * Display a custom dialog box (with no buttons). Content must be passed as React children.
 * @param {Array} props - the props array
 * @param {boolean} props.isOpen - a boolean which indicates if the dialog box is shown or hidden.
 * @param {function} props.onClose- function called when Escape key is pressed.
 * @param {string} props.className : CSS style to apply.
 * @param {Array.<JSX.Element} props.children - children to insert as content in the dialog box.
 * @returns {JSX.Element} - A React element representing the dialog box.
 *
 * * @example
 * import Dialog from './dialog/Dialog'
 * 
 * const MyComponent = (props) => {
 * 	const [isMyDialogOpen, setMyDialogOpen] = useState(false)
 * 
 * 	const openMyDialog = () => {
 * 		setMyDialogOpen(true)
 * 	}
 * 
 * 	const onMyDialogClose = () => {
 * 		// called when Escape key is pressed (since there is not button in dialog box)
 * 		setMyDialogOpen(false)
 * 	}
 * 
 * 	return (<>
 * 		<button onClick={openMyDialog}>Display dialog</button>
 * 		<Dialog isOpen={isMyDialogOpen} onClose={onMyDialogClose}>
 * 			<div>The custom content of dialog box here</div>
 * 		</Dialog> 
 * 	</>)
 * }

 */ 
const Dialog = ({isOpen, onClose, className = '',  children}) => {

	if (isOpen === undefined)
		throw new Error('Argument [isOpen] is missing')
	if (typeof(isOpen) !== 'boolean')
		throw new Error('Argument [isOpen] is not a boolean')
	if (onClose === undefined)
		throw new Error('Argument [onClose] is missing')
	if (typeof(onClose) !== 'function')
		throw new Error('Argument [onClose] is not a function')
	if (children === undefined)
		throw new Error('Argument [children] is missing')

	const [ isDialogOpen, setDialogOpen ] = useState(isOpen);
	const dialogRef = useRef(null);

	useEffect(() => {
		console.assert(dialogRef !== null);
		if (isDialogOpen)
		{
			dialogRef.current.addEventListener('close', () => {
				onClose()
			});
			dialogRef.current.showModal();
		}
		else {
			dialogRef.current.close();
		}
	}, [isDialogOpen]);

	useEffect(() => {
		setDialogOpen(isOpen);
	}, [isOpen]);

	return (<dialog ref={dialogRef} className={className}>
		{children}
	</dialog>);
}

export default Dialog;
