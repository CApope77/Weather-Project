// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import sun_icon from '../assets/sun2.img.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const [city, setCity] = useState('Linden');
    const [state, setState] = useState('NJ');
    const [weatherData, setWeatherData] = useState(null);
    const [searchCity, setSearchCity] = useState('');
    const [searchState, setSearchState] = useState('');

    const search = async (city, state) => {
        try {
            const query = `${city},${state},US`;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${import.meta.env.VITE_APP_ID}&units=imperial`;

            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchCity && searchState) {
            search(searchCity, searchState);
            setCity(searchCity);
            setState(searchState);
            setSearchCity('');
            setSearchState('');
        }
    };

    useEffect(() => {
        search(city, state);
    }, [city, state]);

    return (
        <div className='weather'>
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder='City'
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='State'
                    value={searchState}
                    onChange={(e) => setSearchState(e.target.value)}
                />
                <button type="submit">
                    <img src={search_icon} alt="search" />
                </button>
            </form>
            {weatherData && (
                <>
                    <img src={sun_icon} alt="weather icon" className='weather-icon' />
                    <p className='temperature'>{Math.round(weatherData.main.temp)}°F</p>
                    <p className='location'>{weatherData.name}, {weatherData.sys.country}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="humidity icon" />
                            <div>
                                <p>{weatherData.main.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="wind icon" />
                            <div>
                                <p>{Math.round(weatherData.wind.speed)} mph</p>
                                <span>Windy</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;
