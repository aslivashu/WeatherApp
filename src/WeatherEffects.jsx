import React from 'react';
import './WeatherEffects.css';

export default function WeatherEffects({ weatherInfo, theme }) {
    if (!weatherInfo) return null;

    const weatherDesc = weatherInfo.weather ? weatherInfo.weather.toLowerCase() : '';
    const temp = weatherInfo.temp;
    const humidityValue = parseInt(weatherInfo.humidity) || 0;
    const isNight = theme && theme.includes('night');

    // EXTREME CONDITIONS 
    const isHeavyRain = (weatherDesc.includes('heavy') && weatherDesc.includes('rain')) || 
                        weatherDesc.includes('extreme') || 
                        weatherDesc.includes('torrential') || 
                        weatherDesc.includes('squall');
    
    // Light Rain
    const isLightRain = weatherDesc.includes('light') || weatherDesc.includes('drizzle');
    
    const isStormIcon = weatherInfo.icon === '11d' || weatherInfo.icon === '11n';
    const isStorm = weatherDesc.includes('thunder') || weatherDesc.includes('storm') || isStormIcon;
    const isOvercast = weatherDesc.includes('overcast');
    const isHeatLightning = isOvercast && humidityValue > 85 && temp > 30;
    const isMonsoonLightning = weatherDesc.includes('rain') && humidityValue > 75 && temp > 24;

    // Trigger Lightning
    const isLightning = isHeavyRain || isStorm || isHeatLightning || weatherDesc.includes('squall') || isMonsoonLightning;

    // STANDARD CONDITIONS
    // Check if sky is explicitly clear or sunny to prevent false rain from high humidity
    const isClearSky = weatherDesc.includes('clear') || weatherDesc.includes('sunny');

    let isRaining = !isClearSky && (
        humidityValue > 85 || 
        weatherDesc.includes('rain') || 
        weatherDesc.includes('drizzle') || 
        isLightning || 
        theme.includes('sleet')
    );

    const isSnowing = temp < 2 || weatherDesc.includes('snow') || theme.includes('sleet');
    if (temp < -5) {
        isRaining = false;
    }

    const isCloudy = weatherDesc.includes('cloud') || isOvercast || isRaining || isStorm || isHeavyRain;
    const isHaze = weatherDesc.includes('haze') || weatherDesc.includes('fog') || weatherDesc.includes('mist');

    // CLOUD INTENSITY MAPPING
    const isFewClouds = weatherDesc.includes('few clouds');
    const isScattered = weatherDesc.includes('scattered');
    const isBroken = weatherDesc.includes('broken');

    let cloudCount = 4;        
    let cloudOpacity = 0.35;    

    if (isHeavyRain || isStorm) {
        cloudCount = 10;      
        cloudOpacity = 0.8;
    } else if (isOvercast || isRaining) {
        cloudCount = 8;        
        cloudOpacity = 0.7;
    } else if (isBroken) {
        cloudCount = 6;        
        cloudOpacity = 0.55;
    } else if (isScattered) {
        cloudCount = 4;     
        cloudOpacity = 0.45;
    } else if (isFewClouds) {
        cloudCount = 2;     
        cloudOpacity = 0.3;
    }

    // --- SUN/MOON VISIBILITY ---
    const hideSunMoon = isHeavyRain || isOvercast || isSnowing;
    
    const hasDayIcon = weatherInfo.icon ? weatherInfo.icon.endsWith('d') : !isNight;
    const hasNightIcon = weatherInfo.icon ? weatherInfo.icon.endsWith('n') : isNight;

    const showSun = hasDayIcon && !hideSunMoon;
    const showMoon = hasNightIcon && !hideSunMoon;

    // RAIN INTENSITY 
    let rainDropCount = 60;     
    let rainSpeedMin = 0.65;    
    let rainSpeedVariance = 0.55; 

    if (isLightRain) {
        rainDropCount = 30;     
        rainSpeedMin = 0.95;    
        rainSpeedVariance = 0.7;
    } else if (isHeavyRain || isStorm) {
        rainDropCount = 100;    
        rainSpeedMin = 0.35;    
        rainSpeedVariance = 0.4;
    }

    return (
        <div className="weather-effects-container">
            
            {/* REALISTIC LIGHTNING LAYER */}
            {isLightning && (
                <div className="lightning-container">
                    <div className="lightning-ambient" />
                    <svg className="lightning-bolt bolt-1" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polyline points="60,0 40,30 55,35 25,70 35,75 10,100" fill="none" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        <polyline points="40,30 20,40" fill="none" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                        <polyline points="25,70 15,65" fill="none" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <svg className="lightning-bolt bolt-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polyline points="40,0 60,25 45,30 75,65 65,70 90,100" fill="none" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        <polyline points="60,25 80,30" fill="none" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                        <polyline points="75,65 90,60" fill="none" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>
            )}

            {/* DYNAMIC Rain Particles */}
            {isRaining && (
                <div className="rain-layer">
                    {[...Array(rainDropCount)].map((_, i) => (
                        <div key={`rain-${i}`} className="raindrop" 
                             style={{
                                 left: `${Math.random() * 100}%`,
                                 animationDuration: `${rainSpeedMin + Math.random() * rainSpeedVariance}s`,
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

            {/* Drifting Clouds with Dynamic Intensity */}
            {isCloudy && (
                <div className="cloud-layer" style={{ opacity: cloudOpacity }}>
                    {[...Array(cloudCount)].map((_, i) => (
                        <div key={`cloud-${i}`} className="cloud-particle" 
                             style={{
                                 top: `${5 + (i * 10)}%`,
                                 width: `${280 + Math.random() * 200}px`,
                                 height: `${80 + Math.random() * 60}px`,
                                 animationDuration: `${15 + Math.random() * 15}s`,
                                 animationDelay: `${i * -2.5}s`
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

            {/* Celestial Bodies  */}
            {showSun && <div className="sun-glow-effect" />}
            {showMoon && <div className="moon-glow-effect" />}
        </div>
    );
}