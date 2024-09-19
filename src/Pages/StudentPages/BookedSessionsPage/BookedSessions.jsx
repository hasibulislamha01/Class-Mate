
import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import BookedSessionCard from "./BookedSessionCard";
import ReviewModal from "./ReviewModal";

const BookedSessions = () => {

    const { user } = useAuth()
    const queryData = useGetLatestData('bookedSessions', `/bookedSessions/student/${user?.email}`)
    const bookedSessions = queryData[0]
    console.log(bookedSessions)


    return (
        <div className="relative container mx-auto min-h-screen border border-red-500">
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
            
            <ReviewModal bookedSessions={bookedSessions}/>
        </div>
    );
};

export default BookedSessions;