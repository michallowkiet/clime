import { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/useFavorite";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

type FavoriteButtonProps = {
	weatherData: WeatherData;
	cityName: string;
};

const FavoriteButton = ({ weatherData, cityName }: FavoriteButtonProps) => {
	const { addToFavorite, isFavorite, deleteFavoriteCity } = useFavorite();
	const isFavoriteCity = isFavorite(weatherData.coord.lat, weatherData.coord.lon);

	// Handle add to favorite
	const handleAddToFavorite = () => {
		if (isFavoriteCity) {
			deleteFavoriteCity.mutate(weatherData.coord);

			return;
		}

		addToFavorite.mutate({
			lat: weatherData.coord.lat,
			lon: weatherData.coord.lon,
			name: cityName,
			country: weatherData.sys.country,
		});
	};

	return (
		<Button variant={"outline"} size={"icon"} className="group" onClick={handleAddToFavorite}>
			<Star
				className={`size-4 ${
					isFavoriteCity ? "text-yellow-500 fill-yellow-500" : ""
				} group-hover:text-yellow-500 group-hover:fill-yellow-500 transition-colors duration-300`}
			/>
		</Button>
	);
};

export default FavoriteButton;
