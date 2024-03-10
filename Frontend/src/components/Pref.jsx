// import React, { useState } from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import '../styles/prefStyle.css';
// import { useAuth } from '../context/auth';
// import axios from 'axios';


// const WeatherConditions = [
//     'Clear',
//     'Cloudy',
//     'Rainy',
//     'Snowy',
//     'Sunny',
//     // Add more weather conditions as needed
// ];


// const WeatherList = ({ cities, onDelete, onWeatherSelect }) => {
//     return (
//         <div>
//             {cities.map((city, index) => (

//                 <ul>
//                     <div key={index} className="city-item">
//                         <li className='bg-zinc-700 mb-8 rounded-lg p-2'>
//                             <span className='ml-2 text-xl mb-2'>{city.name}</span>
//                             <div className='mb-1'>
//                                 {WeatherConditions.map((condition, idx) => (
//                                     <label key={idx} className='p-2'>
//                                         <input className='mr-1'
//                                             type="checkbox"
//                                             checked={city.weather.includes(condition)} // Check if the weather condition is selected for this city
//                                             onChange={() => onWeatherSelect(city.name, condition)}
//                                         />
//                                         {condition}
//                                     </label>
//                                 ))}
//                             </div>
//                             <button className='mr-6 ml-3'><FaEdit /></button>

//                             <button onClick={() => onDelete(city.name)}><FaTrash /></button>
//                         </li>
//                     </div>
//                 </ul>
//             ))}
//         </div>
//     );
// };

// const CityForm = ({ onSubmit, disabled }) => {
//     const [city, setCity] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await onSubmit(city);
//         setCity('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Enter city name"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 disabled={disabled}
//             />
//             <button type="submit" disabled={disabled}>
//                 Add City
//             </button>
//         </form>
//     );
// };

// const Pref = () => {
//     const [cities, setCities] = useState([]);
//     const [selectedCity, setSelectedCity] = useState('');
//     const [selectedWeather, setSelectedWeather] = useState([]);
//     const [auth, setAuth] = useAuth();
//     // const [weatherConditions, setWeatherConditions] = useState([]);

//     // Function to handle adding a city
//     const handleAddCity = async (city) => {
//         let id = auth.user._id;
//         if (cities.length < 4) {
//             setCities([...cities, { name: city, weather: selectedWeather }]);
//             if (selectedWeather.length === 0) {
//                 console.error('Please select at least one weather condition.');
//                 return;
//             }
//             selectedWeather.forEach(async (weatherCondition) => {
//                 try {
//                     const userId = id;

//                     // Send request to backend to create preference
//                     const response = await axios.post(
//                         `${process.env.REACT_APP_API}/api/preferences/create-pref/${userId}`,
//                         {
//                             city,
//                             weather: weatherCondition,
//                         },
//                         {
//                             headers: {
//                                 Authorization: auth.token,
//                             },
//                         }
//                     );

//                     if (response.ok) {
//                         const data = await response.json();
//                         // Update state or do something with the response if needed
//                         console.log('Preference created successfully:', data.preference);
//                     } else {
//                         console.error('Failed to create preference');
//                     }
//                 } catch (error) {
//                     console.error('Error creating preference:', error);
//                 }
//             })

//         }
//     };

//     const handleDeleteCity = (cityName) => {
//         setCities(cities.filter((city) => city.name !== cityName));
//     };

//     const handleWeatherSelect = (cityName, weather) => {
//         const updatedCities = cities.map((city) => {
//             if (city.name === cityName) {
//                 return {
//                     ...city,
//                     weather: city.weather.includes(weather)
//                         ? city.weather.filter((item) => item !== weather)
//                         : [...city.weather, weather],
//                 };
//             }
//             return city;
//         });
//         setCities(updatedCities);
//     };
//     return (
//         <div className='main-user'>
//             <div>
//                 <h1 className='text-3xl' >City Weather Preferences</h1>
//                 <CityForm className='mt-44' onSubmit={handleAddCity} disabled={cities.length >= 4} />
//                 <WeatherList
//                     cities={cities}
//                     onDelete={handleDeleteCity}
//                     onWeatherSelect={handleWeatherSelect}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Pref;


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
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={disabled}
            />
            <button type="submit" disabled={disabled}>
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
        <div className='main-user'>
            <div>
                <h1 className='text-3xl'>City Weather Preferences</h1>
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
