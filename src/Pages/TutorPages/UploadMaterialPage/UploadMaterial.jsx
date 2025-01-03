import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Button, Modal, Upload, message } from "antd";
import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';




const UploadMaterial = ({ setModalOpen, modalOpen }) => {

    const axiosSecure = useAxiosSecure()
    const query = useParams()
    const { user } = useAuth()
    const sessionId = query?.id
    const imgbbApi = import.meta.env.VITE_imgbb_api_key
    const tutorEmail = user?.email
    // console.log(tutorEmail)

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    console.log(image, title, link)

    async function uploadImage(event) {
        event.preventDefault()
        const form = new FormData(event.target)
        const materialTitle = form.get('title');
        const driveLink = form.get('driveLink');
        materialTitle && setTitle(materialTitle)
        driveLink && setLink(driveLink)
        const apiKey = imgbbApi; // Replace with your ImgBB API key
        const input = document.getElementById('imageInput');
        console.log(input)
        const file = input.files[0];
        console.log('file :', file)

        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log(result)

            if (result.success) {
                console.log('Image URL:', result.data.url);
                toast.success('Image Uploaded')
                setImage(result.data.url)
            } else {
                console.error('Upload failed:', result.error.message);

            }
        } catch (error) {
            console.error('Error:', error);


        }
    }

    const handleUploadMaterial = () => {
        // event.preventDefault()
        const materialInfo = {
            materialtitle: title,
            materialImage: image,
            sessionId,
            tutorEmail,
            driveLink: link,

        }
        axiosSecure.post('/materials', materialInfo)
            .then(res => {
                console.log(res.data)
                if (res.data?.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Material Uploaded successfully",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    if (image) {
        handleUploadMaterial()
    }

    const props = {
        name: 'file',
        action: {uploadImage},
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
                        />
                        <input
                        />
                    </div>

                    <div className="flex flex-col">

                        <label className="">Select Image from your Computer</label>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        {/* <input
                            id="imageInput"
                            className=""
                            type="file"
                            name="image"
                            required="required"
                        /> */}
                    </div>




                    <Button
                        htmlType="submit"
                    >Upload</Button>
                </form>
            </Modal>


        </div >
    );
};

export default UploadMaterial;