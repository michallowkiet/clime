export const API_CONFIG = {
	API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
	BASE_URL: "https://api.openweathermap.org/data/2.5/",
	GOE_CODING_URL: "http://api.openweathermap.org/geo/1.0/",
	DEFAULT_PARAMS: {
		UNITS: "metric",
	},
};

const currentWeatherDataURL =
	"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";

const geocodingDataURL =
	"direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

const reverseGeocodingDataURL = "reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}";

export { currentWeatherDataURL, geocodingDataURL, reverseGeocodingDataURL };
