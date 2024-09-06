import { ExtractedWeatherData } from '../interfaces/weatherData';

function geoCoordsAndUpdatedTimeView({ latitude, longitude, lastUpdated }: Partial<ExtractedWeatherData>) {
    const date = new Date(lastUpdated as string);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div>
            <div>
                <span>Latitude: {latitude}</span>
                <span>Longitude: {longitude}</span>
            </div>
            <div>
                <span>Accurate to {formattedDate} at {formattedTime}</span>
            </div>
        </div>
    );
}

export default geoCoordsAndUpdatedTimeView;
