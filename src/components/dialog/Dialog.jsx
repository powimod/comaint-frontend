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

import { useState, useRef, useEffect } from 'react'

const Dialog = ({isOpen, onClose, className = '',  children}) => {
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
