import { WeatherData } from "@/api/types";
import { weatherDetailsData } from "@/data/weatherDetailsData";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps {
	weatherData: WeatherData;
}

const WeatherDetails = ({ weatherData }: WeatherDetailsProps) => {
	const details = weatherDetailsData(weatherData);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Weather Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid sm:grid-cols-2 gap-8">
					{details.map((detail) => (
						<div key={detail.label} className="flex items-center gap-3 rounded-lg border p-4">
							<detail.icon className={`size-6 ${detail.color}`} />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">{detail.label}</p>
								<p className="text-sm text-muted-foreground">{detail.value}</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default WeatherDetails;
