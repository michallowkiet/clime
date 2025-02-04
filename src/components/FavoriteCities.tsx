import { useFavorite } from "@/hooks/useFavorite";
import FavoriteCity from "./FavoriteCity";
import { ScrollArea } from "./ui/scroll-area";

const FavoriteCities = () => {
	const { favorites, deleteFavoriteCity } = useFavorite();

	if (!favorites.length) {
		return null;
	}

	return (
		<>
			<h1 className="text-xl font-bold tracking-tight">Favorite Cities</h1>
			<ScrollArea className="w-full pb-4">
				<div className="flex gap-4">
					{favorites.map((city) => (
						<FavoriteCity
							key={city.id}
							id={city.id}
							name={city.name}
							lat={city.lat}
							lon={city.lon}
							onDelete={() => deleteFavoriteCity.mutate({ lat: city.lat, lon: city.lon })}
						/>
					))}
				</div>
			</ScrollArea>
		</>
	);
};

export default FavoriteCities;
