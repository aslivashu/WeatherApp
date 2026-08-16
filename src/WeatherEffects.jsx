import React from 'react';
import './WeatherEffects.css';

export default function WeatherEffects({ weatherInfo, theme }) {
    if (!weatherInfo) return null;

    const weatherDesc = weatherInfo.weather ? weatherInfo.weather.toLowerCase() : '';
    const temp = weatherInfo.temp;
    const humidityValue = parseInt(weatherInfo.humidity) || 0;
    const isNight = theme && theme.includes('night');

    
    // Absolute/Heavy rain or Squalls
    const isHeavyRain = (weatherDesc.includes('heavy') && weatherDesc.includes('rain')) || 
                        weatherDesc.includes('extreme') || 
                        weatherDesc.includes('torrential') || 
                        weatherDesc.includes('squall');
    
    // Strong Thunderstorm
    const isStorm = weatherDesc.includes('thunder') || weatherDesc.includes('storm');
    
    // Heavily overcast
    const isOvercast = weatherDesc.includes('overcast');

    // Heat Lightning: Heavily overcast + high humidity (>85) + heat (>30°C)
    const isHeatLightning = isOvercast && humidityValue > 85 && temp > 30;

    // Trigger the Lightning Effect if any of these are true
    const isLightning = isHeavyRain || isStorm || isHeatLightning || weatherDesc.includes('squall');

    //  STANDARD CONDITIONS
    const isRaining = humidityValue > 85 || weatherDesc.includes('rain') || weatherDesc.includes('drizzle') || isLightning || theme.includes('sleet');
    const isSnowing = temp < 2 || weatherDesc.includes('snow') || theme.includes('sleet');
    const isCloudy = weatherDesc.includes('cloud') || isOvercast;
    const isHaze = weatherDesc.includes('haze') || weatherDesc.includes('fog') || weatherDesc.includes('mist');

    
    // Hide sun/moon for heavy rain, overcast clouds, storms, or snow
    const hideSunMoon = isHeavyRain || isOvercast || isStorm || isSnowing;

    // Only show if it's day, it's warm or sunny/clear
    const isSunny = !isNight && !hideSunMoon && (temp > 20 || weatherDesc.includes('sun') || weatherDesc.includes('clear'));
    
    // Only show moon if it's night, clear of blocking weather
    const isClearNight = isNight && !hideSunMoon && (weatherDesc.includes('clear') || (!weatherDesc.includes('cloud') && !weatherDesc.includes('rain') && !weatherDesc.includes('haze')));

    return (
        <div className="weather-effects-container">
            
            {/* REALISTIC LIGHTNING LAYER */}
            {isLightning && (
                <div className="lightning-container">
                    {/* Glowing clouds behind the bolt */}
                    <div className="lightning-ambient" />
                    
                    {/* Bolt 1 (Left Side) */}
                    <svg className="lightning-bolt bolt-1" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* vectorEffect="non-scaling-stroke" keeps the bolt thin even when stretched */}
                        <polyline points="60,0 40,30 55,35 25,70 35,75 10,100" fill="none" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        <polyline points="40,30 20,40" fill="none" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                        <polyline points="25,70 15,65" fill="none" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </svg>

                    {/* Bolt 2 (Right Side) */}
                    <svg className="lightning-bolt bolt-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polyline points="40,0 60,25 45,30 75,65 65,70 90,100" fill="none" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        <polyline points="60,25 80,30" fill="none" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                        <polyline points="75,65 90,60" fill="none" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            )}

            {/* Rain Particles */}
            {isRaining && (
                <div className="rain-layer">
                    {[...Array(40)].map((_, i) => (
                        <div key={`rain-${i}`} className="raindrop" 
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
            {isSnowing && (
                <div className="snow-layer">
                    {[...Array(35)].map((_, i) => (
                        <div key={`snow-${i}`} className="snowflake" 
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

            {/* Drifting Clouds */}
            {isCloudy && (
                <div className="cloud-layer">
                    {[...Array(6)].map((_, i) => (
                        <div key={`cloud-${i}`} className="cloud-particle" 
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
                        <div key={`haze-${i}`} className="haze-wisp" 
                             style={{
                                 top: `${30 + (i * 20)}%`,
                                 animationDuration: `${6 + i * 2}s`,
                                 animationDelay: `${i * -2}s`
                             }}
                        />
                    ))}
                </div>
            )}

            {/* Celestial Bodies */}
            {isSunny && <div className="sun-glow-effect" />}
            {isClearNight && <div className="moon-glow-effect" />}
        </div>
    );
}