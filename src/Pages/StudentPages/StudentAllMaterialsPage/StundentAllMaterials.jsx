import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import StdAllMtrlsCard from "./StdAllMtrlsCard";

const StundentAllMaterials = () => {

    const { user } = useAuth()
    const query = useGetLatestData('StundentAllMaterials', `/bookedSessions/${user?.email}`)
    const bookedSessions = query[0]
    console.log(bookedSessions)
    return (
        <div>
            <h1 className="text-center text-3xl">Booked Sessions</h1>
            <div>
                {
                    bookedSessions?.map(bookedSession =>
                        <StdAllMtrlsCard
                            key={bookedSession?._id}
                            bookedSession={bookedSession}
                        ></StdAllMtrlsCard>
                    )
                }
            </div>
        </div>
    );
};

export default StundentAllMaterials;