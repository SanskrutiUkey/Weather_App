import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logowhite, close, menu } from "../assets/images";
import { BiUserCircle } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

const Navbar = () => {

	const navigate = useNavigate()

	return (
		<div>
			<nav className='fixed inset-x-0 bg-[#162854] items-center justify-between py-6 px-16 max-[700px]:px-10 max-[300px]:px-6 z-[200] flex'>
				{/* sidebar bg: #000a18*/}

				<div className=' w-[140px] h-[40px] cursor-pointer max-[490px]:w-[124px] max-[490px]:h-[32px]'>
					<h4 className="text-xl text-cyan-100 italic top-4">Weather App</h4>
				</div>
				<button className="bg-[#ecf0f1] text-black-100 rounded-md p-3" onClick={() => (navigate('/pref'))}>Add Preferences</button>
				<div className=' flex items-center space-x-8  max-[750px]:space-x-0'>
					<span className='flex flex-row w-1/4 items-center justify-center space-x-2 max-[750px]:hidden'>
						<button name='metric' className=' text-xl text-white font-light'>
							&deg;C
						</button>
						<p className='text-white text-xl mx-1'> |</p>
						<button name='imperial' className=' text-xl text-white font-light'>
							&deg;F
						</button>
					</span>

					<BiUserCircle
						size={30}
						color='white'
						className='ml-2'
					/>

				</div>
			</nav>

		</div>
	);
};

export default Navbar;
