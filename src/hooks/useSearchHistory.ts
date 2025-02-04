import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

export type SearchHistoryItem = {
	id: string;
	query: string;
	lat: number;
	lon: number;
	name: string;
	country: string;
	state?: string;
	searchedAt: string;
};

export const useSearchHistory = () => {
	const queryClient = useQueryClient();
	const [searchHistory, setSearchHistory] = useLocalStorage<SearchHistoryItem[]>(
		"searchHistory",
		[]
	);

	const historyQuery = useQuery({
		queryKey: ["searchHistory"],
		queryFn: () => {
			return searchHistory;
		},
		initialData: searchHistory,
		enabled: !!searchHistory,
	});

	const addToHistory = useMutation({
		mutationFn: async (search: Omit<SearchHistoryItem, "id" | "searchedAt">) => {
			const newHistoryItem: SearchHistoryItem = {
				id: crypto.randomUUID(),
				searchedAt: new Date().toISOString(),
				...search,
			};

			const filteredHistory = searchHistory.filter(
				(item) => item.lat !== search.lat && item.lon !== search.lon
			);

			// Only 10 items in history
			const updatedHistory = [newHistoryItem, ...filteredHistory].slice(0, 10);
			setSearchHistory(updatedHistory);
			return updatedHistory;
		},
		onSuccess: (updatedHistory) => {
			queryClient.setQueryData(["searchHistory"], updatedHistory);
		},
	});

	const deleteHistory = useMutation({
		mutationFn: async () => {
			setSearchHistory([]);
			return [];
		},
		onSuccess: () => {
			queryClient.setQueryData(["searchHistory"], []);
		},
	});

	return {
		history: historyQuery.data ?? [],
		addToHistory,
		deleteHistory,
	};
};
