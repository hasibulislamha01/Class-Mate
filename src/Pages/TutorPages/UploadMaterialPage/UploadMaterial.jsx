import PropTypes from "prop-types";
import { useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { Button, message } from "antd";
import { Input } from 'antd';



const UploadMaterial = ({ sessionId, tutorEmail, sessionImage }) => {

    console.log('email and id are ',tutorEmail, sessionId);
    const axiosSecure = useAxiosSecure()
    // const [imageUrl, setImageUrl] = useState(null);
    const [materialTitle, setMaterialTitle] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const imgbbApiKey = import.meta.env.VITE_imgBB_api
    console.log('imgbb api key is ', imgbbApiKey);
    console.log('slfjoe',   materialTitle,
        sessionImage,
        sessionId,
        tutorEmail,
        driveLink,);

    // Handle image upload via Ant Design's Upload component
    // const handleImageUpload = async (file) => {
    //     const formData = new FormData();
    //     formData.append('image', file);

    //     try {
    //         const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         const result = await response.json();

    //         if (result.success) {
    //             console.log(result.data.url);
    //             setImageUrl(result.data.url);
    //             message.success('Image uploaded successfully!');
    //             return true;
    //         } else {
    //             message.error(`Image upload failed: ${result.error.message}`);
    //             return false;
    //         }
    //     } catch (error) {
    //         console.error('Error during image upload:', error);
    //         message.error('Image upload failed.');
    //         return false;
    //     }
    // };

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
        console.log(materialInfo);

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

    // Ant Design Upload props
    // const uploadProps = {
    //     name: 'file',
    //     multiple: false,
    //     customRequest: async ({ file, onSuccess, onError }) => {
    //         const success = await handleImageUpload(file);

    //         if (success) {
    //             onSuccess('ok');
    //         } else {
    //             onError(new Error('Image upload failed.'));
    //         }
    //     },
    //     onChange(info) {
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully`);
    //         } else if (info.file.status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    // };

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

                {/* <div className="flex flex-col">

                    <label className="">Select Image from your Computer</label>
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>

                </div> */}

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