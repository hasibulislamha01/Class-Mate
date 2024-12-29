import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import PropTypes from "prop-types";

const StdMaterialCard = ({ material }) => {

    console.log(material)

    return (
        <Card
            className="w-[15rem] xl:w-[20rem] dark:border-dark-accent dark:bg-dark-accent"
            
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
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={
                    <h1 className="text-primary dark:text-dark-primary">{material?.materialtitle}</h1>
                }
                description={
                    <p className="text-text dark:text-dark-text/70">
                        <a href={material?.driveLink}>Browse Drive Link</a>
                    </p>
                }


            />
        </Card>
    );
};

StdMaterialCard.propTypes = {
    material: PropTypes.object
}
export default StdMaterialCard;