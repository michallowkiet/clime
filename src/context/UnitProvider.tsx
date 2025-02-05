import { createContext, useContext, useState } from "react";

export type TemperatureUnit = "celsius" | "fahrenheit";

type UnitProviderProps = {
	children: React.ReactNode;
	defaultUnit?: TemperatureUnit;
};

export interface UnitProviderState {
	currentUnit: TemperatureUnit;
	setUnit: (unit: TemperatureUnit) => void;
}

const initialState: UnitProviderState = {
	currentUnit: "celsius",
	setUnit: () => {},
};

const UnitProviderContext = createContext<UnitProviderState>(initialState);

export const UnitProvider = ({ children, defaultUnit = "celsius" }: UnitProviderProps) => {
	const [currentUnit, setCurrentUnit] = useState<TemperatureUnit>(() => {
		const storedUnit = localStorage.getItem("tempUnit");
		return storedUnit ? (storedUnit as TemperatureUnit) : defaultUnit;
	});

	const value = {
		currentUnit,
		setUnit: (unit: TemperatureUnit) => {
			localStorage.setItem("tempUnit", unit);
			setCurrentUnit(unit);
		},
	};

	return <UnitProviderContext.Provider value={value}>{children}</UnitProviderContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUnitContext = () => {
	const context = useContext(UnitProviderContext);
	if (context === undefined) {
		throw new Error("useUnitContext must be used within a UnitProvider");
	}
	return context;
};
