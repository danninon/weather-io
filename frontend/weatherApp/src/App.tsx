import { useState } from 'react';
import InputForm from './components/InputForm';
import { ExtractedWeatherData } from './interfaces/weatherData';
import GeoCoordsAndUpdatedTimeView from "./components/geoCoordsAndUpdatedTimeView";

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
                // The server responded with an error status code
                const errorData = await response.json();  // Attempt to extract the error message from the response
                throw new Error(errorData.error || 'Unknown error occurred');  // Use the error message from the server, or a default message
            }

            const data: ExtractedWeatherData = await response.json();
            console.log('Weather data fetched:', data);

            setWeatherData(data);  // Update state with fetched data
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
            <InputForm
                label="City Name"
                placeholder="Enter city"
                buttonText="Check"
                onSubmit={fetchWeatherData}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weatherData
                &&
                <GeoCoordsAndUpdatedTimeView
                    latitude={weatherData.latitude}
                     longitude={weatherData.longitude}
                     lastUpdated={weatherData.lastUpdated}
                />}

        </div>
    );
}

export default App;
