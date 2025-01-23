import { Button, message, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons'
import PropTypes from "prop-types";


const UploadImage = ({formLabel, setImageUrl}) => {

    const imgbbApi = import.meta.env.VITE_imgbbApi
    console.log(imgbbApi);

    // Handle image upload via Ant Design's Upload component
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApi}`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                console.log(result.data.url);
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
    return (
        <div className="flex flex-col">

            <label className="">{formLabel}</label>
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>

        </div>
    );
};

UploadImage.propTypes = {
    formLabel: PropTypes.string,
    setImageUrl: PropTypes.func
}
export default UploadImage;