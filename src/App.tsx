import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeProvider";
import CityPage from "./pages/CityPage";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes
			retry: 1,
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="dark" themeStorageKey="theme">
				<BrowserRouter>
					<Layout>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/city/:cityName" element={<CityPage />} />
						</Routes>
					</Layout>
					<Toaster position="top-center" richColors={true} />
				</BrowserRouter>
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
