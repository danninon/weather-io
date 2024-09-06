function ForecastItem({time, temperatureCelsius}: { time: string, temperatureCelsius: number }) {
    return (
        <div>
            <p>{time}: {temperatureCelsius}°C</p>
        </div>
    );
}

export default ForecastItem;