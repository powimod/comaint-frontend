/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * components/PagedList.jsx
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

import { Link } from 'react-router-dom'

const PagedList = ({list, label='name', onItemClick = null}) => {

	const onListItemClick = (ev) => {
		ev.preventDefault()
		const id = ev.target.dataset.id
		if (isNaN(id)) return
		if (onItemClick) onItemClick(id)
	}

	return (<>
		{ list.length === 0 ?
			<div>List is empty</div>
		:
			<ul>
				{ list.map( (element) => 
					<li key={element.id}>
						<Link onClick={onListItemClick} data-id={element.id}>{element[label]}</Link> 
					</li>)
				}
			</ul>
		}
	</>)
}

export default PagedList
