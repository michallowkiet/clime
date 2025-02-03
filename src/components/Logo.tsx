import { Theme } from "@/context/ThemeProvider";
import { Link } from "react-router-dom";

const baseStyles = "text-4xl font-bold ";

const Logo = ({ currentTheme }: { currentTheme: Theme }) => {
	return (
		<Link to="/">
			{currentTheme === "dark" ? (
				<p className={`${baseStyles} text-[#87CEEB]`}>Clime</p>
			) : (
				<p className={`${baseStyles} text-[#4682B4]`}>Clime</p>
			)}
		</Link>
	);
};

export default Logo;
