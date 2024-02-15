/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/Header.jsx
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheelchair } from '@fortawesome/free-solid-svg-icons'

import PaletteIcon from './PaletteIcon';
import LoginDialog from './LoginDialog';
import LogoutDialog from './LogoutDialog';
import CreateAccountDialog from './CreateAccountDialog';
import AccessibilityDialog from './AccessibilityDialog';
import PopupMenu from './PopupMenu';
import { AccountContext } from '../AccountContext'

const Header = (props) => {
	const { t } = useTranslation();

	const { account } = useContext(AccountContext);
	const [isAccountMenuVisible, setAccountMenuVisible] = useState(false);
	const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
	const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
	const [isCreateAccountDialogOpen, setIsCreateAccountDialogOpen] = useState(false);
	const [isAccessibilityDialogOpen, setIsAccessibilityDialogOpen] = useState(false);

	const onAccountButtonClick = () => {
		if (account === null)
			setIsLoginDialogOpen(true)
		else
			setAccountMenuVisible(true)
	}

	const onLoginDialogClose = () => {
		setIsLoginDialogOpen(false)
	}

	const onCreateAccount = () => {
		setIsLoginDialogOpen(false)
		setIsCreateAccountDialogOpen(true);
	}

	const onCreateAccountDialogClose = () => {
		setIsCreateAccountDialogOpen(false);
	}

	const onAccessibilityDialogClose = () => {
		setIsAccessibilityDialogOpen(false);
	}

	const onAccessibilityButtonClick = () => {
		setIsAccessibilityDialogOpen(true);
	}

	const onLogoutClick = () => {
		setIsLogoutDialogOpen(true)

	}

	const onLogoutDialogResponse = (confirmation) => {
		if (confirmation) {

		}
		setIsLogoutDialogOpen(false)
	}

	return (<>
		<header>
			<Link className="logo" to="/"> <img src="/logo.svg"/> </Link>
			<span className="title">{t('header_title')}</span>
			<span className="subtitle">{t('header_subtitle')}</span>
			<FontAwesomeIcon className="accessibility-button" icon={faWheelchair} onClick={onAccessibilityButtonClick} size="2x" inverse/>
			<PaletteIcon className="account-button" element="user" button="true" onClick={onAccountButtonClick} />
			{account && <span className="userid">{account.email}</span>}
		</header>
		<PopupMenu isVisible={isAccountMenuVisible} setVisible={setAccountMenuVisible}>
			<div onClick={onLogoutClick}>{t('logout-button')}</div>
		</PopupMenu>
		<CreateAccountDialog isOpen={isCreateAccountDialogOpen} onClose={onCreateAccountDialogClose} /> 
		<AccessibilityDialog isOpen={isAccessibilityDialogOpen} onClose={onAccessibilityDialogClose} /> 
		<LoginDialog isOpen={isLoginDialogOpen} onClose={onLoginDialogClose} onCreateAccount={onCreateAccount} /> 
		<LogoutDialog isOpen={isLogoutDialogOpen} onResponse={onLogoutDialogResponse}/>
	</>)
}

export default Header;
