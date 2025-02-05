import { TemperatureUnit } from "@/context/UnitProvider";
import { API_CONFIG } from "./config";
import { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./types";

class OpenWeatherAPI {
	private createURL(endpoint: string, params: Record<string, string | number>): string {
		const searchParams = new URLSearchParams({
			appid: API_CONFIG.API_KEY,
			...params,
		});

		return `${endpoint}?${searchParams.toString()}`;
	}

	private async fetchData<T>(url: string): Promise<T> {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Weather API Error: ${response.statusText}`);
		}
		return response.json();
	}

	async getCurrentWeather(
		{ lat, lon }: Coordinates,
		unit: TemperatureUnit = "celsius"
	): Promise<WeatherData> {
		const url = this.createURL(`${API_CONFIG.BASE_URL}/weather`, {
			lat: lat.toString(),
			lon: lon.toString(),
			units: unit === "celsius" ? "metric" : "imperial",
		});
		return this.fetchData<WeatherData>(url);
	}

	async getForecast(
		{ lat, lon }: Coordinates,
		unit: TemperatureUnit = "celsius"
	): Promise<ForecastData> {
		const url = this.createURL(`${API_CONFIG.BASE_URL}/forecast`, {
			lat: lat.toString(),
			lon: lon.toString(),
			units: unit === "celsius" ? "metric" : "imperial",
		});
		return this.fetchData<ForecastData>(url);
	}

	async reverseGeocode({ lat, lon }: Coordinates): Promise<GeocodingResponse[]> {
		const url = this.createURL(`${API_CONFIG.GOE_CODING_URL}/reverse`, {
			lat: lat.toString(),
			lon: lon.toString(),
			limit: 1,
		});
		return this.fetchData<GeocodingResponse[]>(url);
	}

	async searchLocation(query: string): Promise<GeocodingResponse[]> {
		const url = this.createURL(`${API_CONFIG.GOE_CODING_URL}/direct`, {
			q: query,
			limit: 5,
		});
		return this.fetchData<GeocodingResponse[]>(url);
	}
}

export const openWeatherAPI = new OpenWeatherAPI();
