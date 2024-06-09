import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import BookedSessionCard from "./BookedSessionCard";

const BookedSessions = () => {

    const { user } = useAuth()
    const queryData = useGetLatestData('bookedSessions', `/bookedSessions/${user?.email}`)
    const bookedSessions = queryData[0]
    console.log(bookedSessions)


    return (
        <div>
            <h1 className="text-3xl text-center">Booked Sessions</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {
                    bookedSessions?.map(bookedSession =>
                        <BookedSessionCard
                            key={bookedSession._id}
                            bookedSession={bookedSession}
                        ></BookedSessionCard>
                    )
                }
            </div>
        </div>
    );
};

export default BookedSessions;