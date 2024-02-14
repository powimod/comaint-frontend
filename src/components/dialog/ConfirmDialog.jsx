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
 * 	const onMyDialogClose = () => {
 * 		setMyDialogOpen(false)
 * 	}
 * 
 * 	return (<>
 * 		<button onClick={openMyDialog}>Display dialog</button>
 * 		<ConfirmDialog isOpen={isMyDialogOpen} onResponse={onMyDialogClose}>My question here</ConfirmDialog> 
 * 	</>)
 * }
 */
const ConfirmDialog = ({isOpen, onResponse, children}) => {
	const { t } = useTranslation();

	const onConfirm = () => {
		onResponse(true);
	}
	const onCancel = () => {
		onResponse(false);
	}
	const onDialogClosed = () => {
		onResponse(false); // when escape key is pressed
	}
	return (<Dialog isOpen={isOpen} onClose={onDialogClosed}>
		<div>{children}</div>
		<div>
			<button onClick={onConfirm}>{t('yes')}</button>
			<button onClick={onCancel}>{t('no')}</button>
		</div>
	</Dialog>);
}

export default ConfirmDialog;
