/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * containers/ForgottenPassword.jsx
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

import { DialogContext} from '../components/dialog/DialogContext'
import { AccountContext } from '../AccountContext'
import authApi from '../api/auth-api.js'

const ForgottenPassword = (props) => {
	const { t } = useTranslation();
	const navigate = useNavigate()
	const emailInputRef = useRef()
	const codeInputRef = useRef()
	const newPasswordInputRef = useRef()
	const confirmPasswordInputRef = useRef()
	const [ dialogRequestList, pushDialogRequest ] = useContext(DialogContext)
	const [ email, setEmail] = useState('');

	const [ error, setError ] = useState(null);

	const EMAIL_STORAGE_KEY = 'login-email';

	useEffect( () => {
		const email = localStorage.getItem(EMAIL_STORAGE_KEY);
		if (email !== null)
			setEmail(email)
	}, []);

	useEffect( () => {
		if (email.length === 0) 
			localStorage.removeItem(EMAIL_STORAGE_KEY);
		else 
			localStorage.setItem(EMAIL_STORAGE_KEY, email);
	}, [email]);


	const onEmailChanged = (ev) => {
		setEmail(ev.target.value.trim())
	}

	const onSendCodeButtonClick = async () => {
		setError(null);
		if (email === 0) {
			setError(t('invalid-email-error'));
			return
		}
		try {
			const result = await authApi.sendForgottenPasswordValidationCode(email);
			if (! result.ok) 
				throw new Error(result.error);
			pushDialogRequest({
				type:'flash', message: 
				result.message, 
				duration:3000
			})
			setTimeout( () => { 
				codeInputRef.current.value = ""
				codeInputRef.current.focus()
			}, 0)
		}
		catch (error) {
			setError(error.message ? error.message : error);
		}
	}

	const onValidateCodeButtonClick = async () => {
		setError(null);
		if (email === 0) {
			setError(t('invalid-email-error'));
			return
		}
		let code = codeInputRef.current.value
		if (code.length === 0) {
			setError(t('invalid-code-error'));
			return
		}
		if (isNaN(code)) {
			setError(t('invalid-code-error'));
			return
		}
		code = parseInt(code)

		const newPassword = newPasswordInputRef.current.value.trim()
		if (newPassword.length === 0) {
			setError(t('invalid-password-error'))
			return
		}

		const confirmPassword = confirmPasswordInputRef.current.value.trim()
		if (confirmPassword.length === 0) {
			setError(t('invalid-password-error'))
			return
		}
		if (newPassword != confirmPassword) {
			setError(t('different-password-error'))
			return
		}

		try {
			const result = await authApi.changePassword(email, newPassword, code);
			if (! result.ok) 
				throw new Error(result.error)
			if (! result.changed)
				throw new Error(t('invalid-code-error'))
			console.log('Password changed')
			pushDialogRequest({
				type:'flash', message: 
				t('forgotten_password.password_changed_message'),
				duration:3000
			})
			navigate('/') // TODO Display login dialog
		}
		catch (error) {
			setError(error.message ? error.message : error);
		}

	}

	return (
		<main>
			<h1>{t('forgotten_password.title')}</h1>
			{error !== null && <div className='error-message'>{error}</div>}
			<p>{t('forgotten_password.send_code_message')}</p>
			<div><input ref={emailInputRef} placeholder={t('forgotten_password.email_field')} value={email} onChange={onEmailChanged}/></div>
			<div><button onClick={onSendCodeButtonClick}>{t('forgotten_password.send_code_button')}</button></div>
			<p>{t('forgotten_password.validate_code_message')}</p>
			<div><input ref={codeInputRef} placeholder={t('forgotten_password.code')} pattern="[0-9]{5}"/></div> {/* TODO implement pattern control */}
			<p>{t('forgotten_password.password_input_message')}</p>
			<div><input ref={newPasswordInputRef} type="password" placeholder={t('forgotten_password.new_password_field')}/></div>
			<div><input ref={confirmPasswordInputRef} type="password" placeholder={t('forgotten_password.confirm_password_field')}></input></div>
			<div><button onClick={onValidateCodeButtonClick}>{t('button.validate')}</button></div>
		</main>
	)
}

export default ForgottenPassword
