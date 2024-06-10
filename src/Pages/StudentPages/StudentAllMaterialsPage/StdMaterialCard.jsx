import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const StdMaterialCard = ({ material }) => {
    console.log(material)

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
                    className="h-[150px] object-cover"
                />
            }
            actions={[
                // <SettingOutlined key="setting" />,
                // <EditOutlined key="edit" />,
                // <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={material?.materialtitle}
                description={driveLinkSection}
            />
        </Card>
    );
};

export default StdMaterialCard;