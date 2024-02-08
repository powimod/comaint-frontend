/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * AccountContext.jsx
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

import React, {createContext, useState, useEffect} from 'react'

import ApiToolsSingleton from './api/api-tools'
import authApi from './api/auth-api.js'
import config from '../config.json'

const accountIdStorageKey = 'accountId';
const refreshTokenKey = 'refresh-token';
const accessTokenKey = 'access-token';


const AccountContext = createContext(null);


const AccountProvider = ( ({children}) => {
	const [accountId, setAccountId] = useState(null)
        const [account, setAccount] = useState(null)
	const [apiInitError, setApiInitError] = useState(false);


	const asyncLoadContext = async () => {
		let account = null;
		if (accountId === null) {
			console.log(`AccountContext - reset context  ...`)
		}
		else {
			console.log(`AccountContext - loading context accountId = ${accountId} ...`)
			const result = await authApi.getContext()
			if (! result.ok) {
				console.error(`Can not get account from backend : ${result.error}`);
			}
			else {
				console.log("OK account", result)
				account = result.context
			}
		}
		console.log('AccountContext - account', account)
		setAccount(account)
	}

	useEffect( () => {
		if (accountId === undefined)
			return;
		asyncLoadContext()
	}, [accountId]);


	useEffect( () => {
		// initialize API backend url from config
		try {
			ApiToolsSingleton.getInstance().initialize(config, accountSerializeFunction);
		}
		catch (error) {
			console.error("Error while loading config.js :", error.message);
			setApiInitError(true);
		}
	}, []);

        return(
		// AccountContext does not export a function to change account value 
		// because it's changed internaly
		<AccountContext.Provider value={ { account } }>
                        { apiInitError ? <div>Loading error</div> : children}
                </AccountContext.Provider>
        );

	function accountSerializeFunction(mode, accountId, refreshToken, accessToken) {
		if (mode === undefined)
			throw new Error('Missing mode parameter in accountSerializeFunction');
		if (mode === 'save' && ( accountId === undefined || refreshToken === undefined || accessToken === undefined) )
			throw new Error('Missing parameters in accountSerializeFunction');
		console.log("Account serialize - accountId", accountId)
		if (accountId !== undefined && accountId !== null && isNaN(accountId)) 
			throw new Error('Invalid accountId parameter')
		console.log("Account serialize - mode", mode)

		switch (mode) {
			case 'save':
				if (accountId)
					localStorage.setItem(accountIdStorageKey, accountId);
				else
					localStorage.removeItem(accountIdStorageKey);

				if (refreshToken)
					localStorage.setItem(refreshTokenKey, refreshToken);
				else
					localStorage.removeItem(refreshTokenKey);

				if (accessToken)
					localStorage.setItem(accessTokenKey, accessToken);
				else
					localStorage.removeItem(accessTokenKey);

				break;
			case 'load':
				accountId = localStorage.getItem(accountIdStorageKey);
				if (accountId != null)
					accountId = parseInt(accountId)
				console.log("Account serialize - loaded userID =", accountId)
				refreshToken = localStorage.getItem(refreshTokenKey);
				accessToken = localStorage.getItem(accessTokenKey);
				break;

			case 'clear':
				localStorage.removeItem(accountIdStorageKey);
				localStorage.removeItem(refreshTokenKey);
				localStorage.removeItem(accessTokenKey);
				break;
		}
                setAccountId(accountId)
		return [ accountId , refreshToken, accessToken ]
	}
});

export {AccountContext}
export default AccountProvider
