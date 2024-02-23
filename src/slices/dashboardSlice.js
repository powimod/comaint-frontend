/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * slices/dashboardSlice.jsx
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

import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	parc : {
		unit: null,
		section: null,
		family: null,
		type: null,
		equipment: null

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
};

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		updateDashboardData: (state, action) => {
			// see slices/dashboardMiddleware.js
		},
		dashboardDataUpdated: (state, action) => {
			const payload = action.payload
			state.parc.unit           = payload.parc.unit
			state.parc.section        = payload.parc.section
			state.parc.family         = payload.parc.family
			state.parc.type           = payload.parc.type
			state.parc.equipment      = payload.parc.equipment
			state.stock.unit          = payload.stock.unit
			state.stock.section       = payload.stock.section
			state.stock.category      = payload.stock.category
			state.stock.subcategory   = payload.stock.subcategory
			state.stock.article       = payload.stock.article
			state.common.nomenclature = payload.common.nomenclature
		}
	}
})

export const { updateDashboardData, dashboardDataUpdated } = dashboardSlice.actions

export const selectParc = state => state.dashboard.parc
export const selectStock = state => state.dashboard.stock
export const selectCommon = state => state.dashboard.common

export default dashboardSlice.reducer
