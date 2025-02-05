import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	themeStorageKey?: string;
};

interface ThemeProviderState {
	currentTheme: Theme;
	setTheme: (currentTheme: Theme) => void;
}

const initialState: ThemeProviderState = {
	currentTheme: "system",
	setTheme: () => {},
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider = ({
	children,
	defaultTheme = "dark",
	themeStorageKey = "vite-ui-theme",
	...props
}: ThemeProviderProps) => {
	const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
		const storedTheme = localStorage.getItem(themeStorageKey);
		return storedTheme ? (storedTheme as Theme) : defaultTheme;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");

		if (currentTheme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(currentTheme);
	}, [currentTheme]);

	const value = {
		currentTheme,
		setTheme: (currentTheme: Theme) => {
			localStorage.setItem(themeStorageKey, currentTheme);
			setCurrentTheme(currentTheme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
};
