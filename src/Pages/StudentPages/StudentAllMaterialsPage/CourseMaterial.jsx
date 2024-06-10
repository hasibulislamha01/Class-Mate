import { useParams } from "react-router-dom";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import StdMaterialCard from "./StdMaterialCard";

const CourseMaterial = () => {
    const params = useParams()
    const id = params.id
    console.log(id)
    const query = useGetLatestData('getMaterialforStudent', `/materials/student/${id}`)
    const materials = query[0]
    console.log(materials)

    return (
        <div>
            <h1 className="text-center text-3xl">Material</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                  materials?.map(material => 
                    <StdMaterialCard
                        key={material._id}
                        material={material}
                    ></StdMaterialCard>
                  )  
                }
            </div>
        </div>
    );
};

export default CourseMaterial;