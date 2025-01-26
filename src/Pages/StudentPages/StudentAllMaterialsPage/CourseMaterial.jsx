import { useParams } from "react-router-dom";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import StdMaterialCard from "./StdMaterialCard";

const CourseMaterial = () => {
    const params = useParams()
    const id = params.id
    console.log(id)
    const query = useGetLatestData(`/materials?sessionId=${id}`)
    const materials = query[0]
    console.log(materials)

    return (
        <div className="min-h-screen">
            <h1 className="text-center text-xl font-bold my-6 text-primary">Material</h1>

            {
                materials?.length !== 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center justify-items-center">
                        {
                            materials?.map(material =>
                                <StdMaterialCard
                                    key={material._id}
                                    material={material}
                                ></StdMaterialCard>
                            )
                        }
                    </div> :
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="font-semibold text-lg text-red-400">The tutor has not uploaded any materials for the session.</h1>
                    </div>
            }
            
        </div>
    );
};

export default CourseMaterial;