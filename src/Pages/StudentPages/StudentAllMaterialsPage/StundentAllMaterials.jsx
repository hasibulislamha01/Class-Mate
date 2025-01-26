import MaterialsCard from "../../../Components/SharedComponents/DashboardComponents/MaterialsCard";
import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import StdAllMtrlsCard from "./StdAllMtrlsCard";

const StundentAllMaterials = () => {

    const { user } = useAuth()
    const query = useGetLatestData(`/materials/student/${user?.email}`)
    const materials = query[0]
    console.log('students materials are : ', materials)
    return (
        <div className="py-4 md:py=6">
            <h1 className="text-center text-xl text-primary font-bold mb-6">Browse materials</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                {
                    materials?.map(material =>
                        // <StdAllMtrlsCard
                        //     key={bookedSession?._id}
                        //     bookedSession={bookedSession}
                        // ></StdAllMtrlsCard>
                        <MaterialsCard
                            key={material?._id}
                            role='student'
                            material={material}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default StundentAllMaterials;