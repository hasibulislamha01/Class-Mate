import SessionCard from "../../Components/SharedComponents/SessionCard";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import useGetLatestData from "../../CustomHooks/useGetLatestData";


const AllSessions = () => {

    const queryData = useGetLatestData('homeAllSessions', '/sessions/approved')
    const allSessions = queryData[0]
    // console.log("query dataa", queryData);
    // console.log(allSessions)
    // const refetch = queryData[1]
    return (
        <div className="space-y-6 lg:space-y-12 mt-12 lg:mt-24">
            <h1 className="text-3xl text-center ">All Sessions</h1>

            {
                !allSessions ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center justify-items-stretch gap-6 mx-auto">

                        {
                            allSessions?.map(session =>
                                <SessionCard
                                    key={session._id}
                                    session={session}
                                ></SessionCard>
                            )
                        }

                    </div>
            }

            <div className="mt-10 w-full border border-red-400">
                pagination
            </div>

        </div>
    );
};

export default AllSessions;