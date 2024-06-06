import { Button, Upload } from "antd";

const UploadField = ({ handleUploadMaterial }) => {
    
    return (

        <Upload name="image">
            <Button>Upload Image</Button>
        </Upload>
    );
};

export default UploadField;