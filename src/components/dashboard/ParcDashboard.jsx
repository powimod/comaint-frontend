/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * MainDashboard.jsx
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


import ParcUnitBloc from './blocs/ParcUnitBloc'
import ParcSectionBloc from './blocs/ParcSectionBloc'
import ParcEquipmentBloc from './blocs/ParcEquipmentBloc'
import ParcFamilyBloc from './blocs/ParcFamilyBloc'
import ParcTypeBloc from './blocs/ParcTypeBloc'
import NomenclatureBloc from './blocs/NomenclatureBloc'

import DashboardArrow from './DashboardArrow'

const MainDashboard = () => {

	return (<>
		<div className="dashboard parc-dashboard">
			<ParcUnitBloc/>
			<ParcSectionBloc/>
			<ParcEquipmentBloc/>
			<ParcFamilyBloc/>
			<ParcTypeBloc/>

			<NomenclatureBloc/>

			<DashboardArrow className="arrow-equipment-family-type"            id="arrow-family-type"            type="ns"/>
			<DashboardArrow className="arrow-equipment-unit-section"           id="arrow-unit-section"           type="ns"/>
			<DashboardArrow className="arrow-equipment-type-equipment"         id="arrow-type-equipment"         type="nose"/>
			<DashboardArrow className="arrow-equipment-section-equipment"      id="arrow-section-equipment"      type="neso"/>

			<DashboardArrow className="arrow-nomenclature-equipment" id="arrow-nomenclature-equipment" type="nose"/>
		</div>
	</>)
}
export default MainDashboard
