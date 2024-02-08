/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/CreateAccountDialog.jsx
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

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

import PaletteIcon from './PaletteIcon';
import Dialog from './dialog/Dialog';
import authApi from '../api/auth-api.js'

const CreateAccountDialog = ({isOpen, onClose, onCreateAccount}) => {
	const { t } = useTranslation();

	const [ error, setError ] = useState(null);
	const [ step, setStep ] = useState(1);
	const [ email, setEmail] = useState('');
	const [ password, setPassword] = useState('');
	const [ firstname, setFirstname] = useState('');
	const [ lastname, setLastname] = useState('');
	const [ validationCode, setValidationCode ] = useState('');

	useEffect(() => {
		setStep(1)
		setError(null)
	}, [isOpen])

	const onFirstStepValidateButtonClick = async () => {
		setError(null);
		if (email.length === 0) {
			setError(t('invalid-email-error'));
			return
		}
		if (password.length === 0) {
			setError(t('invalid-password-error'));
			return
		}
		if (firstname.length === 0) {
			setError(t('empty-firstname-error'));
			return
		}
		if (lastname.length === 0) {
			setError(t('empty-lastname-error'));
			return
		}
		try {
			const result = await authApi.register(email, password, firstname, lastname);
			if (! result.ok) {
				setError(result.error);
				return;
			}
			setStep(2);
		}
		catch (error) {
			setError(error);
		}
	}

	const onSecondStepValidateButtonClick = async () => {
		setError(null);
		if (validationCode.length === 0 || isNaN(validationCode)) {
			setError(t('invalid-validation-code-error'));
			return;
		}
		try {
			const result = await authApi.validateRegistration(validationCode);
			if (! result.ok) {
				setError(result.error);
				return;
			}
			onClose();
		} catch (error) {
			setError(error);
		}
	}


	const onPreviousButtonClick = () => {
		setStep(1);
	}

	const onForgetPasswordButtonClick = (ev) => {
		ev.preventDefault()
		console.log('Forget password') // TODO
	}

	const onResendCodedButtonClick = (ev) => {
		ev.preventDefault()
		console.log('Resend code') // TODO
	}

	const onEmailChanged = (ev) => {
		setEmail(ev.target.value.trim())
	}

	const onPasswordChanged = (ev) => {
		setPassword(ev.target.value.trim());
	}

	const onFirstnameChanged = (ev) => {
		setFirstname(ev.target.value.trim());
	}

	const onLastnameChanged = (ev) => {
		setLastname(ev.target.value.trim());
	}

	const onValidationCodeChanged = (ev) => {
		setValidationCode(ev.target.value.trim());
	}

	return (<>
		<Dialog isOpen={isOpen} onClose={onClose} className='create-account-dialog'>
			
			{(step === 1) && <>
				<div>{t('create-account-message')}</div>
				<section>
					<div>{t('create-account-instruction')}</div>
					{error !== null && <div className='error-message'>{error}</div>}
					<div className='input-container'>
						<label htmlFor='email'>{t('email-field')}</label>
						<input name='email' type='text' value={email} onChange={onEmailChanged}/>
					</div>
					<div className='input-container'>
						<label htmlFor='password'>{t('password-field')}</label>
						<input name='password' type='password' value={password} onChange={onPasswordChanged}/>
					</div>
					<div>{t('password-rules')}</div>

					<div className='input-container'>
						<label htmlFor='firstname'>{t('firstname-field')}</label>
						<input name='firstname' type='text' value={firstname} onChange={onFirstnameChanged}/>
					</div>
					<div className='input-container'>
						<label htmlFor='lastname'>{t('lastname-field')}</label>
						<input name='lastname' type='text' value={lastname} onChange={onLastnameChanged}/>
					</div>

					<div className='button-bar-right'>
						<button onClick={onClose}>{t('cancel')}</button>
						<button onClick={onFirstStepValidateButtonClick}>{t('validate')}</button>
					</div>
				</section>
			</>}
			{(step === 2) && <>
				<div>{t('create-account-message')}</div>
				{error !== null && <div className='error-message'>{error}</div>}
				<section>
					<div>{t('ask-code-message')}</div>
					<div>
						<a href='' onClick={onResendCodedButtonClick}>{t('resend-validation-code')}</a>
					</div>
					<div className='input-container'>
						<label htmlFor='validation-code'>{t('validation-code')}</label>
						<input name='validation-code' type='text' value={validationCode} onChange={onValidationCodeChanged}/>
					</div>
					<div className='button-bar'>
						<button onClick={onPreviousButtonClick}>{t('previous')}</button>
						<button onClick={onClose}>{t('cancel')}</button>
						<button onClick={onSecondStepValidateButtonClick}>{t('validate')}</button>
					</div>
				</section>
			</>}

		</Dialog>
	</>)
}

export default CreateAccountDialog;
