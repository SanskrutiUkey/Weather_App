<<<<<<< HEAD

=======
>>>>>>> 1d7f15bf3f61e8e3b07c1763df535cfd26e1f423

import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/prefStyle.css';
import { useAuth } from '../context/auth';
import axios from 'axios';

const WeatherConditions = [
    'Clear',
    'Cloudy',
    'Rainy',
    'Snowy',
    'Sunny',
    // Add more weather conditions as needed
];

const WeatherList = ({ cities, onDelete, onWeatherSelect, onSave }) => {
    return (
        <div>
            {cities.map((city, index) => (
                <div key={index} className="city-item">
                    <ul className='bg-zinc-700 mb-8 rounded-lg p-2'>
                        <li className='mb-2'>
                            <span className='ml-2 text-xl'>{city.name}</span>
                            <div>
                                {WeatherConditions.map((condition, idx) => (
                                    <label key={idx} className='p-2'>
                                        <input className='mr-1'
                                            type="checkbox"
                                            checked={city.weather.includes(condition)}
                                            onChange={() => onWeatherSelect(city.name, condition)}
                                        />
                                        {condition}
                                    </label>
                                ))}
                            </div>
                            <div>
                                <button className='mr-3 ml-2' onClick={() => onSave(city)}>Save</button>
                                <button onClick={() => onDelete(city.name)}><FaTrash /></button>
                            </div>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

const CityForm = ({ onSubmit, disabled }) => {
    const [city, setCity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(city);
        setCity('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className='mt-6 items-center'
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={disabled}
            />
            <button className='bg-blue-800 rounded-md p-2 text-xl mt-3 mb-3' type="submit" disabled={disabled}>
                Add City
            </button>
        </form>
    );
};

const Pref = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedWeather, setSelectedWeather] = useState([]);
    const [auth, setAuth] = useAuth();

    const addCity = async (cityName) => {
        if (cities.length < 4 && cityName.trim() !== '') {
            setCities([...cities, { name: cityName, weather: selectedWeather }]);

        } else {
            alert('You can add up to 4 cities.');
        }
    };

    const saveCity = async (city) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/cities/create-city/${auth.user._id}`,
                {
                    city: city.name,
                },
                {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );
            console.log(`City ${city.name} saved successfully`);
        }
        catch (error) {
            console.error('Error saving city preference:', error);
        }
        try {
            for (const weatherCondition of city.weather) {
                console.log("auth.user._id ", auth.user._id);
                const response = await axios.post(
                    `${process.env.REACT_APP_API}/api/preferences/create-pref/${auth.user._id}`,
                    {
                        city: city.name,
                        weather: weatherCondition,
                    },
                    {
                        headers: {
                            Authorization: auth.token,
                        },
                    }
                );
                console.log(`Preference for ${city.name} (${weatherCondition}) saved successfully`);
            }
        } catch (error) {
            console.error('Error saving city preference:', error);
        }
    };

    const handleDeleteCity = (cityName) => {
        setCities(cities.filter((city) => city.name !== cityName));
    };

    const handleWeatherSelect = (cityName, weather) => {
        const updatedCities = cities.map((city) => {
            if (city.name === cityName) {
                return {
                    ...city,
                    weather: city.weather.includes(weather)
                        ? city.weather.filter((item) => item !== weather)
                        : [...city.weather, weather],
                };
            }
            return city;
        });
        setCities(updatedCities);
    };

    return (
        <div className='main-user flex'>
            <div>
                <h1 className='text-3xl text-left'>City Weather Preferences</h1>
                <CityForm className='mt-44' onSubmit={addCity} disabled={cities.length >= 4} />
                <WeatherList
                    cities={cities}
                    onDelete={handleDeleteCity}
                    onWeatherSelect={handleWeatherSelect}
                    onSave={saveCity}
                />
            </div>
        </div>
    );
};

export default Pref;