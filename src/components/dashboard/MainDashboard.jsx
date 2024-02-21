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
import { useTranslation } from 'react-i18next';

const MainDashboard = () => {
	const { t } = useTranslation();

	return (<>
		<div className="dashboard main-dashboard">
			<span className="dashboard-label dashboard-label-parc">{t('dashboard.label.parc')}</span>
			<DashboardBloc className="bloc-equipment-unit"      label="dashboard.bloc.unit"/>
			<DashboardBloc className="bloc-equipment-section"   label="dashboard.bloc.section"/>
			<DashboardBloc className="bloc-equipment-family"    label="dashboard.bloc.family"/>
			<DashboardBloc className="bloc-equipment-type"      label="dashboard.bloc.type"/>
			<DashboardBloc className="bloc-equipment"           label="dashboard.bloc.equipment"/>

			<span className="dashboard-label dashboard-label-stock">{t('dashboard.label.stock')}</span>
			<DashboardBloc className="bloc-article-unit"        label="dashboard.bloc.unit"/>
			<DashboardBloc className="bloc-article-section"     label="dashboard.bloc.section"/>
			<DashboardBloc className="bloc-article-category"    label="dashboard.bloc.category"/>
			<DashboardBloc className="bloc-article-subcategory" label="dashboard.bloc.subcategory"/>
			<DashboardBloc className="bloc-article"             label="dashboard.bloc.article"/>

			<DashboardBloc className="bloc-nomenclature" label="dashboard.bloc.nomenclature"/>

			<DashboardArrow className="arrow-equipment-unit-section"       id="arrow-unit-section"         type="ns"/>
			<DashboardArrow className="arrow-equipment-section-equipment"  id="arrow-section-equipment"    type="neso"/>
			<DashboardArrow className="arrow-equipment-family-type"        id="arrow-family-type"          type="ns"/>
			<DashboardArrow className="arrow-equipment-type-equipment"     id="arrow-type-equipment"       type="nose"/>

			<DashboardArrow className="arrow-article-unit-section"         id="arrow-unit-section"         type="ns"/>
			<DashboardArrow className="arrow-article-section-article"      id="arrow-section-article"      type="neso"/>
			<DashboardArrow className="arrow-article-category-subcategory" id="arrow-category-subcategory" type="ns"/>
			<DashboardArrow className="arrow-article-subcategory-article"  id="arrow-subcategory-article"  type="nose"/>

			<DashboardArrow className="arrow-nomenclature-equipment" id="arrow-nomenclature-equipment" type="nose"/>
			<DashboardArrow className="arrow-nomenclature-article"   id="arrow-nomenclature-article"   type="neso"/>
		</div>
	</>)
}
export default MainDashboard
