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


import {createSlice} from '@reduxjs/toolkit';

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
		updateDashboard: (state, action) => {
			state.parc.unit         = action.payload.parc.unit
			state.parc.section      = action.payload.parc.section
			state.parc.family       = action.payload.parc.family
			state.parc.type         = action.payload.parc.type
			state.parc.equipment    = action.payload.parc.equipment
			state.stock.unit        = action.payload.stock.unit
			state.stock.section     = action.payload.stock.section
			state.stock.category    = action.payload.stock.category
			state.stock.subcategory = action.payload.stock.subcategory
			state.stock.article     = action.payload.stock.article
			state.common.nomenclature = action.payload.nomenclature
		}
	}
});

export const { updateDashboard } = dashboardSlice.actions;

export const selectParc = state => state.dashboard.parc
export const selectStock = state => state.dashboard.stock
export const selectCommon = state => state.dashboard.common

export default dashboardSlice.reducer;
