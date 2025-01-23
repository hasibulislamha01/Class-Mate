import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import PropTypes from 'prop-types'
import { IoIosLink } from 'react-icons/io';
import PopConfirm from '../../../Components/UI/PopConfirm/PopConfirm';

const { Meta } = Card;
const MaterialsCard = ({ material, handleDeleteMaterial }) => {

    const driveLinkSection =
        <>
            <p className='flex items-center gap-2'>
                <IoIosLink />
                <a href={material?.driveLink}>Browse Drive Link</a>
            </p>
        </>
    return (
        <Card
            style={{
                // width: 300,
            }}
            cover={
                <div className='w-full h-28'>
                    <img
                        alt="example"
                        src={material?.materialImage}
                        className='w-full h-full object-cover'
                    />
                </div>
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <PopConfirm
                    key={'delete materials'}
                    actionableButton={<DeleteOutlined key='delete' />}
                    description={'Are you sure? This can not be undone.'}
                    title={'Delete Material'}
                    // setSelectedMaterialId={setSelectedMaterialId}
                    materialId={material?._id}
                    handleDeleteMaterial={handleDeleteMaterial}
                />,
            ]}
            className='shadow-md shadow-primary/15'
        >
            <Meta
                // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={material?.materialtitle}
                description={driveLinkSection}
            />
        </Card>
    )

};

MaterialsCard.propTypes = {
    material: PropTypes.object,
    setSelectedMaterialId: PropTypes.func,
    handleDeleteMaterial: PropTypes.func,
}
export default MaterialsCard;