export interface ExtractedWeatherData {
    country: string;
    localTime: string;
    temperatureCelsius: number;
    windKph: number;
    humidity: number;
    lastUpdated: string;
    latitude: number;
    longitude: number;
    hourlyForecast: { time: string, temperatureCelsius: number }[]; // array of hourly forecasts
}
