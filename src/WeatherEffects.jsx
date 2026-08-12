import React from 'react';
import './WeatherEffects.css';

export default function WeatherEffects({ weatherInfo, theme }) {
    if (!weatherInfo) return null;

    const weatherDesc = weatherInfo.weather ? weatherInfo.weather.toLowerCase() : '';
    const temp = weatherInfo.temp;
    const isNight = theme && theme.includes('night');

    const isRain = weatherInfo.humidity > 85 || weatherDesc.includes('rain') || weatherDesc.includes('drizzle') || weatherDesc.includes('storm');
    const isSnow = temp < 2 || weatherDesc.includes('snow');
    const isSunny = !isNight && (temp > 20 || weatherDesc.includes('sun') || weatherDesc.includes('clear'));
    const isClearNight = isNight && (weatherDesc.includes('clear') || (!weatherDesc.includes('cloud') && !weatherDesc.includes('rain') && !weatherDesc.includes('snow') && !weatherDesc.includes('haze')));
    
    
    const isCloudy = weatherDesc.includes('cloud') || weatherDesc.includes('overcast');
    const isHaze = weatherDesc.includes('haze') || weatherDesc.includes('fog') || weatherDesc.includes('mist');

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

            {/* Drifting Clouds Layer */}
            {isCloudy && (
                <div className="cloud-layer">
                    {[...Array(6)].map((_, i) => (
                        <div 
                            key={i} 
                            className="cloud-particle" 
                            style={{
                                top: `${8 + (i * 14)}%`,
                                width: `${250 + Math.random() * 180}px`,
                                height: `${70 + Math.random() * 50}px`,
                                animationDuration: `${18 + Math.random() * 12}s`,
                                animationDelay: `${i * -3}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Floating Haze */}
            {isHaze && (
                <div className="haze-particle-layer">
                    {[...Array(3)].map((_, i) => (
                        <div 
                            key={i} 
                            className="haze-wisp" 
                            style={{
                                top: `${30 + (i * 20)}%`,
                                animationDuration: `${6 + i * 2}s`,
                                animationDelay: `${i * -2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Sunny Glow Effect */}
            {isSunny && <div className="sun-glow-effect" />}

            {/* Moon Glow Effect (Clear Night only) */}
            {isClearNight && <div className="moon-glow-effect" />}
        </div>
    );
}