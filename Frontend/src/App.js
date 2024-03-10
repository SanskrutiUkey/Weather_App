import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import Home from "./pages/Home";
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
