import { AlertMessage } from "@/components/AlertMessage";
import CurrentWeather from "@/components/CurrentWeather";
import FavoriteButton from "@/components/FavoriteButton";
import HourlyTemperature from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { RefreshCw } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
	const [searchParams] = useSearchParams("");
	const params = useParams();

	// Extract lat and lon from search params
	const lat = parseFloat(searchParams.get("lat") ?? "0");
	const lon = parseFloat(searchParams.get("lon") ?? "0");
	const coordinates = { lat, lon };

	// Fetch weather data
	const {
		data: weatherData,
		isLoading: weatherLoading,
		error: weatherError,
		refetch: weatherRefetch,
	} = useWeatherQuery(coordinates);
	const {
		data: forecastData,
		isLoading: forecastLoading,
		error: forecastError,
		refetch: forecastRefetch,
	} = useForecastQuery(coordinates);

	const handleRefresh = () => {
		if (coordinates) {
			weatherRefetch();
			forecastRefetch();
		}
	};

	if (weatherError || forecastError) {
		return (
			<AlertMessage
				title="Error"
				message="Unable to fetch weather data. Please try again later."
				variant="destructive"
			/>
		);
	}

	if (!weatherData || !forecastData || weatherLoading || forecastLoading || !params.cityName) {
		return <LoadingSkeleton />;
	}

	return (
		<div className="space-y-4">
			{/* Favorite Cities */}
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold tracking-tight">
					{params.cityName}, {weatherData.sys.country}
				</h1>
				<div className="flex gap-2">
					{/* Favorite Button */}
					<FavoriteButton weatherData={weatherData} cityName={params.cityName} />
					{/* Refresh Button */}
					<Button
						variant={"outline"}
						size={"icon"}
						onClick={handleRefresh}
						disabled={weatherLoading || forecastLoading}
					>
						<RefreshCw className={`size-4 ${weatherLoading ? "animate-spin" : ""}`} />
					</Button>
				</div>
			</div>

			{/* Current and Hourly Weather */}
			<div className="grid gap-6">
				<div className="flex flex-col gap-6">
					{/* Current Weather */}
					<CurrentWeather weatherData={weatherData} />
					{/* Hourly temperature  */}
					<HourlyTemperature forecastData={forecastData} />
				</div>

				<div className="grid gap-6 items-start md:grid-cols-2">
					{/* details */}
					<WeatherDetails weatherData={weatherData} />
					{/* forecast */}
					<WeatherForecast forecastData={forecastData} />
				</div>
			</div>
		</div>
	);
};

export default CityPage;
