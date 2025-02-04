import { WeatherData } from "@/api/types";
import { getWindDirection } from "@/utils/helper";
import { format } from "date-fns";
import { Compass, Droplets, Gauge, Sunrise, Sunset, Wind } from "lucide-react";

export const weatherDetailsData = (weatherData: WeatherData) => {
	const { wind, sys, main } = weatherData;

	return [
		{
			label: "Wind",
			value: `${wind.speed} m/s`,
			icon: Wind,
			color: "text-blue-500",
		},
		{
			label: "Wind Direction",
			value: `${getWindDirection(wind)} (${wind.deg}°)`,
			icon: Compass,
			color: "text-green-500",
		},
		{
			label: "Pressure",
			value: `${main.pressure} hPa`,
			icon: Gauge,
			color: "text-purple-500",
		},
		{
			label: "Humidity",
			value: `${main.humidity}%`,
			icon: Droplets,
			color: "text-blue-500",
		},
		{
			label: "Sunset",
			value: format(sys.sunset, "HH:mm:ss"),
			icon: Sunset,
			color: "text-blue-500",
		},
		{
			label: "Sunrise",
			value: format(sys.sunrise, "HH:mm:ss"),
			icon: Sunrise,
			color: "text-orange-500",
		},
	];
};
