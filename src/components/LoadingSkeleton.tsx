import { Skeleton } from "./ui/skeleton";

const LoadingSkeleton = () => {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center overflow-x-clip gap-6">
				<Skeleton className="h-24 w-48 rounded-lg" />
				<Skeleton className="h-24 w-48 rounded-lg" />
				<Skeleton className="h-24 w-48 rounded-lg" />
				<Skeleton className="h-24 w-48 rounded-lg" />
				<Skeleton className="h-24 w-48 rounded-lg" />
			</div>
			<div className="grid gap-6">
				<Skeleton className="h-[300px] w-full rounded-lg" />
				<Skeleton className="h-[300px] w-full rounded-lg" />
				<div className="grid gap-6 md:grid-cols-2">
					<Skeleton className="h-[300px] w-full rounded-lg" />
					<Skeleton className="h-[300px] w-full rounded-lg" />
				</div>
			</div>
		</div>
	);
};

export default LoadingSkeleton;
