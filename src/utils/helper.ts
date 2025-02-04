import { ForecastForTheDay, Wind } from "@/api/types";
import { DailyForecast } from "@/components/WeatherForecast";
import { format } from "date-fns";

/**
 * Formats a temperature value with the specified unit.
 *
 * @param temperature - The temperature value to format.
 * @param unit - The temperature unit, either "celsius" or "fahrenheit".
 * @returns A string representing the formatted temperature.
 */
export const formatTemperature = (temperature: number, unit: "celsius" | "fahrenheit") => {
	return `${temperature.toFixed(0)}° ${unit === "celsius" ? "C" : "F"}`;
};

/**
 * Converts a wind direction in degrees to a cardinal direction string.
 *
 * @param wind - The wind object containing the wind direction in degrees.
 * @returns The cardinal direction string (e.g. "N", "NE", "E", "SE", "S", "SW", "W", "NW").
 */
export const getWindDirection = (wind: Wind) => {
	const direction = Math.round(wind.deg / 45);
	const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
	return directions[direction];
};

/**
 * Transforms an array of daily weather forecasts into a dictionary of daily forecasts, where the keys are the dates and the values are objects containing the daily forecast details.
 *
 * @param forecastForDays - An array of `ForecastForTheDay` objects representing the weather forecasts for each day.
 * @returns A dictionary of `DailyForecast` objects, where the keys are the dates and the values are the daily forecast details.
 */
export const getDailyForecast = (forecastForDays: ForecastForTheDay[]) => {
	return forecastForDays.reduce((acc, forecast: ForecastForTheDay) => {
		const date = format(new Date(forecast.dt * 1000), "EEE, MMM dd");

		if (!acc[date]) {
			acc[date] = {
				date,
				minTemp: forecast.main.temp_min,
				maxTemp: forecast.main.temp_max,
				weather: forecast.weather[0],
				humidity: forecast.main.humidity,
				windSpeed: forecast.wind.speed,
			};
		} else {
			acc[date].minTemp = Math.min(acc[date].minTemp, forecast.main.temp_min);
			acc[date].maxTemp = Math.max(acc[date].maxTemp, forecast.main.temp_max);
			acc[date].humidity = Math.max(acc[date].humidity, forecast.main.humidity);
			acc[date].windSpeed = Math.max(acc[date].windSpeed, forecast.wind.speed);
		}

		return acc;
	}, {} as Record<string, DailyForecast>);
};
