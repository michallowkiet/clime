import { openWeatherAPI } from "@/api/openWeatherAPI";
import { Coordinates } from "@/api/types";
import { useUnitContext } from "@/context/UnitProvider";
import { useQuery } from "@tanstack/react-query";

export const useWeatherQuery = (coords: Coordinates | null) => {
	const { currentUnit } = useUnitContext();
	return useQuery({
		queryKey: ["weather", coords],
		queryFn: async () => {
			if (!coords) {
				return null;
			}
			return await openWeatherAPI.getCurrentWeather(coords, currentUnit);
		},
		enabled: !!coords,
	});
};

export const useForecastQuery = (coords: Coordinates | null) => {
	const { currentUnit } = useUnitContext();
	return useQuery({
		queryKey: ["forecast", coords],
		queryFn: async () => {
			if (!coords) {
				return null;
			}
			return await openWeatherAPI.getForecast(coords, currentUnit);
		},
		enabled: !!coords,
	});
};

export const useReverseGeocodeQuery = (coords: Coordinates | null) => {
	return useQuery({
		queryKey: ["reverseGeocode", coords],
		queryFn: async () => {
			if (!coords) {
				return null;
			}
			return await openWeatherAPI.reverseGeocode(coords);
		},
		enabled: !!coords,
	});
};

export const useSearchLocation = (query: string) => {
	return useQuery({
		queryKey: ["searchLocation", query],
		queryFn: async () => {
			return await openWeatherAPI.searchLocation(query);
		},
		enabled: query.length >= 3,
	});
};
