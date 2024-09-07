import './ForecastItem.css';


function ForecastItem({time, temperatureCelsius}: { time: string; temperatureCelsius: number }) {
    return (
        <div className="forecast-item">
            <p className="forecast-time">{time}:00</p>
            <p className="forecast-temp">{Math.round(temperatureCelsius)}°</p>
        </div>
    );
}

export default ForecastItem;
