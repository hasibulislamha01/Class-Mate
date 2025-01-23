import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import TabCard from "../../../Components/UI/TabCard/TabCard";
import SessionInfoTab from './SessionInfoTab';
import MaterialTab from './MaterialTab';
import MakeCardTitleForTutor from "./MakeCardTitleForTutor";

const tabList = [{
    key: 'sessionTab',
    tab: 'Session Info',
},
{
    key: 'materialsTab',
    tab: 'Materials',
},
{
    key: 'notesTab',
    tab: 'Notes',
},]


const MySession = () => {

    const { user } = useAuth()
    const tutorEmail = user?.email;
    const tutorPhoto = user?.photoURL
    const queryInfo = useGetLatestData(`/sessions?tutorEmail=${tutorEmail}`)
    const mySessions = queryInfo[0]
    const refetch = queryInfo[1]
    // console.log(mySessions, sessionId, tutorEmail)


    return (
        <div className=" relative">
            <h1 className="mt-6 mb-12 text-center text-xl font-bold text-primary">My Sessions</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 ">

                {
                    mySessions?.map(session =>
                        <TabCard
                            key={session._id}
                            contentList={{
                                sessionTab:
                                    <SessionInfoTab
                                        registrationFee={session?.registrationFee}
                                        duration={session.duration}
                                        regEnds={session.registrationEnds}
                                        classEnds={session.classEnds}
                                    />,

                                materialsTab:
                                    <MaterialTab
                                        sessionId={session._id}
                                        tutorEmail={tutorEmail}
                                        sessionImage={session.sessionImage}
                                    />,

                                notesTab: <p>Project content</p>
                            }}
                            defaultTabkey={'sessionTab'}
                            tabList={tabList}
                            image={session.sessionImage}
                            cardTitle={
                                <MakeCardTitleForTutor
                                    refetch={refetch}
                                    tutorPhoto={tutorPhoto}
                                    sessionId={session._id}
                                    status={session.status}
                                    sessionTitle={session.sessionTitle}
                                />
                            }
                        />

                    )
                }

            </div>

            {/* <div className='hidden'>
                <UploadMaterial
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    sessionId={sessionId}
                    tutorEmail={tutorEmail}
                />
            </div> */}
        </div>
    );
};

export default MySession;