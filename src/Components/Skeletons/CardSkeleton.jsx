import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
    return (
        <div className="card w-[200px] h-[250px] py-2 px-3 border-2 border-gray-200/70 rounded-lg space-y-2">
            <Skeleton className="w-full" height={125} borderRadius={5} />
            <Skeleton className="w-full" />
            <div>
                <Skeleton className="w-full" height={10} />
                <Skeleton className="w-full" height={10} />
            </div>
        </div>
    );
};

export default CardSkeleton;