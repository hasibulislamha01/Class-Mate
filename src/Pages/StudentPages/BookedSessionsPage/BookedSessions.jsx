
import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import { Link } from "react-router-dom";
import TabCard from "../../../Components/UI/TabCard/TabCard";
import MakeCardTitle from "./MakeCardTitle";
import SessionTab from "./SessionCardTabs/SessionTab";
import MaterialTab from "./SessionCardTabs/MaterialTab";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import { Button } from "antd";

const tabs = [
    {
        key: 'session',
        tab: 'Session',
    },
    {
        key: 'tab2',
        tab: 'Materials',
    },
    {
        key: 'tab3',
        tab: 'Notes',
    },
]



const BookedSessions = () => {

    const { user } = useAuth()
    const queryData = useGetLatestData(`/bookedSessions?studentEmail=${user?.email}`)
    const bookedSessions = queryData[0]
    // console.log(bookedSessions?.length)



    return (
        <div className="relative container mx-auto min-h-screen">

            <DashboardHeading
                title={'Booked Sessions'}
                subtitle={'The sessions you have purchased appear here.'}
            />
            
            {
                bookedSessions?.length === 0 ?
                    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-pretty">
                        <h1 className="text-lg font-semibold text-center text-red-500">You have not booked any sessions yet.</h1>
                        <Link to='/all-sessions'>
                            <Button 
                            type="primary"
                            >Book One</Button>
                        </Link>
                    </div>
                    :
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 place-items-center">
                        {
                            bookedSessions?.map(bookedSession =>
                                <>
                                    {/* <BookedSessionCard
                                        key={bookedSession._id}
                                        bookedSession={bookedSession}
                                        setShowModal={setShowModal}
                                        showModal={showModal}
                                    ></BookedSessionCard> */}

                                    <TabCard
                                        key={bookedSession?._id}
                                        tabList={tabs}
                                        contentList={{
                                            session:
                                                <SessionTab session={bookedSession} />,
                                            app: <MaterialTab sessionId={bookedSession.sessionId} />,
                                            project: <p>Project content</p>,
                                        }}
                                        defaultTabkey={'session'}
                                        image={bookedSession?.sessionImage}
                                        cardTitle={
                                            <MakeCardTitle
                                                sessionId={bookedSession?.sessionId} tutorPhoto={bookedSession?.tutorPhoto} sessionTitle={bookedSession?.sessionTitle}
                                            />
                                        }
                                    />

                                    {/* <ReviewModal
                                        bookedSession={bookedSession}
                                        setShowModal={setShowModal}
                                        showModal={showModal}
                                    /> */}
                                </>
                            )
                        }
                    </div>
            }



        </div>
    );
};

export default BookedSessions;