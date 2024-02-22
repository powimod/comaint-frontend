/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * slices/dashboardMiddleware.jsx
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

import selectorApi from '../api/selector-api.js'

const dashboardMiddleware = storeAPI => next => action => {
	if (action.type === 'dashboard/updateDashboard') {
		console.log('dOm Calling selector route...')
		selectorApi.query({})
		.then( (result) => {
			console.log('dOm selector route response', result)
			if (! result.ok)
				throw result.error
			next(action)
		})
		.catch( (error) => {
			console.error('Selector.query route error', error.message ? error.message : error)
			next(action)
		})
		return // return without calling the 'next' function
	}
	return next(action)
}

export default dashboardMiddleware 
