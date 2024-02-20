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


import DashboardBloc from './DashboardBloc'
import DashboardArrow from './DashboardArrow'

const MainDashboard = () => {

	return (<>
		<div className="main-dashboard">
			<DashboardBloc className="bloc-company"      label="dashboard.bloc.company"/>
			<DashboardBloc className="bloc-family"       label="dashboard.bloc.family"/>
			<DashboardBloc className="bloc-type"         label="dashboard.bloc.type"/>
			<DashboardBloc className="bloc-unit"         label="dashboard.bloc.unit"/>
			<DashboardBloc className="bloc-section"      label="dashboard.bloc.section"/>
			<DashboardBloc className="bloc-category"     label="dashboard.bloc.category"/>
			<DashboardBloc className="bloc-subcategory"  label="dashboard.bloc.subcategory"/>
			<DashboardBloc className="bloc-equipment"    label="dashboard.bloc.equipment"/>
			<DashboardBloc className="bloc-nomenclature" label="dashboard.bloc.nomenclature"/>
			<DashboardBloc className="bloc-article"      label="dashboard.bloc.article"/>
			<DashboardArrow className="arrow-company-unit"           id="arrow-company-unit"           type="ns"/>
			<DashboardArrow className="arrow-family-type"            id="arrow-family-type"            type="ns"/>
			<DashboardArrow className="arrow-unit-section"           id="arrow-unit-section"           type="ns"/>
			<DashboardArrow className="arrow-category-subcategory"   id="arrow-category-subcategory"   type="ns"/>
			<DashboardArrow className="arrow-type-equipment"         id="arrow-type-equipment"         type="nose"/>
			<DashboardArrow className="arrow-section-equipment"      id="arrow-section-equipment"      type="neso"/>
			<DashboardArrow className="arrow-section-article"        id="arrow-section-article"        type="nose"/>
			<DashboardArrow className="arrow-subcategory-article"    id="arrow-subcategory-article"    type="neso"/>
			<DashboardArrow className="arrow-nomenclature-equipment" id="arrow-nomenclature-equipment" type="nose"/>
			<DashboardArrow className="arrow-nomenclature-article"   id="arrow-nomenclature-article"   type="neso"/>
		</div>
	</>)
}
export default MainDashboard
