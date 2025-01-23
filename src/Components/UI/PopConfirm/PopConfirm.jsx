import { Popconfirm } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";


const PopConfirm = ({
    actionableButton,
    title,
    description,
    materialId,
    handleDeleteMaterial
}) => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = async() => {
        setConfirmLoading(true);
        try {
            // Await the deletion process
             await handleDeleteMaterial(materialId);
        } catch (error) {
            console.error("Deletion failed:", error);
        } finally {
            // Stop spinner and close the confirmation modal
            setConfirmLoading(false);
            setOpen(false);
        }
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    return (
        <Popconfirm
            title={title}
            description={description}
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
                loading: confirmLoading,
            }}
            onCancel={handleCancel}
        >
            <div onClick={showPopconfirm}>
                {actionableButton || 'usePop'}
            </div>
        </Popconfirm>
    );
};

PopConfirm.propTypes = {
    actionableButton: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    materialId: PropTypes.string,
    setSelectedMaterialId: PropTypes.func,
    handleDeleteMaterial: PropTypes.func,
}
export default PopConfirm;