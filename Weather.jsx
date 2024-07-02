// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import sun_icon from '../assets/sun2.img.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    useEffect(() => {
        search("Linden");
    }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder='Search' />
                <img src={search_icon} alt="search" />
            </div>
            <img src={sun_icon} alt="weather icon" className='weather-icon' />
            <p className='temperature'>75°</p>
            <p className='location'>Linden, NJ</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="humidity icon" />
                    <div>
                        <p>65%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="wind icon" />
                    <div>
                        <p>8 mph</p>
                        <span>Windy</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;