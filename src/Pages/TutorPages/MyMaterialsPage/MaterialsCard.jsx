import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import PropTypes from 'prop-types'
import { IoIosLink } from 'react-icons/io';

const { Meta } = Card;
const MaterialsCard = ({ material }) => {

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
                <EllipsisOutlined key="ellipsis" />,
            ]}
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
    material: PropTypes.object
}
export default MaterialsCard;