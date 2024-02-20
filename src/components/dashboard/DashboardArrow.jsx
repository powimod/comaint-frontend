/* Comaint Single Page Application frontend (Single page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * DashboardArrow.jsx
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


import { useEffect } from 'react';

const DashboardArrow = ({ type, className, id }) => {

	const drawArrow = () => {
		const svg = document.getElementById(id);
		svg.setAttribute('fill', 'gray');
		svg.setAttribute('stroke', 'black');
		console.assert(svg !== null); 

		const w = svg.clientWidth;
		const h = svg.clientHeight;
		const xm = parseInt(w / 2);
		const ym = parseInt(h / 2);
		const halfPI = Math.PI / 2;

		let m, d, a, xa,ya, xb,yb, xc,yc, dx,dy; 
		let lines = [];
		switch (type) {
			case 'ns': 
				m = 5;
				d = parseInt(m * 1.5);
				xa = m; xb = w - m;
				ya = m; yb = h - m;
				lines.push(xm-d    , yb-2*d );
				lines.push(xm-d    , ya     );
				lines.push(xm+d    , ya     );
				lines.push(xm+d    , yb-2*d );
				lines.push(xm+3*d  , yb-2*d );
				lines.push(xm      , yb     );
				lines.push(xm-3*d  , yb-2*d );
				lines.push(xm-d    , yb-2*d );
				break
			case 'sn': 
				m = 5;
				d = parseInt(m * 1.5);
				xa = m; xb = w - m;
				ya = m; yb = h - m;
				lines.push(xm-d    , ya+2*d );
				lines.push(xm-d    , yb     );
				lines.push(xm+d    , yb     );
				lines.push(xm+d    , ya+2*d );
				lines.push(xm+3*d  , ya+2*d );
				lines.push(xm      , ya     );
				lines.push(xm-3*d  , ya+2*d );
				lines.push(xm-d    , ya+2*d );
				break
			case 'eo': 
				m = 5;
				d = parseInt(m * 1.5);
				xa = m; xb = w - m;
				ya = m; yb = h - m;
				lines.push( xa+2*d , ym-d   );
				lines.push( xb     , ym-d   );
				lines.push( xb     , ym+d   );
				lines.push( xa+2*d , ym+d   );
				lines.push( xa+2*d , ym+3*d );
				lines.push( xa     , ym     );
				lines.push( xa+2*d , ym-3*d );
				lines.push( xa+2*d , ym-d   );
				break
			case 'oe': 
				m = 5;
				d = parseInt(m * 1.5);
				xa = m; xb = w - m;
				ya = m; yb = h - m;
				lines.push( xb-2*d , ym-d   );
				lines.push( xa     , ym-d   );
				lines.push( xa     , ym+d   );
				lines.push( xb-2*d , ym+d   );
				lines.push( xb-2*d , ym+3*d );
				lines.push( xb     , ym     );
				lines.push( xb-2*d , ym-3*d );
				lines.push( xb-2*d , ym-d   );
				break
			case 'neso': 
				m = 10;
				d = parseInt(m * 0.9);
				xb = m;   xa = w - m;
				ya = m;   yb = h - m;
				a = Math.atan( (yb-ya) / (xb-xa) );
				dx = parseInt( d * Math.cos(halfPI - a) )
				dy = parseInt( d * Math.sin(halfPI - a) )
				xc = xb + 3 * dy; // FIXME pourquoi soutraire des Y aux X ?
				yc = yb + 3 * dx;
				lines.push(  xa - dx      ,  ya + dy   );
				lines.push(  xa + dx      ,  ya - dy   );
				lines.push(  xc + dx      ,  yc - dy   );
				lines.push(  xc + 2*dx      ,yc - 2*dy );
				lines.push(  xb           ,  yb        );
				lines.push(  xc - 2*dx      ,yc + 2*dy );
				lines.push(  xc - dx      ,  yc + dy   );
				lines.push(  xa - dx      ,  ya + dy   );
	
				break
			case 'nose': 
				m = 10;
				d = parseInt(m * 0.9);
				xa = m;   xb = w - m;
				ya = m;   yb = h - m;
				a = Math.atan( (yb-ya) / (xb-xa) );
				dx = parseInt( d * Math.cos(halfPI - a) )
				dy = parseInt( d * Math.sin(halfPI - a) )
				xc = xb - 3 * dy; // FIXME pourquoi soutraire des Y aux X ?
				yc = yb - 3 * dx;
				//xc = xa + parseInt((xb - xa) / 2 * 1.3); // fonctionne
				//yc = ya + parseInt((yb - ya) / 2 * 1.3);
				lines.push(  xa - dx      ,  ya + dy   );
				lines.push(  xa + dx      ,  ya - dy   );
				lines.push(  xc + dx      ,  yc - dy   );
				lines.push(  xc + 2*dx      ,yc - 2*dy );
				lines.push(  xb           ,  yb        );
				lines.push(  xc - 2*dx      ,yc + 2*dy );
				lines.push(  xc - dx      ,  yc + dy   );
				lines.push(  xa - dx      ,  ya + dy   );
				break
			default: 
				console.error(`Invalid arrow type ${type}`);
				return;
		}
		if (lines.length > 0){

			let svgPolyLine = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
			svgPolyLine.setAttribute('points', lines.join(','));
			svg.replaceChildren(svgPolyLine);

			// FIXME remove this
/*
			lines = []
			lines.push(  xa  , ya );
			lines.push(  xb  , yb );
			svgPolyLine = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
			svgPolyLine.setAttribute('points', lines.join(','));
			svg.appendChild(svgPolyLine);
			lines = []
			lines.push(  xc + dx  , yc - dy );
			lines.push(  xc - dx ,  yc + dy );
			svgPolyLine = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
			svgPolyLine.setAttribute('points', lines.join(','));
			svg.appendChild(svgPolyLine);
*/
		}

	}

	useEffect( ()=> {
		const svg = document.getElementById(id);
		drawArrow();
		window.addEventListener('resize', drawArrow);
		return () => {
			window.removeEventListener('resize', drawArrow);
		}
	}, [])

	className=`dashboard-arrow ${className}`
	return (<svg id={id} className={className}/>)
}
export default DashboardArrow
