import { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState {
	coords: Coordinates | null;
	error: string | null;
	isLoading: boolean;
}

enum GeolocationError {
	"Permission denied. Please enable location access." = 1,
	"Position unavailable",
	"Location request timed out",
	"An unknown error occurred",
}

export const useGeolocation = () => {
	const [locationData, setLocationData] = useState<GeolocationState>({
		coords: null,
		error: null,
		isLoading: false,
	});

	const getLocation = () => {
		setLocationData((state) => ({
			...state,
			isLoading: true,
		}));

		if (!navigator.geolocation) {
			setLocationData((state) => ({
				...state,
				error: "Geolocation is not supported by your browser",
				isLoading: false,
			}));

			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocationData((state) => ({
					...state,
					coords: {
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					},
					isLoading: false,
				}));
			},
			(error) => {
				console.log(error);

				setLocationData((state) => ({
					...state,
					error: GeolocationError[error.code],
					isLoading: false,
				}));
			}
		);
	};

	useEffect(() => {
		getLocation();
	}, []);

	return {
		...locationData,
		getLocation,
	};
};
