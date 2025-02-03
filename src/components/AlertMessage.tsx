import { AlertCircle, BadgeInfoIcon, MapPin } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";

interface AlertMessageProps {
	title: string;
	message: string;
	buttonText?: string;
	variant?: "destructive" | "default";
	onClick?: () => void;
}

export const AlertMessage = ({
	title,
	message,
	onClick,
	buttonText = "Refresh",
	variant = "default",
}: AlertMessageProps) => {
	return (
		<Alert variant={variant}>
			{variant === "default" ? (
				<BadgeInfoIcon className="h-4 w-4" />
			) : (
				<AlertCircle className="h-4 w-4" />
			)}
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>
				{message}
				{variant === "destructive" && (
					<Button
						onClick={onClick}
						variant={"outline"}
						className="mt-2 flex items-center justify-center"
					>
						<MapPin className="size-4" />
						{buttonText}
					</Button>
				)}
			</AlertDescription>
		</Alert>
	);
};
