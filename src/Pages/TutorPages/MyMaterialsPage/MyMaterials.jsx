import useAuth from "../../../CustomHooks/useAuth";
import MaterialsCard from "./MaterialsCard";
import { Button, message } from "antd";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const MyMaterials = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const tutorEmail = user?.email
    const [materials, refetch] = useGetLatestData("materials", `/materials/${tutorEmail && tutorEmail}`)
    // const [selectedMaterialId, setSelectedMaterialId] = useState('')


    // console.log(materials)

    // delete materials logic
    const handleDeleteMaterial = (materialId) => {
        axiosSecure.delete(`/materials/${materialId}`)
            .then(res => {
                // console.log(res.data);
                if (res.data.deletedCount) {
                    message.success('Deleted')
                }
                refetch()
            }).catch(error => {
                console.log(error.message);
                message.error('Failed to delete.')
            })
    }

    return (
        <div className="min-h-screen">
            <h1 className="text-center text-xl font-bold text-primary my-6">My Materials</h1>

            {
                materials?.length !== 0 ?

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {
                            materials?.map(material =>
                                <MaterialsCard
                                    material={material}
                                    key={material?._id}
                                    // setSelectedMaterialId={setSelectedMaterialId}
                                    handleDeleteMaterial={handleDeleteMaterial}
                                ></MaterialsCard>
                            )
                        }
                    </div>
                    :
                    <div className="h-[60vh] flex flex-col items-center justify-center gap-10">
                        <h1 className="text font-semibold text-red-500">You have not uploaded any materials yet</h1>
                        <Button className="bg-secondary border-secondary">
                            Upload Now
                        </Button>
                    </div>
            }

        </div>
    );
};

export default MyMaterials;