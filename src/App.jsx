/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * App.js
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

import { useState, useEffect, useContext } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'

import Header from "./components/Header"
import Footer from "./components/Footer"
import { AccountContext } from './AccountContext'
import FlashPopupStack, {newFlashPopupStack} from './components/dialog/FlashPopupStack'; 


function App({children}) {

	const flashPopupStack = newFlashPopupStack()
	const { account } = useContext(AccountContext)
	const [ accountLoaded, setAccountLoaded] = useState(false);
	const navigate = useNavigate()

	useEffect( () => {
		if (accountLoaded)
			navigate('/'); // force navigation to home page on login or logout 
		if (account && account.accountLocked) {
			console.log('Account is locked, navigate to unlock-account page')
			navigate('/unlock-account');
		}
		setAccountLoaded(true); // do not redirect on the first account changed which is due to page loading
	}, [account]);

	useEffect( () => {
		setAccountLoaded(false);
	}, []);

	return (
		<>
			<Header/>
			<Outlet/>
			<Footer/>
			<FlashPopupStack flashPopupStack={flashPopupStack}/> 
		</>
	)
}

export default App
