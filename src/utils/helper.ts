export const formatTemperature = (temperature: number, unit: "celsius" | "fahrenheit") => {
	return `${temperature.toFixed(0)}° ${unit === "celsius" ? "C" : "F"}`;
};
