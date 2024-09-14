import Skeleton from "react-loading-skeleton";

const ListSkeleton = () => {
    return (
        <div className="mt-16 w-[80%] mx-auto flex flex-col gap-6">
            <Skeleton className="w-full" height={30}/>
            <Skeleton className="w-full" height={30}/>
            <Skeleton className="w-full" height={30}/>
            <Skeleton className="w-full" height={30}/>
        </div>
    );
};

export default ListSkeleton;