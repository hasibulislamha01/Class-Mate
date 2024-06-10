import { useEffect, useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import useAuth from "../../../CustomHooks/useAuth";
import MaterialsCard from "./MaterialsCard";

const MyMaterials = () => {

    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [materials, setMaterials] = useState()
    const tutorEmail = user?.email

    useEffect(()=> {
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
            <h1 className="text-center text-3xl my-12">My Materials</h1>

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

        </div>
    );
};

export default MyMaterials;