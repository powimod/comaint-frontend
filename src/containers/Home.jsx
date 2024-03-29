/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * containers/Home.jsx
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

import { useState, useContext, useEffect } from 'react';
import { AccountContext } from '../AccountContext'
import PublicHomePageContent from '../components/PublicHomePageContent'
import PrivateHomePageContent from '../components/PrivateHomePageContent'
import AdminHomePageContent from '../components/AdminHomePageContent'

const Home = (props) => {

	const { account } = useContext(AccountContext);

	return (
		<main>
		{
			(account === null) ?
				<PublicHomePageContent/>
			: 
			(account.administrator) ?
				<AdminHomePageContent/>
			:
				<PrivateHomePageContent/>
		}
		</main>
	)
}

export default Home
