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
    const [theme, setTheme] = useState('sunny'); 
    const [weatherInfo, setWeatherInfo] = useState(null);

    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
        setMenuOpen(false); 

      const weatherDesc = newInfo.weather ? newInfo.weather.toLowerCase() : '';
      const humidityValue = parseInt(newInfo.humidity) || 0;

      const isRaining = humidityValue > 85 || weatherDesc.includes('rain') || weatherDesc.includes('drizzle');
      const isSnowing = newInfo.temp < 2 || weatherDesc.includes('snow');
      const isSleet = weatherDesc.includes('sleet') || (isRaining && isSnowing);
        
        // night detection (7 PM ~ 6 AM)
        const currentHour = newInfo.cityHour !== undefined ? newInfo.cityHour : new Date().getHours();
        const isIconNight = newInfo.icon ? newInfo.icon.endsWith('n') : false;
        const isNightTime = isIconNight || currentHour < 6 || currentHour >= 19;

       if (isNightTime) {
        // --- NIGHT THEMES ---
        if (weatherDesc.includes('storm') || weatherDesc.includes('thunder')) {
            setTheme('night-storm'); 
        } else if (isSleet) {
            setTheme('night-sleet'); // Sets a combined background
        } else if (isRaining) {
            setTheme('night-rainy');
        } else if (isSnowing) {
            setTheme('night-snowy');
        } else if (weatherDesc.includes('haze') || weatherDesc.includes('fog') || weatherDesc.includes('mist')) {
            setTheme('night-haze'); 
        } else if (weatherDesc.includes('cloud') || weatherDesc.includes('overcast')) {
            setTheme('night-cloudy'); 
        } else {
            setTheme('night-clear');
        }
    } else {
        // --- DAYTIME THEMES ---
        if (weatherDesc.includes('storm') || weatherDesc.includes('thunder')) {
            setTheme('storm'); 
        } else if (isSleet) {
            setTheme('sleet'); // Sets a combined background
        } else if (isRaining) {
            setTheme('rainy');
        } else if (isSnowing) {
            setTheme('snowy');
        } else if (weatherDesc.includes('haze') || weatherDesc.includes('fog') || weatherDesc.includes('mist')) {
            setTheme('haze'); 
        } else if (weatherDesc.includes('cloud') || weatherDesc.includes('overcast')) {
            setTheme('cloudy'); 
        } else {
            setTheme('sunny'); 
        }
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

    // MAIN WEATHER RESULTS PAGE
    return (
        <div className={`weather-app ${theme}`}>
            {/*  Weather Effects */}
            <WeatherEffects weatherInfo={weatherInfo} theme={theme} />

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

                {/* Local Region Time*/}
                <div className="region-time-footer-text" style={{ textAlign: 'center', marginTop: '1.5rem', color: '#ffffff', opacity: '0.85', fontWeight: '500' }}>
                    <span> {weatherInfo.localTime}</span>
                </div>

                {/* Footer */}
                <footer>Weather App by Sarthak</footer>
            </div>
        </div>
    );
}