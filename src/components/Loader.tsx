import { Loader2 } from "lucide-react";

const Loader = () => {
	return (
		<div className="flex items-center justify-center p-4">
			<Loader2 className="animate-spin size-4" />
		</div>
	);
};

export default Loader;
