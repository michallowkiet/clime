import { ForecastData } from "@/api/types";
import { useUnitContext } from "@/context/UnitProvider";
import { formatTemperature } from "@/utils/helper";
import { format } from "date-fns";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface HourlyTemperatureProps {
	forecastData: ForecastData;
}

const HourlyTemperature = ({ forecastData }: HourlyTemperatureProps) => {
	const { currentUnit } = useUnitContext();
	const chartData = forecastData.list.slice(0, 8).map((item) => ({
		time: format(new Date(item.dt * 1000), "HH"),
		temp: Math.round(item.main.temp),
		feels_like: Math.round(item.main.feels_like),
	}));
	return (
		<Card className="flex-1">
			<CardHeader>
				<CardTitle>Today's Temperature</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-[200px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 10 }}>
							<XAxis
								dataKey="time"
								stroke="#888888"
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								dataKey="temp"
								domain={["dataMin - 5", "dataMax + 5"]}
								stroke="#888888"
								fontSize={12}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => `${formatTemperature(value, currentUnit)}`}
							/>

							<Tooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										return (
											<div className="bg-background p-2 rounded-md shadow-sm border">
												<div className="grid grid-cols-2 gap-4">
													<div className="flex flex-col">
														<span className="text-[0.7rem] uppercase text-muted-foreground">
															Temperature:
														</span>
														<span className="font-bold">
															{formatTemperature(payload[0].value as number, currentUnit)}
														</span>
													</div>
													<div className="flex flex-col">
														<span className="text-[0.7rem] uppercase text-muted-foreground">
															Feels Like:
														</span>
														<span className="font-bold">
															{formatTemperature(payload[1].value as number, currentUnit)}
														</span>
													</div>
												</div>
											</div>
										);
									}
									return null;
								}}
							/>

							<Line type={"monotone"} dataKey="temp" stroke="#8884d8" strokeWidth={2} dot={false} />
							<Line
								type="monotone"
								dataKey="feels_like"
								stroke="#82ca9d"
								strokeWidth={2}
								dot={false}
								strokeDasharray={"5 5"}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default HourlyTemperature;
