/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * PanelSwitcher.jsx
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


import { useRef, useState, useEffect } from 'react'

const Panel = ({isVisible, children}) => {
	return ( <div className='panel' style={{ visibility : isVisible ? '' : 'hidden' }}>
			{children}
		</div>
	)
}

const PanelSwitcher = ({children}) => {

	const panelSwitcher = useRef()
	const [panelIndex, setPanelIndex] = useState(0)

	const displayPanel = (panelIndex) => {
		setPanelIndex(panelIndex)
	}
	
	return (<div ref={panelSwitcher} className='panel-switcher'>
		<div> 
			{children.map( (panel, index) => 
					<span key={index} 
						className={ 'panel-label' + ((index === panelIndex) ? ' panel-label-selected' : '')  }
						onClick={()=>{displayPanel(index)}}
					>
							{panel.props.label}
					</span>) }
			<span className="panel-filler"/>
		</div>
		<div className="panel-container">
			{ children.map( (child, index) => <Panel key={index} isVisible={index === panelIndex}>{child}</Panel> ) }
		</div>
	</div>)
}

export default PanelSwitcher;
