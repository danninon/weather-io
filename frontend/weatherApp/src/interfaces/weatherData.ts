export interface ExtractedWeatherData {
    country: string;
    localTime: string;
    temperatureCelsius: number;
    windKph: number;
    humidity: number;
    lastUpdated: string;
    latitude: number;
    longitude: number;
    precipitationMM: number,
    conditionText: string,
    city: string,
    hourlyForecast: { time: string, temperatureCelsius: number }[]; // array of hourly forecasts
}
