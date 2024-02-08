/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/Footer.jsx
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

import { useTranslation } from 'react-i18next';
import {useState} from 'react';
import {Link} from 'react-router-dom'

// TODO code cleanup
//import MessageDialog from './dialog/MessageDialog';
//import BubblePopup, {showBubblePopup, newBubblePopup, hideBubblePopup} from './dialog/BubblePopup';
//import FlashPopupStack, {flashPopupStackAppend, newFlashPopupStack, flashPopupStackClear} from './dialog/FlashPopupStack'; 


const Footer = (props) => {
	const { t } = useTranslation();

	//const popup = newBubblePopup()
	//const flashPopupStack = newFlashPopupStack()


	/*
	//const [isContactUsDialogOpen, setContactUsDialogOpen] = useState(false);
	const openContactUsDialog = () => {
		//setContactUsDialogOpen(true);
		//showBubblePopup(popup, 'Contact us by email', 1500);
		//flashPopupStackAppend(flashPopupStack, "Contact us by email");
	}
	const onContactUsDialogClose = () => {
		//setContactUsDialogOpen(false);
		//hideBubblePopup(popup);
	}
	*/

	return (
		<>
		<footer>
			<ul>
				<li> <Link to="/contact-us">{t('contact_us')}</Link>         </li>
				<li> <Link to="/privacy-policy">{t('privacy_policy')}</Link> </li>
				<li> <Link to="/terms-of-use">{t('terms_of_use')}</Link>     </li>
				<li> <Link to="/about">{t('about-link')}</Link>              </li>
			</ul>
			{/* TODO move params [name] and [years] in code generation */}
			<p className="copyright">{t('all_right_reserved', {name: 'Comaint', years: '2023-2024'})}</p>
			<p className="concept"  >{t('product_conception', {name: 'Powimod' })}</p>
		</footer>
		{/* <MessageDialog isOpen={isContactUsDialogOpen} onClose={onContactUsDialogClose}>Contact us by email</MessageDialog> */}
		{/* <BubblePopup popup={popup}/> */}
		{/* <FlashPopupStack flashPopupStack={flashPopupStack}/> */}
		</>
	)
}

export default Footer
