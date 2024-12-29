
import { useState } from "react";
import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import BookedSessionCard from "./BookedSessionCard";
import ReviewModal from "./ReviewModal";
import { Link } from "react-router-dom";

const BookedSessions = () => {

    const { user } = useAuth()
    const queryData = useGetLatestData('bookedSessions', `/bookedSessions/${user?.email}`)
    const [showModal, setShowModal] = useState(false)
    const bookedSessions = queryData[0]
    console.log(bookedSessions?.length)


    return (
        <div className="relative container mx-auto min-h-screen">
            <h1 className="my-6 text-xl text-center text-primary font-bold">Booked Sessions</h1>
            {
                bookedSessions?.length === 0 ?
                    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-pretty">
                        <h1 className="text-2xl font-bold text-center text-red-500">You have not booked any sessions yet.</h1>
                        <Link to='/all-sessions'>
                            <button className="btn bg-primary text-white hover:bg-primary/90 hover:scale-105">Book one</button>
                        </Link>
                    </div>
                    :
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 place-items-center">
                        {
                            bookedSessions?.map(bookedSession =>
                                <>
                                    <BookedSessionCard
                                        key={bookedSession._id}
                                        bookedSession={bookedSession}
                                        setShowModal={setShowModal}
                                        showModal={showModal}
                                    ></BookedSessionCard>

                                    <ReviewModal
                                        bookedSession={bookedSession}
                                        setShowModal={setShowModal}
                                        showModal={showModal}
                                    />
                                </>
                            )
                        }
                    </div>
            }



        </div>
    );
};

export default BookedSessions;