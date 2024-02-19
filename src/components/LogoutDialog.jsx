/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/LogoutDialog.jsx
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

import { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

import authApi from '../api/auth-api.js'

const LogoutDialog = ({isOpen, onResponse}) => {
	const { t } = useTranslation();

	const [ error, setError ] = useState(null);

	const onDialogResponse = async (confirmation) => {
		if (confirmation)  {
			try {
				const result = await authApi.logout();
				if (! result.ok) 
					throw new Error(result.error);
			}
			catch (error) {
				console.error(error);
				setError(error.message !== undefined ? error.message : error);
				return;
			}
		}
		onResponse(confirmation);
	}

	return (<>
		<ConfirmationDialog isOpen={isOpen} onResponse={onDialogResponse}>
			{error !== null && <div className='error-message'>{error}</div>}
			<div>{t('logout-question')}</div>
		</ConfirmationDialog>
	</>)
}

export default LogoutDialog;
