import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import useGetLatestData from "../../CustomHooks/useGetLatestData";
import SessionCardinHome from "./SessionCardinHome";

const AllSessions = () => {
    const queryData = useGetLatestData('homeAllSessions', '/sessions/approved')
    const allSessions = queryData[0]
    console.log(allSessions)
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-6 mx-auto">

                        {
                            allSessions?.map(session =>
                                <SessionCardinHome
                                    key={session._id}
                                    session={session}
                                ></SessionCardinHome>
                            )
                        }
                        
                    </div>
            }
        </div>
    );
};

export default AllSessions;