/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/PopupMenu.jsx
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

const PopupMenu = ({isVisible, setVisible, children}) => {

	useEffect( () => {
		if (! isVisible)
			return;
		const popupMenuBox = document.getElementById('popup-menu');
		setTimeout(()=> {
			popupMenuBox.classList.add('menu-box-shown');
		}, 0);
	}, [isVisible]);

	const hidePopupMenu = () => {
		const popupMenuBox = document.getElementById('popup-menu');
		popupMenuBox.addEventListener('transitionend', () => {
			setVisible(false)
		});
		popupMenuBox.classList.remove('menu-box-shown');
	}
	return <>
		{isVisible && <div className="menu-background" onClick={hidePopupMenu}>
			<div className="menu-box" id="popup-menu">
				<div onClick={hidePopupMenu}>X</div>
				{children}
			</div>
		</div>}
	</>
}
export default PopupMenu
