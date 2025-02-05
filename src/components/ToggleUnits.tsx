import { useUnitContext } from "@/context/UnitProvider";
import { Button } from "./ui/button";

const ToggleUnits = () => {
	const { currentUnit, setUnit } = useUnitContext();

	const handleToggle = () => {
		setUnit(currentUnit === "celsius" ? "fahrenheit" : "celsius");
	};

	return (
		<Button onClick={handleToggle} variant={"outline"}>
			{currentUnit === "celsius" ? "C" : "F"}
		</Button>
	);
};

export default ToggleUnits;
