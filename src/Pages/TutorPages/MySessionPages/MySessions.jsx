import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import TabCard from "../../../Components/UI/TabCard/TabCard";
import SessionInfoTab from './SessionCardsComponents/Tabs/SessionInfoTab';
import MaterialTab from './SessionCardsComponents/Tabs/MaterialTab';
import MakeCardTitleForTutor from "./SessionCardsComponents/MakeCardTitleForTutor";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import { message } from "antd";

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
    const axiosSecure = useAxiosSecure()
    const [data, refetch, isLoading] = useGetLatestData(`/sessions?tutorEmail=${tutorEmail}`)


    const handleRenewSession = (sessionId) => {
        console.log(`/sessions/${sessionId}`);
        const updates = [
            { updatableKey: 'status', value: 'renewed' },
        ]

        axiosSecure.patch(`/sessions/${sessionId}`, updates)
            .then(res => {
                console.log(res.data)
                refetch()
                message.success('Session Renewed.')
            })
            .catch(error => {
                console.error(error.message)
                message.error('Failed to Renew, Try again')
            })
    }


    return (
        <div className=" relative">

            <DashboardHeading subtitle={'These are the sessions you have created so far'} title={'Created Sessions'} />

            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 ">

                {
                    data?.map(session =>
                        <TabCard
                            key={session._id}
                            loading={isLoading}
                            contentList={{
                                sessionTab:
                                    <SessionInfoTab
                                        registrationFee={session?.registrationFee}
                                        duration={session.duration}
                                        regEnds={session.registrationEnds}
                                        classEnds={session.classEnds}
                                        status={session?.status}
                                        sessionId={session._id}
                                        handleRenewSession={handleRenewSession}
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