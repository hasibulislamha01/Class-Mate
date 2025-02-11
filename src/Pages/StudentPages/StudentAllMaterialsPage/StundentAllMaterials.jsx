import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import MaterialsCard from "../../../Components/SharedComponents/DashboardComponents/MaterialsCard";
import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
// import StdAllMtrlsCard from "./StdAllMtrlsCard";

const StundentAllMaterials = () => {

    const { user } = useAuth()
    const query = useGetLatestData(`/materials/student/${user?.email}`)
    const materials = query[0]
    console.log('students materials are : ', materials)
    return (
        <div className="pb-4 md:py=6">
            <DashboardHeading title={'Materials'} subtitle={'These are the materials for you uploaded by the tutors'} />
            <div className="">
                {
                    materials?.map(material =>
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