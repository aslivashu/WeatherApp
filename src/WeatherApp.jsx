import { useState } from 'react';
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';

// Icons
import PlaceIcon from '@mui/icons-material/Place';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import "./WeatherApp.css";

// Assets
import cloud1 from './assets/cloud1.jpeg';
import cloud2 from './assets/cloud2.jpeg';
import cloud3 from './assets/cloud3.jpeg';
import rain1 from './assets/rain1.jpeg';
import rain2 from './assets/rain2.jpeg';
import rain3 from './assets/rain3.jpeg';
import rain4 from './assets/rain4.jpeg';
import sunny1 from './assets/sunny1.jpeg';
import sunny2 from './assets/sunny2.jpeg';
import sunny3 from './assets/sunny3.jpeg';
import snow1 from './assets/snow1.jpeg';
import snow2 from './assets/snow2.jpeg';
import snow3 from './assets/snow3.jpeg';

const cloudImages = [cloud1, cloud2, cloud3];
const rainImages = [rain1, rain2, rain3, rain4];
const sunnyImages = [sunny1, sunny2, sunny3];
const snowImages = [snow1, snow2, snow3];

const getRandomImage = (imgArray) => {
    const randomIndex = Math.floor(Math.random() * imgArray.length);
    return imgArray[randomIndex];
};

export default function WeatherApp() { 
    const [menuOpen, setMenuOpen] = useState(false); 
    const [bgImage, setBgImage] = useState(null);
    const [weatherInfo, setWeatherInfo] = useState(null);

    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
        setMenuOpen(false); 

        const weatherDesc = newInfo.weather ? newInfo.weather.toLowerCase() : '';

        if (newInfo.temp < 2) {
            setBgImage(getRandomImage(snowImages));
        } else if (newInfo.humidity > 85 || weatherDesc.includes('rain')) {
            setBgImage(getRandomImage(rainImages));
        } else if (newInfo.temp > 20 || weatherDesc.includes('sun')) {
            setBgImage(getRandomImage(sunnyImages));
        } else if (weatherDesc.includes('cloud') || weatherDesc.includes('haze') || weatherDesc.includes('fog')) {
            setBgImage(getRandomImage(cloudImages));
        } else {
            setBgImage(getRandomImage(sunnyImages));
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
        <div 
            className="weather-app"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
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

                {/*  Hero Temperature */}
                <div className="temp-hero">
                    <h1 className="hero-temp-value">{formatTemp(weatherInfo.temp)}°</h1>
                    <p className="hero-sub-text">
                        Feels like {formatTemp(weatherInfo.feelsLike)}° &nbsp;|&nbsp; {formatTemp(weatherInfo.tempMin)}° ~ {formatTemp(weatherInfo.tempMax)}°
                    </p>
                </div>

                {/*  Cards */}
                <InfoBox info={weatherInfo}/>

                {/* Footer */}
                <footer>Weather App by Sarthak</footer>
            </div>
        </div>
    );
}