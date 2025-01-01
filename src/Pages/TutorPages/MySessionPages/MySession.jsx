import useAuth from "../../../CustomHooks/useAuth";
import SessionCard from "./SessionCard";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import { useState } from "react";
import UploadMaterial from "../UploadMaterialPage/UploadMaterial";

const MySession = () => {
    const { user } = useAuth()
    const tutorEmail = user?.email;
    // const [isModalOpen, setModalOpen] = useState(false)
    const queryInfo = useGetLatestData('mySessions', `/sessions/emailQuery/${tutorEmail}`)
    const mySessions = queryInfo[0]
    const refetch = queryInfo[1]
    console.log(mySessions)


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
                        ></SessionCard>
                    )
                }
            </div>

            {/* <div className={`absolute ${isModalOpen ? 'block' : 'hidden'}`}>
                <UploadMaterial />
            </div> */}
        </div>
    );
};

export default MySession;