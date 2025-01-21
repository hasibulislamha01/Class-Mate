import { Button,  Modal, } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ShowModal = ({buttonText, modalContent}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                {buttonText}
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {modalContent}
            </Modal>
        </>
    );
};


ShowModal.propTypes = {
    buttonText: PropTypes.string,
    modalContent: PropTypes.node
}
export default ShowModal;