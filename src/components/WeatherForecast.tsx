import { ForecastData } from "@/api/types";
import { getDailyForecast } from "@/utils/helper";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherForecastProps {
	forecastData: ForecastData;
}

export interface DailyForecast {
	date: string;
	minTemp: number;
	maxTemp: number;
	humidity: number;
	windSpeed: number;
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	};
}

const WeatherForecast = ({ forecastData }: WeatherForecastProps) => {
	const { list } = forecastData;

	const dailyForecast = getDailyForecast(list);

	const forecastForNext5Days = Object.values(dailyForecast).slice(0, 5);

	return (
		<Card>
			<CardHeader>
				<CardTitle>5-Day Forecast</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					{forecastForNext5Days.map((forecast) => (
						<div key={forecast.date} className="grid grid-cols-3 gap-4">
							{/* Date and Weather conditions */}
							<div className="grid grid-cols-[auto,1fr] items-center justify-items-start">
								<div className="size-20">
									<img
										src={`https://openweathermap.org/img/wn/${forecast.weather.icon}.png`}
										alt={forecast.weather.description}
										className="w-full h-full object-cover"
									/>
								</div>
								<div>
									<p className="text-sm font-medium">{forecast.date}</p>
									<p className="text-sm text-muted-foreground">{forecast.weather.description}</p>
								</div>
							</div>

							{/* Temperature */}
							<div className="flex justify-center items-center gap-4">
								<p className="text-sm flex items-center justify-center gap-1">
									<ArrowDown className="size-4 text-blue-500" />
									{forecast.minTemp.toFixed(1)}°C
								</p>
								<p className="text-sm flex items-center justify-center gap-1">
									<ArrowUp className="size-4 text-red-500" />
									{forecast.maxTemp.toFixed(1)}°C
								</p>
							</div>

							{/* Humidity and Wind Speed */}
							<div className="grid grid-cols-2 justify-items-end">
								<p className="text-sm flex items-center gap-2 ">
									<Droplets className="size-4 text-blue-500" />
									{forecast.humidity}%
								</p>
								<p className="text-sm flex items-center gap-2 ">
									<Wind className="size-4 text-blue-500" />
									{forecast.windSpeed} m/s
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default WeatherForecast;
