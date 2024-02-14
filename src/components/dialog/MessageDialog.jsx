/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * MessageDialog.js
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
 * @module MessageDialog
 */

import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react'
import Dialog from './Dialog';

/**
 * Display a message dialog box with an OK button
 * @param {Array} props - the props array
 * @param {boolean} props.isOpen - a boolean which indicates if the dialog box is shown or hidden.
 * @param {function} props.onClose - function called when OK button is pressed.
 * @param {Array.<JSX.Element} props.children - children to insert as content in the dialog box.
 * @returns {JSX.Element} - A React element representing the dialog box.
 *
 * @example
 * import MessageDialog from './dialog/MessageDialog'
 * 
 * const MyComponent = (props) => {
 * 	const [isMyDialogOpen, setMyDialogOpen] = useState(false)
 * 
 * 	const openMyDialog = () => {
 * 		setMyDialogOpen(true)
 * 	}
 * 
 * 	const onMyDialogClose = () => {
 * 		setMyDialogOpen(false)
 * 	}
 * 
 * 	return (<>
 * 		<button onClick={openMyDialog}>Display dialog</button>
 * 		<MessageDialog isOpen={isMyDialogOpen} onClose={onMyDialogClose}>My message here</MessageDialog> 
 * 	</>)
 * }
 */

const MessageDialog = ({isOpen, onClose, children}) => {
	const { t } = useTranslation();

	return (<Dialog isOpen={isOpen} onClose={onClose}>
		<div>{children}</div>
		<div>
			<button onClick={onClose}>{t('OK')}</button>
		</div>
	</Dialog>);
}

export default MessageDialog;
