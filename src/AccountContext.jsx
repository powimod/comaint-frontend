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

/**
 * @module AccountContext
 * Ce module se charge de tenir à jour le context AccountContext pour mettre à disposition les informations sur le compte actuellement
 * connecté.
 *
 * Il initialise ApiTool en lui passant la fonction accountSerializeFunction qui sera rappelée par l'API pour la sérialisation du contexte.
 * Cette fonction reçoit un argument mode qui peut prendre les valeurs 'save', 'load' ou 'clear'.
 * Si le mode vaut 'save', l'identifiant accountId, le token de rafraîchissement et le token d'accès seront sauvegardés dans le localStorage.
 * Si le mode vaut 'load', l'identifiant et le tokens seront chargés à partir du localStorage.
 * Si le mode vaut 'clear', l'identifiant et le tokens seront supprimés du localStorage.
 *
 * Dans ces trois cas, si l'identifiant du compte change alors la route auth/get-context est appelée pour recharger le context de la session.
 * Le contexte account est alors mis à jour et tous les modules qui se sont mis en écoute avec 'useContext' sur ce context sont prévenus.
 *
 */

const AccountContext = createContext(null);


const AccountProvider = ( ({children}) => {
	const [accountId, setAccountId] = useState(null)
        const [account, setAccount] = useState(null)
	const [apiInitError, setApiInitError] = useState(false);

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

	useEffect( () => {
		if (accountId === undefined)
			return;
		console.log("AccountContext reload account ID", accountId)
		asyncReloadAccountContext()
	}, [ accountId ]);



	/**
	 * Fonction qui recharge le contexte à chaque fois que l'ID du compte connecté change.
	 * Elle appelle la route auth/get-context si l'ID du compte n'est pas nul.
	 * Elle met ensuite à jour le context 'account' avec les informations récupérées 
	 * ou le met à null si il n'y pas de compte connecté.
	 */
	const asyncReloadAccountContext = async () => {
		let newAccount = null;
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
				newAaccount = result.context
			}
		}
		console.log('AccountContext - account', newAccount)
		setAccount(newAaccount)
	}

	const reloadAccountContext = async () => {
		console.log('AccountContext - external request to refresh account context')
		asyncReloadAccountContext() 
	}

	/**
	 * Fonction rappelée par l'API pour sérialiser le compte.
	 * Le mode peut valoir 'save', 'load' ou 'clear'.
	 * En fonction du mode, l'ID du compte et les tokens (refresh et access) sont sauvés, chargés ou effacés sur localStorage.
	 * Le state associé à l'identifiant du compte est alors mis à jour : cela provoquera un rechargement du context par appel
	 * à la fonction reloadAccountContext.
	 * Enfin, l'ID du compte et les tokens sont renvoyés à l'API.
	 *
	 * @function
	 * @param {string} mode : mode de sérialisation qui vaut 'save', 'load' ou 'clear'.
	 * @param {number} accountId : identifiant du compte connecté ou null si aucun compte connecté (avec mode='save').
	 * @param {string} refreshToken : token de rafraîchissement à sauvegarder ou null si aucun compte connecté (avec mode='save').
	 * @param {string} accesToken : token d'accès à sauvegarder ou null si aucun compte connecté (avec mode='save').
	 * returns { Array.<accountId , refreshToken, accessToken> } : valeur de l'identifiant du compte et des tokens en mode='load'.
	 */
	function accountSerializeFunction(mode, accountId, refreshToken, accessToken) {
		if (mode === undefined)
			throw new Error('Missing mode parameter in accountSerializeFunction');
		if (mode === 'save' && ( accountId === undefined || refreshToken === undefined || accessToken === undefined) )
			throw new Error('Missing parameters in accountSerializeFunction');
		if (accountId !== undefined && accountId !== null && isNaN(accountId)) 
			throw new Error('Invalid accountId parameter')
		console.log("Account serialize - mode", mode)

		switch (mode) {
			case 'save':
				console.log("Account serialize - accountId", accountId)
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
		console.log("Account serialize - set Account ID =", accountId)
                setAccountId(accountId)
		return [ accountId , refreshToken, accessToken ]
	}

        return(
		// AccountContext does not export a function to change account value 
		// because it's changed internaly
		<AccountContext.Provider value={ { account, reloadAccountContext} }>
                        { apiInitError ? <div>Loading error</div> : children}
                </AccountContext.Provider>
        );
});

export {AccountContext}
export default AccountProvider
