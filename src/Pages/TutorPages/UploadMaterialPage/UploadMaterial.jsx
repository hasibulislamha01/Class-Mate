import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Button, Modal, Upload, message } from "antd";
import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


const UploadMaterial = ({ sessionId, tutorEmail, setModalOpen, modalOpen }) => {

    const axiosSecure = useAxiosSecure()
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState('')
    const [materialTitle, setMaterialTitle] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const imgbbApiKey = import.meta.env.VITE_imgBB_api
    console.log(imgbbApiKey);

    // Handle image upload via Ant Design's Upload component
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setImageUrl(result.data.url);
                message.success('Image uploaded successfully!');
                return true;
            } else {
                message.error(`Image upload failed: ${result.error.message}`);
                return false;
            }
        } catch (error) {
            console.error('Error during image upload:', error);
            message.error('Image upload failed.');
            return false;
        }
    };

    // Handle material upload to your backend
    const handleMaterialUpload = async () => {
        if (!materialTitle || !driveLink || !imageUrl) {
            message.error('Please fill in all fields before submitting.');
            return;
        }

        const materialInfo = {
            materialtitle: materialTitle,
            materialImage: imageUrl,
            sessionId,
            tutorEmail,
            driveLink,
        };

        try {
            const response = await axiosSecure.post('/materials', materialInfo);

            if (response.data?.insertedId) {
                message.success('Material uploaded successfully!');
            } else {
                message.error('Material upload failed.');
            }
        } catch (error) {
            console.error('Error during material upload:', error);
            message.error('Material upload failed.');
        }
    };

    // Ant Design Upload props
    const uploadProps = {
        name: 'file',
        multiple: false,
        customRequest: async ({ file, onSuccess, onError }) => {
            const success = await handleImageUpload(file);

            if (success) {
                onSuccess('ok');
            } else {
                onError(new Error('Image upload failed.'));
            }
        },
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const testing = (event) => {
        event.preventDefault()
        const form = new FormData(event.target)
        const materialTitle = form.get('title');
        // const driveLink = form.get('driveLink');
        materialTitle && setTitle(materialTitle)
        // driveLink && setLink(driveLink)
        const materialInfo = {
            materialtitle: title,
            // materialImage: image,
            // sessionId,
            // tutorEmail,
            // driveLink: link,

        }
        materialInfo?.materialtitle && console.log(materialInfo);
        // console.log();
    }

    return (
        <div className="">

            <Modal
                // title="Vertically centered modal dialog"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
            >
                <h1 className="text-center text-lg font-bold">Upload Materials</h1>
                <form onSubmit={testing} className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <label className="">Material Title</label>
                        <Input
                            placeholder="Basic usage"
                            type="text"
                            name="title"
                            required="Enter Material Title"
                            onChange={(e)=>{setMaterialTitle(e.target.value)}}
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
                        <input
                        />
                    </div>

                    <div className="flex flex-col">

                        <label className="">Select Image from your Computer</label>
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                        
                    </div>




                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleMaterialUpload}
                        disabled={!imageUrl || !materialTitle || !driveLink}
                    >
                        Submit Material
                    </Button>

                </form>
            </Modal>


        </div >
    );
};

export default UploadMaterial;