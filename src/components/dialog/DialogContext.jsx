/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * DialogContext.jsx
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

import { createContext, useReducer } from 'react'
//import FlashPopupStack, {flashPopupStackAppend, newFlashPopupStack, flashPopupStackClear} from './components/dialog/FlashPopupStack'; 

const DialogContext = createContext([]);

const dialogReducer = (requestList, newRequest) => {

	switch (newRequest.type) {
		case 'flash':
			const flashMessage = (newRequest.message) ? newRequest.message : '???'
			const flashDuration = (newRequest.duration) ? newRequest.duration : null
			const flashRequest = {
				id: Date.now(),
				type: 'flash',
				message: flashMessage,
				duration: flashDuration
			}
			return [ ...requestList, flashRequest ]

		case 'bubble.show':
			const bubbleMessage = (newRequest.message) ? newRequest.message : '???'
			const bubbleDuration = (newRequest.duration) ? newRequest.duration : 2000
			const showBubbleRequest = {
				id: Date.now(),
				type: 'bubble.show',
				message: bubbleMessage,
				duration: bubbleDuration
			}
			return [ ...requestList, showBubbleRequest ]

		case 'bubble.hide':
			const hideBubbleRequest = {
				id: Date.now(),
				type: 'bubble.hide'
			}
			return [ ...requestList, hideBubbleRequest ]


		case 'acquit':
			const id = newRequest.id
			return requestList.filter( request => request.id !== id)

		default:
			return requestList
	}
}

const DialogProvider = ({children}) => {
	const [dialogRequestList, newDialogRequest] = useReducer(dialogReducer, [])

        return(
		<DialogContext.Provider value={ [ dialogRequestList, newDialogRequest ] }>
			{children}
                </DialogContext.Provider>
        )
}

export { DialogContext }
export default DialogProvider

