/* Comaint Multi Page Application frontend (Multi page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * router.jsx
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

import { createBrowserRouter } from "react-router-dom";

import App from './App'
import ErrorPage from './containers/ErrorPage.jsx'
import Home from "./containers/Home"
import ContactUs from "./containers/ContactUs"
import PrivacyPolicy from "./containers/PrivacyPolicy"
import TermsOfUse from "./containers/TermsOfUse"
import About, {loader as aboutLoader} from "./containers/About"

const createRouter = () => {
	return createBrowserRouter([
		{
			path: "/",
			element: <App/>,
			errorElement: <ErrorPage />,
			children: [
				{ index:true,              element:<Home/> },
				{ path: '/contact-us',     element:<ContactUs/> },
				{ path: '/privacy-policy', element:<PrivacyPolicy/> },
				{ path: '/terms-of-use',   element:<TermsOfUse/> },
				{
					path: '/about',
					element:<About/>,
					loader: aboutLoader
				},
			]
		}
	]);
}

export default createRouter
