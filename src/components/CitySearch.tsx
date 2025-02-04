import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { useFavorite } from "@/hooks/useFavorite";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useSearchLocation } from "@/hooks/useWeather";
import { format } from "date-fns";
import { Search, Star, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { Button } from "./ui/button";

const CitySearch = () => {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const { data: locations, isLoading } = useSearchLocation(query);
	const { history, addToHistory, deleteHistory } = useSearchHistory();
	const { favorites } = useFavorite();
	const navigate = useNavigate();

	const handleSelect = (location: string) => {
		setOpen(false);
		//  Handle location selection
		const [lat, lon, name, country, state] = location.split(",");

		//  Handle add to history
		addToHistory.mutate({
			lat: parseFloat(lat),
			lon: parseFloat(lon),
			name,
			country,
			state,
			query,
		});

		//  Navigate to city page
		navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
	};

	return (
		<>
			<Button
				onClick={() => setOpen(!open)}
				variant={"outline"}
				className="relative justify-start w-full text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
			>
				<Search className="mr-2 size-4" />
				Search cities...
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput value={query} onValueChange={setQuery} placeholder="Search cities..." />
				<CommandList>
					{query.length < 3 && !isLoading && <CommandEmpty>No results found.</CommandEmpty>}

					{favorites && favorites.length > 0 && (
						<>
							<CommandSeparator />
							<CommandGroup heading="Favorite Cities">
								{favorites.map((location) => (
									<CommandItem
										key={`${location.lat}-${location.lon}-${location.name}`}
										value={`${location.lat},${location.lon},${location.name},${location.country},${location.state}`}
										onSelect={handleSelect}
									>
										<Star className="mr-2 size-4 text-yellow-500" />
										<span>{location.name}</span>
										{location.country && (
											<span className="text-sm text-muted-foreground">, {location.country}</span>
										)}
										{location.state && (
											<span className="text-sm text-muted-foreground">, {location.state}</span>
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}

					{locations && locations.length > 0 && (
						<>
							<CommandSeparator />
							<CommandGroup heading="Suggestions">
								{isLoading && <Loader />}
								{locations.map((location) => (
									<CommandItem
										key={`${location.lat}-${location.lon}-${location.name}`}
										value={`${location.lat},${location.lon},${location.name},${location.country},${location.state}`}
										onSelect={handleSelect}
									>
										<Search className="mr-2 size-4" />
										<span>{location.name}</span>
										{location.country && (
											<span className="text-sm text-muted-foreground">, {location.country}</span>
										)}
										{location.state && (
											<span className="text-sm text-muted-foreground">, {location.state}</span>
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}

					{history.length > 0 && (
						<>
							<CommandSeparator />
							<CommandGroup>
								<div className="flex justify-between items-center">
									<p className="text-xs text-muted-foreground px-2 py-[6px]">Recent Searches</p>
									<Button
										variant={"ghost"}
										size={"sm"}
										onClick={() => deleteHistory.mutate()}
										className="text-muted-foreground items-center justify-center gap-2"
									>
										<XCircle className="size-4" />
										Clear
									</Button>
								</div>
								{history.map((item) => (
									<CommandItem
										key={item.id}
										value={`${item.lat},${item.lon},${item.name},${item.country},${item.state}`}
										onSelect={handleSelect}
									>
										<Search className="mr-2 size-4" />
										<span>{item.name}</span>
										{item.country && (
											<span className="text-sm text-muted-foreground">, {item.country}</span>
										)}
										{item.state && (
											<span className="text-sm text-muted-foreground">, {item.state}</span>
										)}
										{item.searchedAt && (
											<span className="text-sm text-muted-foreground">
												, {format(item.searchedAt, "dd MMM HH:mm")}
											</span>
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
};

export default CitySearch;
