import PropTypes from "prop-types";
import { useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { Button, message } from "antd";
import { Input } from 'antd';



const UploadMaterial = ({ sessionId, tutorEmail, sessionImage }) => {

    // console.log('email and id are ',tutorEmail, sessionId);
    const axiosSecure = useAxiosSecure()
    
    const [materialTitle, setMaterialTitle] = useState('');
    const [driveLink, setDriveLink] = useState('');
    
    // console.log('imgbb api key is ', imgbbApiKey);
    // console.log('slfjoe',   materialTitle,
    //     sessionImage,
    //     sessionId,
    //     tutorEmail,
    //     driveLink,);

    

    // Handle material upload to your backend
    const handleMaterialUpload = async () => {
        if (!materialTitle || !driveLink || !sessionImage || !sessionId) {
            message.error('Please fill in all fields before submitting.');
            return;
        }

        const materialInfo = {
            materialtitle: materialTitle,
            materialImage: sessionImage,
            sessionId,
            tutorEmail,
            driveLink,
        };
        // console.log(materialInfo);

        try {
            const response = await axiosSecure.post('/materials', materialInfo);

            if (response.data?.insertedId) {
                message.success('Material uploaded successfully!');
                // setModalOpen(false)
            } else {
                message.error('Material upload failed.');
            }
        } catch (error) {
            console.error('Error during material upload:', error);
            message.error('Material upload failed.');
        }
    };

    

    return (
        <div className="">
            <h1 className="text-center text-lg font-bold">Upload Materials</h1>
            <form className="flex flex-col gap-5">
                <div className="flex flex-col">
                    <label className="">Material Title</label>
                    <Input
                        placeholder="Basic usage"
                        type="text"
                        name="title"
                        required="Enter Material Title"
                        onChange={(e) => { setMaterialTitle(e.target.value) }}
                    />

                </div>

                <div className="">
                    <label className="">Drive Link of Material</label>
                    <Input
                        className=""
                        type="text"
                        name="driveLink"
                        required="required"
                        placeholder="Enter Drive Link"
                        onChange={(e) => setDriveLink(e.target.value)}
                    />
                </div>

                

                <Button
                    type="primary"
                    onClick={handleMaterialUpload}
                    disabled={!sessionImage || !materialTitle || !driveLink || !tutorEmail}
                >
                    Submit Material
                </Button>

            </form>
        </div >
    );
};

UploadMaterial.propTypes = {
    sessionId: PropTypes.string,
    tutorEmail: PropTypes.string,
    sessionImage: PropTypes.string,
}


export default UploadMaterial;