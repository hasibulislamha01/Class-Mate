import useAuth from "../../../CustomHooks/useAuth";
import SessionCard from "./SessionCard";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";

const MySession = () => {
    const {user} = useAuth()
    // const axiosSecure = useAxiosSecure()
    const tutorEmail = user?.email;

    const queryInfo = useGetLatestData('mySessions', `/sessions/${tutorEmail}`)
    const mySessions = queryInfo[0]
    const refetch = queryInfo[1]

    // const [mySessions, setMySessions] = useState([])
    // useEffect(()=> {
    //     axiosSecure.get(`/sessions/${tutorEmail}`)
    //     .then(res => {
    //         console.log(res.data)
    //         setMySessions(res.data)
    //     })
    //     .catch(error => {
    //         console.log(error.message)
    //     })
    // }, [axiosSecure, tutorEmail])

    return (
        <div>
            <h1 className="text-center text-3xl text-red-500">My Sessions</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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