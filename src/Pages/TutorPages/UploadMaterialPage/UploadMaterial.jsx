import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UploadMaterial = () => {

    const axiosSecure = useAxiosSecure()
    const query = useParams()
    const {user} = useAuth()
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
            if(res.data?.insertedId){
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

    return (
        <div>
            <h1 className="text-center text-xl">Upload Materials</h1>
            <div>
                {/* <h1> </h1> */}
                <form onSubmit={uploadImage} className="flex flex-col gap-3">
                    <div className="input-container mx-auto">
                        <input
                            className=""
                            type="text"
                            name="title"
                            required="required"
                        />
                        <label className="label">Material Title</label>
                    </div>

                    <div className="input-container mx-auto">
                        <input
                            className=""
                            type="text"
                            name="driveLink"
                            required="required"
                        />
                        <label className="label">Drive Link of Material</label>
                    </div>

                    <div className="input-container mx-auto">
                        <input
                            id="imageInput"
                            className=""
                            type="file"
                            name="image"
                            required="required"
                        />
                        <label className="label"></label>
                    </div>




                    <button type="submit" className="btn bg-blue-500 w-[200px] mx-auto">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadMaterial;