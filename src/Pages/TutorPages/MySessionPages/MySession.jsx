import useAuth from "../../../CustomHooks/useAuth";
import SessionCard from "./SessionCard";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import { useState } from "react";
import UploadMaterial from "../UploadMaterialPage/UploadMaterial";


const MySession = () => {

    const { user } = useAuth()
    const tutorEmail = user?.email;
    const [sessionId, setSessionId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    const queryInfo = useGetLatestData('mySessions', `/sessions/emailQuery/${tutorEmail}`)
    const mySessions = queryInfo[0]
    const refetch = queryInfo[1]
    // console.log(mySessions, sessionId, tutorEmail)


    return (
        <div className=" relative">
            <h1 className="mt-6 mb-12 text-center text-xl font-bold text-primary">My Sessions</h1>

            <div className="px-1 md:px-3 lg:px-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                {
                    mySessions?.map(mySession =>
                        <SessionCard
                            key={mySession._id}
                            mySession={mySession}
                            refetch={refetch}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            setSessionId={setSessionId}
                        ></SessionCard>
                    )
                }
            </div>

            <div className='hidden'>
                <UploadMaterial
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    sessionId={sessionId}
                    tutorEmail={tutorEmail}
                />
            </div>
        </div>
    );
};

export default MySession;