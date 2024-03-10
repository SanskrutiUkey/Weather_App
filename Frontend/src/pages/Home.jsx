import React, { useState, useEffect } from "react";
import {
	Inputs,
	TemperatureAndDetails,
} from "../components";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../components/Api";
import { useAuth } from "../context/auth";
import axios from 'axios';

const Home = () => {
	const [currentWeather1, setCurrentWeather1] = useState(null);
	const [currentWeather2, setCurrentWeather2] = useState(null);
	const [currentWeather3, setCurrentWeather3] = useState(null);
	const [currentWeather4, setCurrentWeather4] = useState(null);
	const [auth, setAuth] = useAuth();
	const [cities, setCities] = useState([]);


	const fetchCities = async () => {
		try {
			if (auth.user) {
				const response = await axios.get(`http://localhost:8080/api/cities/get-cities/${auth.user._id}`, {
					headers: {
						Authorization: auth.token,
					},
				});
				setCities(response.data.getAllCity.map(cityData => cityData.city));
				// console.log("Ajdk: ", auth.user);
			} else {
				console.error('User information not available.');
			}

			// console.log(cities);
			// Now you can use the cities array here
		} catch (error) {
			console.error('Error fetching cities:', error);
		}
	};

	useEffect(() => {
		if (auth.user !== null) {
			fetchCities();
		}
	}, [auth.user]);

	const handleOnSearchChange1 = (searchData) => {

		let cityName = encodeURIComponent(searchData.label);


		fetch(`${WEATHER_API_URL}?Key=${WEATHER_API_KEY}&q=${cityName}`)
			.then((response) => response.json())
			.then((weatherData) => {
				setCurrentWeather1(weatherData);
			})
			.catch((error) => {
				console.error("Error fetching weather data:", error);
			});
	};
	const handleOnSearchChange2 = (searchData) => {

		let cityName = encodeURIComponent(searchData.label);

		fetch(`${WEATHER_API_URL}?Key=${WEATHER_API_KEY}&q=${cityName}`)
			.then((response) => response.json())
			.then((weatherData) => {
				setCurrentWeather2(weatherData);
			})
			.catch((error) => {
				console.error("Error fetching weather data:", error);
			});
	};
	const handleOnSearchChange3 = (searchData) => {

		let cityName = encodeURIComponent(searchData.label);


		fetch(`${WEATHER_API_URL}?Key=${WEATHER_API_KEY}&q=${cityName}`)
			.then((response) => response.json())
			.then((weatherData) => {
				setCurrentWeather3(weatherData);
			})
			.catch((error) => {
				console.error("Error fetching weather data:", error);
			});
	};
	const handleOnSearchChange4 = (searchData) => {

		let cityName = encodeURIComponent(searchData.label);


		fetch(`${WEATHER_API_URL}?Key=${WEATHER_API_KEY}&q=${cityName}`)
			.then((response) => response.json())
			.then((weatherData) => {
				setCurrentWeather4(weatherData);
			})
			.catch((error) => {
				console.error("Error fetching weather data:", error);
			});
	};

	return (

		<div className="bg-[#000a18] text-blue-100 py-40 px-24 max-[734px]:px-0 justify-center flex">
			<h3 className="text-cyan-50 ">Serach weather of you favorite cities here ...</h3>
			<div className="grid grid-cols-2 gap-3">
				{/* First Row */}
				<div className="col-span-2 md:col-span-1">
					<div className="bg-gradient-to-b from-[#15bff7] to-[#1068f3] h-[560px] weather_box shadow-[0_35px_60px_-15px_rgba(0,205,231,0.3)] mb-10 w-full">
						<Inputs onSearchChange={handleOnSearchChange1} />
						{currentWeather1 && <TemperatureAndDetails data={currentWeather1} />}
					</div>
				</div>
				{/* Second Row */}
				<div className="col-span-2 md:col-span-1">
					<div className="bg-gradient-to-b from-[#15bff7] to-[#1068f3] h-[560px] weather_box shadow-[0_35px_60px_-15px_rgba(0,205,231,0.3)] mb-10 w-full">
						<Inputs onSearchChange={handleOnSearchChange2} />
						{currentWeather2 && <TemperatureAndDetails data={currentWeather2} />}
					</div>
				</div>
				{/* Third Row */}
				<div className="col-span-2 md:col-span-1">
					<div className="bg-gradient-to-b from-[#15bff7] to-[#1068f3] h-[560px] weather_box shadow-[0_35px_60px_-15px_rgba(0,205,231,0.3)] mb-10 w-full">
						<Inputs onSearchChange={handleOnSearchChange3} />
						{currentWeather3 && <TemperatureAndDetails data={currentWeather3} />}
					</div>
				</div>
				<div className="col-span-2 md:col-span-1">
					<div className="bg-gradient-to-b from-[#15bff7] to-[#1068f3] h-[560px] weather_box shadow-[0_35px_60px_-15px_rgba(0,205,231,0.3)] mb-10 w-full">
						<Inputs onSearchChange={handleOnSearchChange4} />
						{currentWeather4 && <TemperatureAndDetails data={currentWeather4} />}
					</div>
				</div>
			</div>
		</div>
	);

};

export default Home;


