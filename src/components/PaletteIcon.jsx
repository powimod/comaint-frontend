/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/PaletteIcon.jsx
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

const iconList = [ 
	'user', 'company', 'unit', 'section', 'equipment', 'article', 'intervention', 'workorder', 'supply' , 'order', 'supplier',
	'category', 'subcategory', 'create', 'delete', 'add', 'remove', 'validate', 'cancel', 'display', 'edit', 'erase'
];

const PaletteIcon = ({element, className = null, border = null, button = null, onClick = null}) => {
	const classNameTab = [ 'palette-icon' ];
	classNameTab.push( 'palette-icon-' + ( iconList.includes(element) ? element : 'unknown' ) );
	if (className != null)
		classNameTab.push( className );
	if (border && border.trim().toLowerCase() === 'true')
		classNameTab.push( 'palette-icon-border' );
	if (button && button.trim().toLowerCase() === 'true')
		classNameTab.push( 'palette-icon-button' );
	className = classNameTab.join(' ');
	return ( <img className={className} src="./icons.png" onClick={onClick}/> )
}

export default PaletteIcon;
