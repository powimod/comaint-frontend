/* Comaint Multi Page Application frontend (Multi page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * main.jsx
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

import React, { Suspense } from "react"
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLoaderData, useParams } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './slices/store'

import createRouter from './router'
import AccountContext from './AccountContext'
import DialogProvider from './components/dialog/DialogContext'; 

import './i18n'
import './scss/main.scss'

function main() {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<Provider store={store}>
				<Suspense fallback={<div>Loading...</div>}>
					<AccountContext>
					<DialogProvider>
						<RouterProvider router={createRouter()} />
					</DialogProvider>
					</AccountContext>
				</Suspense>
			</Provider>
		</React.StrictMode>
	)
}

main();
