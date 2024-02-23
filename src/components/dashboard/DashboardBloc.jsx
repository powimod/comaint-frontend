/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * DashboardBloc.jsx
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

import PaletteIcon from '../PaletteIcon'


const DashboardBloc = ({label, data = null, icon = '', onClick = null, className}) => {
	const { t } = useTranslation();

	const onBlocClick = () => {
		if (onClick) onClick()
	}

	if (label === undefined) label = "dashboard.bloc.unknown"
	className=`dashboard-bloc ${className}`

	let value = '?'
	let valueClass = '' 
	if (data) {
		switch (data.type) {
			case 'counter':
				value = data.count
				valueClass = 'dashboard-bloc-counter' 
				break;
			case 'selector':
			case 'element':
				value = data.label
				break;
			default:
				console.error(`Invalid data type [${data.type}]`);
		}
	}

	return (<span className={className} onClick={onBlocClick}>
			<PaletteIcon element={icon} size="xxs"/>
			<span>{t(label)}</span>
			<div className={valueClass}>{value}</div>
			<button>☰</button>
		</span>)
}

export default DashboardBloc
