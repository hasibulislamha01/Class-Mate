import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import SessionCard from "../MySessionPages/SessionCard";

const UploadMaterialMain = () => {

    const { user } = useAuth()
    const tutorEmail = user?.email;

    const queryInfo = useGetLatestData('mySessionsInMaterials', `/sessions/emailQuery/${tutorEmail}`)
    const mySessions = queryInfo[0]
    const refetch = queryInfo[1]
    console.log(mySessions)
    return (
        <div className="space-y-12">
            <div className="space-y-4 text-center">
                <h1 className="text-center text-3xl text-red-500">Upload materials</h1>
                <p>
                    Upload Materials by using the upload button in the card.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {
                    // mySessions?.map(mySession =>
                    //     <SessionCard
                    //         key={mySession._id}
                    //         mySession={mySession}
                    //         refetch={refetch}
                    //     ></SessionCard>
                    // )
                    'thinking to add something here'
                }
            </div>
        </div>
    );
};

export default UploadMaterialMain;