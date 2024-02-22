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

import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useTranslation } from 'react-i18next'

import DashboardBloc from './DashboardBloc'

import ParcUnitBloc from './blocs/ParcUnitBloc'
import ParcSectionBloc from './blocs/ParcSectionBloc'
import ParcEquipmentBloc from './blocs/ParcEquipmentBloc'
import ParcFamilyBloc from './blocs/ParcFamilyBloc'
import ParcTypeBloc from './blocs/ParcTypeBloc'

import StockUnitBloc from './blocs/StockUnitBloc'
import StockSectionBloc from './blocs/StockSectionBloc'
import StockCategoryBloc from './blocs/StockCategoryBloc'
import StockSubcategoryBloc from './blocs/StockSubcategoryBloc'
import StockArticleBloc from './blocs/StockArticleBloc'

import NomenclatureBloc from './blocs/NomenclatureBloc'

import DashboardArrow from './DashboardArrow'
import { selectParc, updateDashboard} from '../../slices/dashboardSlice.js'

const MainDashboard = () => {
	const { t } = useTranslation();

	const dispatch = useDispatch();

	useEffect( () => {
		var newDashboardState = {
			parc : {
				unit: "Garage",
				section: "Garage n°1",
				family: "Voiture",
				type: "Kangoo",
				equipment: "125-XZ-54"
			},
			stock: {
				unit: "Stock",
				section: "Salle B",
				category: "Moteur",
				subcategory: "Joints",
				article: "Joint culasse BRK32",
			},
			nomenclature: 12
		};
		dispatch(updateDashboard(newDashboardState))
	}, [])

	return (<>
		<div className="dashboard main-dashboard">
			<span className="dashboard-label dashboard-label-parc">{t('dashboard.label.parc')}</span>
			<ParcUnitBloc/>
			<ParcSectionBloc/>
			<ParcEquipmentBloc/>
			<ParcFamilyBloc/>
			<ParcTypeBloc/>

			<span className="dashboard-label dashboard-label-stock">{t('dashboard.label.stock')}</span>

			<StockUnitBloc/>
			<StockSectionBloc/>
			<StockArticleBloc/>
			<StockCategoryBloc/>
			<StockSubcategoryBloc/>

			<NomenclatureBloc/>

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
