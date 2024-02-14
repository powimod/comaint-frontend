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

/**
 * @module PaletteIcon
 */

/**
 * Array of possible icon names in the palette.
 * @typedef {string} iconList
 * @property {string} user - display the user icon
 * @property {string} company - display the company icon (alias enterprise)
 * @property {string} unit - display the unit icon (alias (alias building)
 * @property {string} section - display the section icon (part of a unit like a room)
 * @property {string} equipment - display the equipment icon (like a machine)
 * @property {string} article - display the article icon (a machine article)
 * @property {string} intervention - display the intervention (report) icon
 * @property {string} workorder - display the work order icon
 * @property {string} supply - display the supply icon
 * @property {string} order - display the article order icon
 * @property {string} supplier - display the article supplier icon
 * @property {string} category - display the article category icon
 * @property {string} subcategory - display the article subcategory icon
 * @property {string} create - display the create action icon
 * @property {string} delete - display the delete action icon
 * @property {string} add - display the add action icon
 * @property {string} remove - display the remove action icon
 * @property {string} validate - display the validate action icon
 * @property {string} cancel - display the cancel action icon
 * @property {string} display - display the display action icon
 * @property {string} edit - display the edit action icon
 * @property {string} erase - display the erase action icon
 */
const iconList = [ 
	'user', 'company', 'unit', 'section', 'equipment', 'article', 'intervention', 'workorder', 'supply' , 'order', 'supplier',
	'category', 'subcategory', 'create', 'delete', 'add', 'remove', 'validate', 'cancel', 'display', 'edit', 'erase'
];

/**
 * Component to show an icon extracted from the palette icons of the project (file icons.png).
 *
 * @component
 *
 * @param {Object} props - the props object
 * @param {PaletteIcon:iconList} props.element - name of the icon to display 
 * @param {string} props.className - name of a CSS style to apply to the component.
 * @param {boolean} props.border - display a border around the icon by adding the 'palette-icon-border' CSS style.
 * @param {boolean} props.button - display icon a clickage button by adding the 'palette-icon-button' CSS style.
 * @param {function} props.onClick - callback function called when the button is clicked.
 * @returns {JSX.Element} - A React element representing the icon.
 *
 * @example
 *   <PaletteIcon className="my-button-style" element="user" button="true" onClick={()=>console.log('Button clicked')} />
 *
 */
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
	return ( <img className={className} src="/icons.png" onClick={onClick}/> )
}

export default PaletteIcon;
