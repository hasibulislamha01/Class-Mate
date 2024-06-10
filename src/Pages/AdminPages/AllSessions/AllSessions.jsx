import SessionCardinAdmin from "./SessionCardinAdmin";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";

const AllSessions = () => {

    const queryInfo = useGetLatestData('sessionAction', '/sessions')
    const allSessions = queryInfo[0]
    const refetch = queryInfo[1]

    console.log(allSessions)
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl text-center ">All Sessions</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {
                    allSessions?.map(session =>
                        // console.log(session)
                        <SessionCardinAdmin
                            key={session?._id}
                            session={session}
                            refetch={refetch}
                        ></SessionCardinAdmin>
                    )
                }
            </div>
        </div>
    );
};

export default AllSessions;