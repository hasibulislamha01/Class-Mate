import useAuth from "../../../CustomHooks/useAuth";
import MaterialsCard from "../../../Components/SharedComponents/DashboardComponents/MaterialsCard";
import { Button, message, Spin } from "antd";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import { Link } from "react-router-dom";

const MyMaterials = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const tutorEmail = user?.email
    const [materials, refetch, isLoading] = useGetLatestData(`/materials?tutorEmail=${tutorEmail}`)
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

            <DashboardHeading subtitle={'These are the materials you have uploaded'} title={'Uploaded Materials'} />

            {
                isLoading ?
                    <div className="h-[70vh] flex items-center justify-center">
                        <Spin size="large" />
                    </div>
                    :
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
                            <Link to={'/dashboard/tutor/mySessions'}>
                                <Button className="bg-secondary border-secondary">
                                    Upload Now
                                </Button>
                            </Link>
                        </div>
            }

        </div>
    );
};

export default MyMaterials;