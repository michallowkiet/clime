import { AlertMessage } from "@/components/AlertMessage";
import CurrentWeather from "@/components/CurrentWeather";
import FavoriteCities from "@/components/FavoriteCities";
import HourlyTemperature from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/useWeather";
import { RefreshCw } from "lucide-react";

const Dashboard = () => {
	const { getLocation, error, isLoading, coords } = useGeolocation();
	const weatherResult = useWeatherQuery(coords);
	const forecastResult = useForecastQuery(coords);
	const reverseGeolocationResult = useReverseGeocodeQuery(coords);

	const handleRefresh = () => {
		getLocation();

		if (coords) {
			weatherResult.refetch();
			forecastResult.refetch();
			reverseGeolocationResult.refetch();
		}
	};

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	if (error) {
		return (
			<AlertMessage title="Error" message={error} variant="destructive" onClick={handleRefresh} />
		);
	}

	if (!coords) {
		return (
			<AlertMessage
				title="Location not found"
				message="Please enable location access to get your current location."
				onClick={handleRefresh}
				buttonText="Enable Location"
			/>
		);
	}

	const locationName = reverseGeolocationResult.data?.[0];

	if (weatherResult.error || forecastResult.error) {
		return (
			<AlertMessage
				title="Error"
				message="Unable to fetch weather data. Please try again later."
				onClick={handleRefresh}
				variant="destructive"
			/>
		);
	}

	if (!weatherResult.data || !forecastResult.data) {
		return <LoadingSkeleton />;
	}

	return (
		<div className="space-y-4">
			{/* Favorite Cities */}
			<FavoriteCities />

			{/* My Location */}
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-bold tracking-tight">My Location</h1>
				<Button variant={"outline"} size={"icon"} onClick={handleRefresh} disabled={isLoading}>
					<RefreshCw className={`size-4 ${weatherResult.isFetching ? "animate-spin" : ""}`} />
				</Button>
			</div>

			{/* Current and Hourly Weather */}
			<div className="grid gap-6">
				<div className="flex flex-col lg:flex-row gap-6">
					{/* Current Weather */}
					<CurrentWeather weatherData={weatherResult.data} locationName={locationName} />
					{/* Hourly temperature  */}
					<HourlyTemperature forecastData={forecastResult.data} />
				</div>

				<div className="grid gap-6 items-start md:grid-cols-2">
					{/* details */}
					<WeatherDetails weatherData={weatherResult.data} />
					{/* forecast */}
					<WeatherForecast forecastData={forecastResult.data} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
