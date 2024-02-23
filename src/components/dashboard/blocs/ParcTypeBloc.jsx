/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * ParcTypeBloc.jsx
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

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import DashboardBloc from '../DashboardBloc'
import { selectParc } from '../../../slices/dashboardSlice.js'

const ParcTypeBloc = () => {
	const { t } = useTranslation();
	const parcState = useSelector(selectParc)
	const [ blocValue, setBlocValue ] = useState(null)

	const onBlocClick = () => {
		console.log("Parc type bloc clicked")
	}

	useEffect( () => {
		const data = parcState.type
		let value = ''
		if (data && data.value) value = data.value
		setBlocValue(value)
	}, [ parcState ])

	return <DashboardBloc 
		className="bloc-equipment-type" 
		label="dashboard.bloc.type"
		icon="type" 
		value={blocValue} 
		onClick={onBlocClick} /> 
}

export default ParcTypeBloc
