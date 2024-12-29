import { useEffect, useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAuth from "../../../CustomHooks/useAuth";
import MaterialsCard from "./MaterialsCard";
import { Button } from "antd";

const MyMaterials = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [materials, setMaterials] = useState()
    const tutorEmail = user?.email

    useEffect(() => {
        axiosSecure.get(`/materials/${tutorEmail}`)
            .then(response => {
                // console.log(response.data)
                setMaterials(response.data)
            })
            .catch(error => {
                console.error(error.message)
            })
    }, [tutorEmail, axiosSecure])
    console.log(materials)

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
                                ></MaterialsCard>
                            )
                        }
                    </div>
                    :
                    <div className="h-[60vh] flex flex-col items-center justify-center gap-10">
                        <h1 className="text font-semibold text-red-500">You have not uploaded any materials yet</h1>
                        <Button className="bg-secondary border-secondary">
                            <button>Upload Now</button>
                        </Button>
                    </div>
            }

        </div>
    );
};

export default MyMaterials;