import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState('');
    let [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
    const API_KEY = "4af780068ac06645d7f72eafc934f4d6";
    const API_URL_AIR = "https://api.openweathermap.org/data/2.5/air_pollution?lat=";

    // Helper function to convert PM2.5 to US EPA AQI standard
    const calculateUSAQI = (pm) => {
        const breakpoints = [
            { lowC: 0.0, highC: 9.0, lowI: 0, highI: 50 },
            { lowC: 9.1, highC: 35.4, lowI: 51, highI: 100 },
            { lowC: 35.5, highC: 55.4, lowI: 101, highI: 150 },
            { lowC: 55.5, highC: 125.4, lowI: 151, highI: 200 },
            { lowC: 125.5, highC: 225.4, lowI: 201, highI: 300 },
            { lowC: 225.5, highC: 325.4, lowI: 301, highI: 400 },
            { lowC: 325.5, highC: 504.3, lowI: 401, highI: 500 }
        ];
        for (let bp of breakpoints) {
            if (pm >= bp.lowC && pm <= bp.highC) {
                return Math.round(((bp.highI - bp.lowI) / (bp.highC - bp.lowC)) * (pm - bp.lowC) + bp.lowI);
            }
        }
        return pm > 504.3 ? 500 : 0;
    };

    // Helper function to calculate exact local time for ANY timestamp using the 'UTC trick'
    const formatCityTime = (timestampMillis, offsetSeconds) => {
        const targetTime = new Date(timestampMillis + (offsetSeconds * 1000));
        return targetTime.toLocaleTimeString('en-US', { 
            timeZone: 'UTC', // Forces browser to ignore your local computer timezone
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
    };

    let getWeatherInfo = async () => {
        try {
            // Fetch Weather
            let response = await fetch(`${API_URL}${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            let lat = jsonResponse.coord.lat;
            let lon = jsonResponse.coord.lon;

            // Fetch AQI
            let airResponse = await fetch(`${API_URL_AIR}${lat}&lon=${lon}&appid=${API_KEY}`);
            let airJson = await airResponse.json();

            let pm25 = airJson.list[0].components.pm2_5;
            let pm10 = airJson.list[0].components.pm10;
            let usAqi = calculateUSAQI(pm25);

            // --- FIXED: GLOBAL TIMEZONE CALCULATION ---
            const offset = jsonResponse.timezone;
            const currentUtcMillis = new Date().getTime(); // Exact real-world time in UTC

            // Calculate formatted current local time for the target city
            const localTimeFormatted = formatCityTime(currentUtcMillis, offset);
            
            // Extract the hour (0-23) for your day/night theme logic
            const cityHour = new Date(currentUtcMillis + (offset * 1000)).getUTCHours();

            // Calculate sunrise and sunset exactly in the target city's timezone
            let sunrise = formatCityTime(jsonResponse.sys.sunrise * 1000, offset);
            let sunset = formatCityTime(jsonResponse.sys.sunset * 1000, offset);

            return {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMax: jsonResponse.main.temp_max,
                tempMin: jsonResponse.main.temp_min,
                humidity: jsonResponse.main.humidity,
                pressure: jsonResponse.main.pressure,   
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                sunrise: sunrise,
                sunset: sunset,
                aqi: usAqi,
                pm25: pm25,
                pm10: pm10,
                icon: jsonResponse.weather[0].icon,
                localTime: localTimeFormatted, 
                cityHour: cityHour
            };
        } catch (err) {
            setError(true);
            throw err;
        }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setError(false);
            let newInfo = await getWeatherInfo();
            setCity("");
            updateInfo(newInfo);
            console.log(newInfo);
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="SearchBox">
            <h3>Search the Weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="city" 
                    label="City Name" 
                    variant="outlined" 
                    size="small"
                    required 
                    value={city} 
                    onChange={handleChange}
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                            '&:hover fieldset': { borderColor: '#ffffff' },
                            '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                        },
                        '& .MuiInputBase-input': {
                            color: '#ffffff !important', 
                            fontWeight: '500',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#ffffff',
                        },
                    }}
                />  
                <Button variant="contained" type="submit" className="search-btn">
                    Search
                </Button>
                {error && <p className="error-text">Enter a valid place name</p>}
            </form>
        </div>
    );
}