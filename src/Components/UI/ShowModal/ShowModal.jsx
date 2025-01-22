import { Modal, } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ShowModal = ({ modalTitle, controlButton, modalContent }) => {

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
            <div type="primary" onClick={showModal}>
                {controlButton}
            </div>
            <Modal
                title={modalTitle}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                {modalContent}
            </Modal>
        </>
    );
};


ShowModal.propTypes = {
    controlButton: PropTypes.node,
    modalContent: PropTypes.node,
    modalTitle: PropTypes.node,
}
export default ShowModal;