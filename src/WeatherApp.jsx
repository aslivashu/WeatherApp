import { useState } from 'react';
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import WeatherEffects from './WeatherEffects';

// Icons
import PlaceIcon from '@mui/icons-material/Place';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import "./WeatherApp.css";

export default function WeatherApp() { 
    const [menuOpen, setMenuOpen] = useState(false); 
    const [theme, setTheme] = useState('sunny'); // Default theme
    const [weatherInfo, setWeatherInfo] = useState(null);

    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
        setMenuOpen(false); 

        const weatherDesc = newInfo.weather ? newInfo.weather.toLowerCase() : '';

        // Determine Samsung-style theme class
        if (newInfo.temp < 2 || weatherDesc.includes('snow')) {
            setTheme('snowy');
        } else if (newInfo.humidity > 85 || weatherDesc.includes('rain') || weatherDesc.includes('storm')) {
            setTheme('rainy');
        } else if (newInfo.temp > 20 || weatherDesc.includes('sun') || weatherDesc.includes('clear')) {
            setTheme('sunny');
        } else if (weatherDesc.includes('cloud') || weatherDesc.includes('overcast')) {
            setTheme('cloudy');
        } else {
            setTheme('haze');
        }
    };

    const formatTemp = (val) => {
        if (val === null || val === undefined || val === '') return '';
        return Math.round(Number(val));
    };

    // INITIAL SEARCH PAGE
    if (!weatherInfo) {
        return (
            <div className="initial-search-page">
                <SearchBox updateInfo={updateInfo} />
            </div>
        );
    }

    // MAIN WEATHER RESULTS PAGE (Using theme class instead of inline image)
    return (
        <div className={`weather-app ${theme}`}>
            {/* Dynamic CSS Weather Effects (Rain, Snow, Sun Glow) */}
            <WeatherEffects weatherInfo={weatherInfo} />

            {/* Hamburger Button */}
            <button className="hamburger-btn" onClick={() => setMenuOpen(true)}>
                <MenuIcon />
            </button>

            {/* Drawer Menu */}
            <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={() => setMenuOpen(false)}>
                    <CloseIcon />
                </button>
                <div className="sidebar-content">
                    <SearchBox updateInfo={updateInfo}/>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                
                {/* City Header */}
                <div className="city-header">
                    <PlaceIcon className="location-icon" />
                    <h1 className="city-name">{weatherInfo.city}</h1>
                </div>

                {/* Hero Temperature */}
                <div className="temp-hero">
                    <h1 className="hero-temp-value">{formatTemp(weatherInfo.temp)}°</h1>
                    <p className="hero-sub-text">
                        Feels like {formatTemp(weatherInfo.feelsLike)}° &nbsp;|&nbsp; {formatTemp(weatherInfo.tempMin)}° ~ {formatTemp(weatherInfo.tempMax)}°
                    </p>
                </div>

                {/* Cards */}
                <InfoBox info={weatherInfo}/>

                {/* Footer */}
                <footer>Weather App by Sarthak</footer>
            </div>
        </div>
    );
}