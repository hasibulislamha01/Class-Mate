import useGetLatestData from "../../CustomHooks/useGetLatestData";
import SessionCardinHome from "./SessionCardinHome";

const AllSessions = () => {
    const queryData = useGetLatestData('homeAllSessions', '/sessions/approved')
    const allSessions = queryData[0]
    console.log(allSessions)
    // const refetch = queryData[1]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                allSessions?.map(session =>
                    <SessionCardinHome
                        key={session._id}
                        session={session}
                    ></SessionCardinHome>
                )
            }
        </div>
    );
};

export default AllSessions;