import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import AllMaterialsCard from "./AllMaterialsCard";

const AllMaterials = () => {
    const query = useGetLatestData('allMaterials', `/materials`)
    const materials = query[0]
    const refetch = query[1]
    return (
        <div>
            <h1 className="text-center text-3xl">All Materials</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-12">
                {
                    materials?.map(material =>
                        <AllMaterialsCard
                            key={material._id}
                            material={material}
                            refetch={refetch}
                        ></AllMaterialsCard>
                    )
                }
            </div>
        </div>
    );
};

export default AllMaterials;