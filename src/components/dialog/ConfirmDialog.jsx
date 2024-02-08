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

import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react'
import Dialog from './Dialog';

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
