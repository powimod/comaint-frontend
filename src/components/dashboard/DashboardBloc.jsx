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

import { useTranslation } from 'react-i18next';

const DashboardBloc = ({label, className}) => {
	const { t } = useTranslation();

	const onBlocClick = () => {
		console.log("Bloc clicked")
	}

	if (label === undefined) label = "dashboard.bloc.unknown"
	className=`dashboard-bloc ${className}`
	return (<>
		<button className={className} onClick={onBlocClick}>{t(label)}</button>	
	</>)
}
export default DashboardBloc
