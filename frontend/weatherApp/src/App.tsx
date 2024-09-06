import { useState } from 'react';
import InputForm from './components/inputForm/InputForm';
import { ExtractedWeatherData } from './interfaces/weatherData';
import GeoCoordsAndUpdatedTimeView from "./components/geoCoordsAndUpdatedTimeView/GeoCoordsAndUpdatedTimeView";
import WeatherDisplay from "./components/weatherDisplay/WeatherDisplay";
import './App.css'; // Import the CSS

function App() {
    const [weatherData, setWeatherData] = useState<ExtractedWeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchWeatherData(city: string) {
        console.log(`Fetching weather data for: ${city}`);
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Unknown error occurred');
            }

            const data: ExtractedWeatherData = await response.json();
            console.log('Weather data fetched:', data);

            setWeatherData(data);
        } catch (error: any) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
            setError(error.message || 'Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="App">
            <div className="left-container">
                <h1>Use our weather app to see the weather around the world</h1>
                <InputForm
                    label="City name"
                    placeholder="Enter city"
                    buttonText="Check"
                    onSubmit={fetchWeatherData}
                />
                {weatherData && (
                    <GeoCoordsAndUpdatedTimeView
                        latitude={weatherData.latitude}
                        longitude={weatherData.longitude}
                        lastUpdated={weatherData.lastUpdated}
                    />
                )}
            </div>
            <div className="right-container">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {weatherData && <WeatherDisplay data={weatherData} />}
            </div>
        </div>
    );
}

export default App;
