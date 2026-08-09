import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState('');
    let [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
    const API_KEY = "4af780068ac06645d7f72eafc934f4d6";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            let sunrise = new Date(jsonResponse.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            let sunset = new Date(jsonResponse.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

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
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)', //  border
                            },
                            '&:hover fieldset': {
                                borderColor: '#ffffff', 
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#ffffff', 
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: '#ffffff !important', // User input text 
                            fontWeight: '500',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)', // Label text
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