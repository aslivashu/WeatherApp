import React from 'react';
import './WeatherEffects.css';

export default function WeatherEffects({ weatherInfo }) {
    if (!weatherInfo) return null;

    const weatherDesc = weatherInfo.weather ? weatherInfo.weather.toLowerCase() : '';
    const temp = weatherInfo.temp;

    const isRain = weatherInfo.humidity > 85 || weatherDesc.includes('rain') || weatherDesc.includes('drizzle') || weatherDesc.includes('storm');
    const isSnow = temp < 2 || weatherDesc.includes('snow');
    const isSunny = temp > 20 || weatherDesc.includes('sun') || weatherDesc.includes('clear');
    const isHaze = weatherDesc.includes('cloud') || weatherDesc.includes('haze') || weatherDesc.includes('fog');

    return (
        <div className="weather-effects-container">
            {/* Rain Particles */}
            {isRain && (
                <div className="rain-layer">
                    {[...Array(40)].map((_, i) => (
                        <div 
                            key={i} 
                            className="raindrop" 
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${0.5 + Math.random() * 0.4}s`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Snow Particles */}
            {isSnow && (
                <div className="snow-layer">
                    {[...Array(35)].map((_, i) => (
                        <div 
                            key={i} 
                            className="snowflake" 
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                                animationDelay: `${Math.random() * 5}s`,
                                opacity: Math.random()
                            }}
                        >
                            ❄
                        </div>
                    ))}
                </div>
            )}

            {/* Sunny Glow Effect */}
            {isSunny && <div className="sun-glow-effect" />}

            {/* Haze / Fog Atmosphere */}
            {isHaze && <div className="haze-mist-effect" />}
        </div>
    );
}