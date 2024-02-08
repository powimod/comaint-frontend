/* Comaint Multi Page Application frontend (Multi page application frontend of Comaint project)
 * Copyright (C) 2023-2024 Dominique Parisot
 *
 * i18n.js
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


import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
.use(Backend)
.use(initReactI18next)
.use(LanguageDetector)
.init({
	fallbackLng: "en",
	detection: {
		order: [ 'localStorage', 'cookie', 'navigator'],
		caches: [ 'localStorage', 'cookie']
	}

});

export default i18n;
