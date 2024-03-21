import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from "./components";
import Home from "./Home";
import AuthUser from "./components/LoginRegister";
import Pref from "./components/Pref";

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<AuthUser />} />
			</Routes>
			<Navbar />
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/pref" element={<Pref />} />

			</Routes>
		</>
	);
}

export default App;

