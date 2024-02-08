/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * BubblePopup.jsx
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

import {useState, useRef} from 'react'

const BubblePopup = ({popup}) => {
	return (<>
		{ popup.message !== null && ( <div className='popup'>{popup.message}</div> ) }
		<div>{popup.timeoutId}</div>
	</>);
}

const newBubblePopup = () => {
	const [ _message, _setMessage] = useState(null);
	const _timeoutIdRef = useRef(null);
	return {
		message: _message,
		setMessage: _setMessage,
		timeoutIdRef: _timeoutIdRef
	}
}

const showBubblePopup = (popup, message, tempo = null) => {
	let timeoutId = popup.timeoutIdRef.current;
	if (timeoutId !== null) {
		clearTimeout(timeoutId);
		popup.timeoutIdRef.current = null;
	}
	popup.setMessage(message);	 
	if (tempo != null){
		timeoutId = setTimeout( () => {
			popup.setMessage(null); 
			popup.timeoutIdRef.current = null;
		}, tempo);
		popup.timeoutIdRef.current = timeoutId;
	}
}

const hideBubblePopup = (popup) => {
	showBubblePopup(popup, null);
}

export { newBubblePopup, showBubblePopup, hideBubblePopup };
export default BubblePopup;
