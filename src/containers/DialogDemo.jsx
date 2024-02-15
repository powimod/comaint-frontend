/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * containers/DialogDemo.jsx
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

import { useState, useContext, useEffect } from 'react'
import { DialogContext} from '../components/dialog/DialogContext'
import MessageDialog from '../components/dialog/MessageDialog'
import ConfirmDialog from '../components/dialog/ConfirmDialog'

const DialogDemo = (props) => {

	const [ dialogRequestList, pushDialogRequest ] = useContext(DialogContext)
 	const [isHealthQuestionDialogOpen, setHealthQuestionDialogOpen] = useState(false)
 	const [isHealthResponseDialogOpen, setHealthResponseDialogOpen] = useState(false)
	const [message, setMessage] = useState("")

	const showPopup = () => {
		const duration = parseInt(500 + Math.random() * 3000)
		pushDialogRequest({type:'flash', message: `message ${Date.now()} (${duration}ms)`, duration:duration})
	}

	const showBlockingPopup = () => {
		pushDialogRequest({type:'flash', message: `message ${Date.now()}`})
	}

	const showBubbleMessage = () =>  {
		const duration = parseInt(500 + Math.random() * 3000)
		pushDialogRequest({type:'bubble.show', message: `message ${Date.now()} (${duration}ms)`, duration: duration})
	}

	const hideBubbleMessage = () =>  {
		pushDialogRequest({type:'bubble.hide'})
	}


	const showHealthQuestionDialog = () => {
 		setHealthQuestionDialogOpen(true)
	}

 	const onHealthQuestionDialogResponse = (response) => {
 		setHealthQuestionDialogOpen(false)
		if (response === null)
			return
		if (response === true)
			setMessage("Fine! it's a good news!")
		else
			setMessage("Oh bad news! it makes me sad...")
 		setHealthResponseDialogOpen(true)
 	}


	const showHealthResponseDialog = () => {
 		setHealthResponseDialogOpen(true)
	}

 	const onHealthResponseDialogClose = () => {
 		setHealthResponseDialogOpen(false)
 	}


	return (
		<main>
			<h1>Dialog demo</h1>
			<div><button onClick={showPopup}>Flash popup</button></div>
			<div><button onClick={showBlockingPopup}>Blocking popup</button></div>
			<div><button onClick={showBubbleMessage}>Show bubble popup</button></div>
			<div><button onClick={hideBubbleMessage}>Hide bubble popup</button></div>
			<div><button onClick={showHealthQuestionDialog}>Show confirmation dialog</button></div>
			<ConfirmDialog isOpen={isHealthQuestionDialogOpen} onResponse={onHealthQuestionDialogResponse}>Are you happy ?</ConfirmDialog> 
			<MessageDialog isOpen={isHealthResponseDialogOpen} onClose={onHealthResponseDialogClose}>{message}</MessageDialog>
		</main>
	)
}

export default DialogDemo
