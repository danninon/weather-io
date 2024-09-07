import { useState } from 'react';
import InputForm from './components/inputForm/InputForm';
import { ExtractedWeatherData } from './interfaces/weatherData';
import GeoCoordsAndUpdatedTimeView from "./components/geoCoordsAndUpdatedTimeView/GeoCoordsAndUpdatedTimeView";
import WeatherDisplay from "./components/weatherDisplay/WeatherDisplay";
import './App.css';
import imageToAdd from "./assets/images/logo.png";

function App() {
    const [weatherData, setWeatherData] = useState<ExtractedWeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchWeatherData(city: string) {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Unknown error occurred');
            }
            const data: ExtractedWeatherData = await response.json();
            setWeatherData(data);
        } catch (error: any) {
            setError(error.message || 'Failed to fetch weather data. Please try again.');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="App">

            <div className="left-container">
                <img className='logo' src={imageToAdd} alt="Image"/>

                <div className="inner-part-of-left-container-without-logo-container">
                    <div className='title-input-container'>
                        <h1 className="left-side-title">Use our weather app to see the weather around the world</h1>
                        <InputForm
                            label="City name"
                            placeholder="Enter city"
                            buttonText="Check"
                            onSubmit={fetchWeatherData}
                        />
                    </div>
                    {weatherData && (
                        <div className="geo-coords-container">
                            <GeoCoordsAndUpdatedTimeView
                                latitude={weatherData.latitude}
                                longitude={weatherData.longitude}
                                lastUpdated={weatherData.lastUpdated}
                            />
                        </div>
                    )}
                </div>

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
