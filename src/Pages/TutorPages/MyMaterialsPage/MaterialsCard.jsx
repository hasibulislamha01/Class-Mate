import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import PropTypes from 'prop-types'

const { Meta } = Card;
const MaterialsCard = ({ material }) => {

    const driveLinkSection =
        <>
            <p>
                <a href={material?.driveLink}>Browse Drive Link</a>
            </p>
        </>
    return (
        <Card
            style={{
                // width: 300,
            }}
            cover={
                <img
                    alt="example"
                    src={material?.materialImage}
                />
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
                description={ driveLinkSection }
            />
        </Card>
    )

};

MaterialsCard.propTypes = {
    material: PropTypes.object
}
export default MaterialsCard;