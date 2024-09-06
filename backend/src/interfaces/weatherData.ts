export interface ExtractedWeatherData {
    country: string;
    localtime: string;
    temp_c: number;
    wind_kph: number;
    humidity: number;
    last_updated: string;
    hourlyForecast: { time: string, temp_c: number }[]; // array of hourly forecasts
}
