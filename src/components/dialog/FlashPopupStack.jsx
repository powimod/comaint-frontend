/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * FlashPopupStack.jsx
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

const FlashPopupStack = ({flashPopupStack}) => {
	const onCloseButtonClicked = (popupId) => {
		removeFlashPopupStack(flashPopupStack, popupId);
	}
	return (<div className="popupStack"> {
			flashPopupStack.messageStack.map( (popup) =>  (
				<div key={popup.id}> {
					(popup.tempo !== null) ? popup.message : <>
						<div>{popup.message}</div>
						<div><button onClick={ev => onCloseButtonClicked(popup.id)}>OK</button></div>
					</>
				}</div>
			))
		} </div>);
}

const newFlashPopupStack = () => {
	const [ _messageStack, _setMessageStack] = useState([]);
	const _keyRef = useRef(null);
	return {
		messageStack: _messageStack,
		setMessageStack: _setMessageStack,
		keyRef: _keyRef
	}
}

const flashPopupStackAppend = (flashPopupStack, newMessage, tempo = null) => {
	flashPopupStack.keyRef.current++
	const popupId = flashPopupStack.keyRef.current
	if (tempo !== null) 
		setTimeout( () => {
			removeFlashPopupStack(flashPopupStack, popupId);
		}, tempo);
	flashPopupStack.setMessageStack( (messageStack) => [{ 
		id: popupId, 
		message:newMessage, 
		tempo: tempo
	}, ...messageStack ])
}

const removeFlashPopupStack = (flashPopupStack, popupId) => {
	flashPopupStack.setMessageStack( (messageStack) => messageStack.filter( popup => { return (popup.id !== popupId)} ));	 
}

const flashPopupStackClear = (flashPopupStack) => {
	flashPopupStack.setMessageStack( (messageStack) =>  []);	 
}

export { newFlashPopupStack, flashPopupStackAppend, flashPopupStackClear };
export default FlashPopupStack;
