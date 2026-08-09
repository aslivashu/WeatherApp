import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import LightModeIcon from '@mui/icons-material/LightMode';

// Weather State Icons
import CloudySnowingIcon from '@mui/icons-material/CloudySnowing';
import SunnyIcon from '@mui/icons-material/Sunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import FoggyIcon from '@mui/icons-material/Foggy'; 

import "./InfoBox.css";

export default function InfoBox({ info }) {
    
    // Dynamic Icon Logic
    const getWeatherIcon = () => {
        const desc = info.weather ? info.weather.toLowerCase() : '';
        const { temp, humidity } = info;

        //scalable array
        const iconRules = [
            { isMatch: temp < 2 || desc.includes('snow'), Icon: CloudySnowingIcon },
            { isMatch: humidity > 85 || desc.includes('rain') || desc.includes('thunder'), Icon: ThunderstormIcon },
            { isMatch: desc.includes('fog') || desc.includes('haze') || desc.includes('mist'), Icon: FoggyIcon },
            { isMatch: desc.includes('cloud') || desc.includes('overcast'), Icon: CloudIcon },
            { isMatch: temp > 20 || desc.includes('sun') || desc.includes('clear'), Icon: SunnyIcon }
        ];

        
        const matchedRule = iconRules.find(rule => rule.isMatch);
        const ActiveIcon = matchedRule ? matchedRule.Icon : SunnyIcon;

        return <ActiveIcon className="card-icon" />;
    };

    return (
        <div className="InfoBox">
            <div className="cards-grid">
                
                {/* Card 1*/}
                <div className="glass-card">
                    {getWeatherIcon()}
                    <p className="card-title">Weather</p>
                    <p className="card-value weather-desc">{info.weather}</p>
                </div>

                {/* Card 2 */}
                <div className="glass-card">
                    <LightModeIcon className="card-icon"/>
                    <p className="card-title">Sunrise</p>
                    <p className="card-value">{info.sunrise}</p>
                </div>

                {/* Card 3*/}
                <div className="glass-card">
                    <WbTwilightIcon className="card-icon"/>
                    <p className="card-title">Sunset</p>
                    <p className="card-value">{info.sunset}</p>
                </div>

                {/* Card 4*/}
                <div className="glass-card">
                    <AirIcon className="card-icon"/>
                    <p className="card-title">Pressure</p>
                    <p className="card-value">{info.pressure} hPa</p>
                </div>

                {/* Card 5 */}
                <div className="glass-card">
                    <WaterDropIcon className="card-icon"/>
                    <p className="card-title">Humidity</p>
                    <p className="card-value">{info.humidity}%</p>
                </div>

            </div>
        </div>
    ); 
}