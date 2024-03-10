import React, { useState } from "react";
import { motion } from "framer-motion";
import { GoLocation, GoSearch } from "react-icons/go";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "./Api";

// function Inputs({ onSearchChange }) {
// 	const [search, setSearch] = useState(null);

// 	const handleOnchange = (searchData) => {
// 		setSearch(searchData);
// 		onSearchChange(searchData);
// 	};

// 	const loadOptions = (inputValue) => {
// 		return fetch(
// 			`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
// 			geoApiOptions
// 		)
// 			.then((response) => response.json())
// 			.then((response) => {
// 				return {
// 					options: response.data.map((city) => {
// 						return {
// 							value: `${city.latitude} ${city.longitude}`,
// 							label: `${city.name}, ${city.countryCode}`,
// 						};
// 					}),
// 				};
// 			})
// 			.catch((err) => console.error(err));
// 	};
// 	return (
// 		<div className=' flex flex-row'>
// 			<div className=' flex flex-row items-center w-full justify-center  px-2'>
// 				<div className=' flex flex-row space-x-4 items-center'>
// 					<AsyncPaginate
// 						debounceTimeout={600}
// 						onChange={handleOnchange}
// 						loadOptions={loadOptions}
// 						value={search}
// 						type='text'
// 						placeholder='Search for city...'
// 						className=' focus:outline-none  font-light capitalize placeholder:lowercase placeholder:text-[#000000] text-black w-[250px] z-40'
// 					/>
// 					{/* <motion.div whileHover={{ scale: 1.2 }}>
// 						<GoSearch size={20} color='white' className='cursor-pointer' />
// 					</motion.div> */}
// 				</div>

// 				<div className=' flex'>
// 					{/* <motion.div whileHover={{ scale: 1.2 }}>
// 						<GoLocation size={20} color='white' className='cursor-pointer' />
// 					</motion.div> */}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Inputs;


// import React, { useState } from "react";

// function Inputs({ onSearchChange }) {
// 	const [search, setSearch] = useState(null);

// 	const handleOnChange = (searchData) => {
// 		setSearch(searchData);
// 		onSearchChange(searchData);
// 	};

// 	// const loadOptions = async (inputValue) => {
// 	// 	try {
// 	// 		const response = await fetch(
// 	// 			`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
// 	// 			geoApiOptions
// 	// 		);
// 	// 		const data = await response.json();

// 	// 		return {
// 	// 			options: data.data.map((city) => ({
// 	// 				value: `${city.lat} ${city.lon}`,
// 	// 				label: `${city.name}, ${city.country}`,
// 	// 			})),
// 	// 		};
// 	// 	} catch (error) {
// 	// 		console.error(error);
// 	// 		return { options: [] };
// 	// 	}
// 	// };
// 	const loadOptions = (inputValue) => {
// 		return fetch(
// 			`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
// 			geoApiOptions
// 		)
// 			.then((response) => response.json())
// 			.then((response) => {
// 				return {
// 					options: response.data.map((city) => {
// 						return {
// 							value: `${city.latitude} ${city.longitude}`,
// 							label: `${city.name}, ${city.countryCode}`,
// 						};
// 					}),
// 				};
// 			})
// 			.catch((err) => console.error(err));
// 	};

// 	return (
// 		<div className="flex flex-row">
// 			<div className="flex flex-row items-center w-full justify-center px-2">
// 				<div className="flex flex-row space-x-4 items-center">
// 					<AsyncPaginate
// 						debounceTimeout={600}
// 						onChange={handleOnChange}
// 						loadOptions={loadOptions}
// 						value={search}
// 						type="text"
// 						placeholder="Search for city..."
// 						className="focus:outline-none font-light capitalize placeholder-lowercase placeholder-text-[#000000] text-black w-[250px] z-40"
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Inputs;

const Inputs = ({ onSearchChange }) => {
	const [search1, setSearch1] = useState(null);
	const [search2, setSearch2] = useState(null);
	const [search3, setSearch3] = useState(null);
	const [search4, setSearch4] = useState(null);


	const handleOnChange1 = (searchData) => {
		setSearch1(searchData);
		onSearchChange(searchData);
	};

	const handleOnChange2 = (searchData) => {
		setSearch2(searchData);
		onSearchChange(searchData);
	};

	const loadOptions = (inputValue) => {
		return fetch(
			`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
			geoApiOptions
		)
			.then((response) => response.json())
			.then((response) => {
				return {
					options: response.data.map((city) => {
						return {
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name}, ${city.countryCode}`,
						};
					}),
				};
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<div className="flex flex-row">
				<div className="flex flex-row space-x-4 items-center">
					<AsyncPaginate
						debounceTimeout={600}
						onChange={handleOnChange1}
						loadOptions={loadOptions}
						value={search1}
						type="text"
						placeholder="Search for city..."
						className="focus:outline-none font-light capitalize placeholder:lowercase placeholder:text-[#000000] text-black w-[250px] z-40"
					/>
				</div>
			</div>

		</>
	);
};

export default Inputs;

