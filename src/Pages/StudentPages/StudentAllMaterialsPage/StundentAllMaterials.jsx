import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import StdAllMtrlsCard from "./StdAllMtrlsCard";

const StundentAllMaterials = () => {

    const { user } = useAuth()
    const query = useGetLatestData('StundentAllMaterials', `/bookedSessions/${user?.email}`)
    const bookedSessions = query[0]
    console.log(bookedSessions)
    return (
        <div className="py-4 md:py=6">
            <h1 className="text-center text-xl text-primary font-bold mb-6">Browse materials</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
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