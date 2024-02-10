/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * containers/UnlockAccount.jsx
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

import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { AccountContext } from '../AccountContext'
import authApi from '../api/auth-api.js'

const UnlockAccount = (props) => {
	const { t } = useTranslation();
	const { account } = useContext(AccountContext)
	const navigate = useNavigate()
	const codeInput = useRef()

	const [ error, setError ] = useState(null);

	useEffect(() => {
		if (account && ! account.accountLocked) {
			console.log('Account is not locked, navigate to home page')
			navigate('/');
		}
	}, [ account ])

	const onSendCodeButtonClick = async () => {
		setError(null);
		try {
			const result = await authApi.sendUnlockAccountValidationCode();
			if (! result.ok) 
				throw new Error(result.error);
			// TODO display a popup to inform mail has been sent
			console.log(result)
		}
		catch (error) {
			setError(error.message ? error.message : error);
		}
	}

	const onValidateCodeButtonClick = async () => {
		setError(null);
		let code = codeInput.current.value
		if (code.length === 0) {
			setError(t('invalid-code-error'));
			return
		}
		if (isNaN(code)) {
			setError(t('invalid-code-error'));
			return
		}
		code = parseInt(code)
		try {
			const result = await authApi.unlockAccount(code);
			if (! result.ok) 
				throw new Error(result.error);
			if (! result.isValid)
				throw new Error(t('invalid-code-error'))
			// TODO display a popup to inform account has been unlocked
			navigate('/');
		}
		catch (error) {
			setError(error.message ? error.message : error);
		}

	}

	return (
		<main>
			<h1>{t('unlock_account.title')}</h1>
			{error !== null && <div className='error-message'>{error}</div>}
			<p>{t('unlock_account.send_code_message')}</p>
			<div><button onClick={onSendCodeButtonClick}>{t('unlock_account.send_code_button')}</button></div>
			<p>{t('unlock_account.validate_code_message')}</p>
			<div><input ref={codeInput} placeholder={t('unlock_account.code')} pattern="[0-9]{5}"></input></div>
			<div><button onClick={onValidateCodeButtonClick}>{t('validate')}</button></div>

		</main>
	)
}

export default UnlockAccount
