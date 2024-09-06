function ForecastItem({time, temperatureCelsius}: { time: string, temperatureCelsius: number }) {
    return (
        <div>
            <p>{time}:00 {temperatureCelsius}°C</p>
        </div>
    );
}

export default ForecastItem;