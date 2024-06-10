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
            <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto place-items-center gap-6 ">
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