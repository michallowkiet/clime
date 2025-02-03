import { useThemeContext } from "@/context/ThemeProvider";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
	const { currentTheme } = useThemeContext();

	return (
		<header className="sticky top-0 z-50 w-full backdrop-blur py-2 supports-[backdrop-filter]:bg-background/0">
			<div className="container mx-auto flex justify-between items-center px-4">
				<Logo currentTheme={currentTheme} />
				<div className="flex justify-between items-center">
					{/* Search bar */}
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};

export default Navbar;
