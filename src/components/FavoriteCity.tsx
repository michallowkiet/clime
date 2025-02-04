import { Coordinates } from "@/api/types";
import { useWeatherQuery } from "@/hooks/useWeather";
import { formatTemperature } from "@/utils/helper";
import { Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

type FavoriteCityProps = {
	id: string;
	name: string;
	lat: number;
	lon: number;
	onDelete: (coordinates: Coordinates) => void;
};

const FavoriteCity = ({ name, lat, lon, onDelete }: FavoriteCityProps) => {
	const navigate = useNavigate();
	const { data: weatherData, isLoading } = useWeatherQuery({ lat, lon });

	const handleNavigate = () => {
		navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handleNavigate}
			className="relative flex items-center gap-4 p-4 pr-8 cursor-pointer rounded border bg-card min-w-[250px] shadow-md transition-all hover:bg-accent hover:shadow-lg hover:scale-105"
		>
			<Button
				variant={"ghost"}
				size={"icon"}
				className="absolute right-1 top-1 size-6 p-0 hover:text-red-500"
				onClick={(e) => {
					e.stopPropagation();
					onDelete({ lat, lon });
				}}
			>
				<X className="size-4" />
			</Button>

			{isLoading ? (
				<div className="flex items-center justify-center h-8">
					<Loader2 className="animate-spin size-4" />
				</div>
			) : weatherData ? (
				<>
					<div className="flex items-center gap-4">
						<img
							src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
							alt={weatherData?.weather[0].description}
							className="size-12"
						/>
						<div>
							<p className="font-medium">{name}</p>
							<p className="text-xs text-muted-foreground">{weatherData.sys.country}</p>
						</div>
					</div>
					<div className="ml-auto text-right">
						<p className="text-xl font-semibold">
							{formatTemperature(weatherData.main.temp, "celsius")}
						</p>
						<p className="text-xs capitalize text-muted-foreground">
							{weatherData?.weather[0].description}
						</p>
					</div>
				</>
			) : null}
		</div>
	);
};

export default FavoriteCity;
