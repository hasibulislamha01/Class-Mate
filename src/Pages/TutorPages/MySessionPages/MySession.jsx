import useAuth from "../../../CustomHooks/useAuth";
import SessionCard from "./SessionCard";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";

const MySession = () => {
    const {user} = useAuth()
    const tutorEmail = user?.email;

    const queryInfo = useGetLatestData('mySessions', `/sessions/emailQuery/${tutorEmail}`)
    const mySessions = queryInfo[0]
    const refetch = queryInfo[1]
    console.log(mySessions)


    return (
        <div>
            <h1 className="mt-6 mb-12 text-center text-xl font-bold text-primary">My Sessions</h1>

            <div className="px-1 md:px-3 lg:px-4 flex flex-col justify-center items-center gap-4 lg:gap-6">
                {
                    mySessions?.map(mySession => 
                        <SessionCard
                            key={mySession._id}
                            mySession={mySession}
                            refetch={refetch}
                        ></SessionCard>
                    )
                }
            </div>
        </div>
    );
};

export default MySession;