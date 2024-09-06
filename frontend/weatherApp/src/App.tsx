// import React, { useState } from 'react';
import InputForm from './components/InputForm';
// import WeatherCard from './components/WeatherCard';

function App() {
    // const [weatherData, setWeatherData] = useState(null);

    function fetchWeatherData(city: string) {
        console.log(city);
        // Implement the API call to your backend here
        // For example:

        // fetch(`http://localhost:3000/api/weather?city=${city}`)
        //     .then((response) => response.json())
        //     .then((data) => setWeatherData(data))
        //     .catch((error) => console.error('Error fetching weather data:', error));
    }

    return (
        <div className="App">
            <InputForm
                label="City Name"
                placeholder="Enter city"
                buttonText="Check"
                onSubmit={fetchWeatherData}
            />
            {/*{weatherData && <WeatherCard data={weatherData} />}*/}
        </div>
    );
}

export default App;
