import { Coordinates } from "@/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "./useLocalStorage";

export type FavoriteCity = {
	id: string;
	lat: number;
	lon: number;
	name: string;
	country: string;
	state?: string;
	addedAt: string;
};

export const useFavorite = () => {
	const queryClient = useQueryClient();
	const [favoriteCities, setFavoriteCities] = useLocalStorage<FavoriteCity[]>("favoriteCities", []);

	const favoriteCitiesQuery = useQuery({
		queryKey: ["favoriteCities"],
		queryFn: () => {
			return favoriteCities;
		},
		initialData: favoriteCities,
		enabled: !!favoriteCities,
	});

	const addToFavorite = useMutation({
		mutationFn: async (search: Omit<FavoriteCity, "id" | "addedAt">) => {
			const newFavoriteCity: FavoriteCity = {
				id: crypto.randomUUID(),
				addedAt: new Date().toISOString(),
				...search,
			};

			const filteredFavorites = favoriteCities.filter(
				(item) => item.lat !== search.lat && item.lon !== search.lon
			);

			// Only 10 items in favoriteCities
			const updatedFavoriteCities = [newFavoriteCity, ...filteredFavorites].slice(0, 10);
			setFavoriteCities(updatedFavoriteCities);
			return updatedFavoriteCities;
		},
		onSuccess: (updatedFavoriteCities) => {
			toast.success("Added to favorites");
			queryClient.setQueryData(["favoriteCities"], updatedFavoriteCities);
		},
	});

	const deleteFavoriteCities = useMutation({
		mutationFn: async () => {
			setFavoriteCities([]);
			return [];
		},
		onSuccess: () => {
			queryClient.setQueryData(["favoriteCities"], []);
		},
	});

	const deleteFavoriteCity = useMutation({
		mutationFn: async (coordinates: Coordinates) => {
			const updatedFavoriteCities = favoriteCities.filter(
				(city) => city.lat !== coordinates.lat && city.lon !== coordinates.lon
			);
			setFavoriteCities(updatedFavoriteCities);
			return updatedFavoriteCities;
		},
		onSuccess: (updatedFavoriteCities) => {
			toast.success("Removed from favorites");
			queryClient.setQueryData(["favoriteCities"], updatedFavoriteCities);
		},
	});

	const isFavorite = (lat: number, lon: number) => {
		return favoriteCities.some((city) => city.lat === lat && city.lon === lon);
	};

	return {
		favorites: favoriteCitiesQuery.data ?? [],
		addToFavorite,
		deleteFavoriteCities,
		deleteFavoriteCity,
		isFavorite,
	};
};
