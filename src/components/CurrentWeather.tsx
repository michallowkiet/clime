import { GeocodingResponse, WeatherData } from "@/api/types";
import { TemperatureUnit } from "@/context/UnitProvider";
import { formatTemperature } from "@/utils/helper";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherProps {
	weatherData: WeatherData | null;
	locationName?: GeocodingResponse;
	currentUnit?: TemperatureUnit;
}

const CurrentWeather = ({
	weatherData,
	locationName,
	currentUnit = "celsius",
}: CurrentWeatherProps) => {
	if (!weatherData) {
		return null;
	}

	const {
		weather: [currentWeather],
		main: { temp, feels_like, humidity, temp_min, temp_max },
		wind: { speed },
	} = weatherData;

	return (
		<Card className="overflow-hidden">
			<CardContent className="p-6">
				<div className="grid gap-6 md:grid-cols-2">
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-end gap-1">
								<h2 className="text-2xl font-bold tracking-tighter">{locationName?.name}</h2>
								{locationName?.state && (
									<span className="text-muted-foreground">, {locationName?.state}</span>
								)}
							</div>
							<p className="text-sm text-muted-foreground">{locationName?.country}</p>
						</div>

						<div className="flex items-center gap-4">
							<p className="text-6xl font-bold tracking-tighter">
								{formatTemperature(temp, currentUnit)}
							</p>

							<div className="space-y-1">
								<p className="text-sm font-medium text-muted-foreground">
									Feels like {formatTemperature(feels_like, currentUnit)}
								</p>

								<div className="flex gap-2 text-sm font-medium">
									<span className="flex items-end gap-1 text-blue-500">
										<ArrowDown className="w-3 h-4 self-end" />
										{formatTemperature(temp_min, currentUnit)}
									</span>

									<span className="flex items-center gap-1 text-red-500">
										<ArrowUp className="w-3 h-4 self-start" />
										{formatTemperature(temp_max, currentUnit)}
									</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							{/* TODO: Add reusable component for this */}
							{/* Humidity */}
							<div className="flex items-center gap-2">
								<Droplets className="size-4 text-blue-500" />
								<div className="space-y-0.5">
									<p className="text-sm font-medium">Humidity</p>
									<p className="text-sm text-muted-foreground">{humidity}%</p>
								</div>
							</div>
							{/* Wind */}
							<div className="flex items-center gap-2">
								<Wind className="size-4 text-blue-500" />
								<div className="space-y-0.5">
									<p className="text-sm font-medium">Wind Speed</p>
									<p className="text-sm text-muted-foreground">{speed} m/s</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col items-center justify-center">
						<div className="relative flex justify-center items-center aspect-square w-full max-w-[200px]">
							<img
								src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
								alt={currentWeather.description}
								className="object-contain w-full h-full"
							/>
							<div className="absolute bottom-0 text-center">
								<p className="text-sm font-medium capitalize">{currentWeather.description}</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CurrentWeather;
