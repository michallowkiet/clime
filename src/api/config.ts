export interface IConfig {
	API_KEY: string;
	BASE_URL: string;
	GOE_CODING_URL: string;
	DEFAULT_PARAMS: {
		UNITS: "metric" | "imperial";
	};
}
export const API_CONFIG = <IConfig>{
	API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
	BASE_URL: "https://api.openweathermap.org/data/2.5/",
	GOE_CODING_URL: "http://api.openweathermap.org/geo/1.0/",
	DEFAULT_PARAMS: {
		UNITS: "metric",
	},
};
