import Skeleton from "react-loading-skeleton";

const RoundSkeleton = () => {
    return (
        <div>
            <Skeleton
                width={100}
                height={100}
                borderRadius={100}
                className="rounded-full"
            />
        </div>
    );
};

export default RoundSkeleton;