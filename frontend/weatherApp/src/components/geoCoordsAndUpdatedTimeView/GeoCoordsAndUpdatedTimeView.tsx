import {ExtractedWeatherData} from '../../interfaces/weatherData';
import './GeoCoordsAndUpdatedTimeView.css';

function GeoCoordsAndUpdatedTimeView({latitude, longitude, lastUpdated}: Partial<ExtractedWeatherData>) {
    const date = new Date(lastUpdated as string);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    return (
        <div className="geo-coords-container">
            <div className="geo-coords">
                <span className="geo-coord">Latitude: {latitude}</span>
                <span className="geo-coord">Longitude: {longitude}</span>
            </div>
            <div className="last-updated">
                <span>Accurate to {formattedDate} at {formattedTime}</span>
            </div>
        </div>
    );
}

export default GeoCoordsAndUpdatedTimeView;
