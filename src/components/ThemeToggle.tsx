import { useThemeContext } from "@/context/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
	const { currentTheme, setTheme } = useThemeContext();
	const isDark = currentTheme === "dark";

	return (
		<div
			role="switch"
			className={`flex justify-center cursor-pointer transition-transform duration-500 ${
				isDark ? "rotate-180" : "rotate-0"
			}`}
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			{isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
		</div>
	);
};

export default ThemeToggle;
