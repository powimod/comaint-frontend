/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * slices/store.jsx
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


import { configureStore } from '@reduxjs/toolkit'

import dashboardReducer from "./dashboardSlice"
import dashboardMiddleware from './dashboardMiddleware'

const store = configureStore({
	reducer: {
		dashboard: dashboardReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dashboardMiddleware)
})

export default store
