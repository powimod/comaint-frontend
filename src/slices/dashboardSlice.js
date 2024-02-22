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
	nomenclature: null
};

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		updateDashboard: (state, action) => {
			console.log(action)
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
			state.nomenclature      = action.payload.nomenclature
		}
	}
});

export const { updateDashboard } = dashboardSlice.actions;

export const selectParc = state => state.dashboard.parc
export const selectStock = state => state.dashboard.stock
export const selectNomenclature = state => state.nomenclature

export default dashboardSlice.reducer;
