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
	if (action.type === 'dashboard/updateDashboardData') {
		// TODO issue-34 get current selectors from store
		const selectors = {
			'parc-type': 5
		}
		selectorApi.query(selectors)
		.then( (result) => {
			if (! result.ok)
				throw result.error

			const newDashboardState = {
				parc : {
					unit: null,
					section: null,
					family: null,
					type: null,
					equipment: null,
				},
				stock: {
					unit: null,
					section: null,
					category: null,
					subcategory: null,
					article: null,
				},
				common: {
					nomenclature: null
				}
			}

			for (var entry of result.results) {
				switch (entry.name) {
					case 'parc-section':
						newDashboardState.parc.section = entry
						break;
					case 'parc-unit':
						newDashboardState.parc.unit = entry
						break;
					case 'parc-family':
						newDashboardState.parc.family = entry
						break;
					case 'parc-type':
						newDashboardState.parc.type = entry
						break;
					case 'parc-equipment':
						newDashboardState.parc.equipment = entry
						break;
					case 'stock-section':
						newDashboardState.stock.section = entry
						break;
					case 'stock-unit':
						newDashboardState.stock.unit = entry
						break;
					case 'stock-category':
						newDashboardState.stock.category = entry
						break;
					case 'stock-subcategory':
						newDashboardState.stock.subcategory = entry
						break;
					case 'stock-article':
						newDashboardState.stock.article = entry
						break;
					case 'nomenclature':
						newDashboardState.common.nomenclature = entry
						break;
				}
			}
			storeAPI.dispatch({ type: 'dashboard/dashboardDataUpdated', payload: newDashboardState })
			next(action)
		})
		.catch( (error) => {
			console.error('Selector.query route error', error.message ? error.message : error)
			// TODO issue-34 : calling dispatch with empty results ?
			next(action)
		})
		return // return without calling the 'next' function
	}
	return next(action)
}

export default dashboardMiddleware 
