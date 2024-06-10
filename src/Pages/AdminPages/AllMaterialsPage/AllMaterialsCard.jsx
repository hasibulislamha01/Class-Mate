import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllMaterialsCard = ({ material, refetch }) => {

    const axiosSecure = useAxiosSecure()
    // console.log(material)
    const driveLinkSection =
        <>
            <p>
                <a href={material?.driveLink}>Browse Drive Link</a>
            </p>
        </>

        const handleDelete = () => {
            axiosSecure.delete(`/materials/${material?._id}`)
            .then(res => {
                console.log(res.data)
                if(res.data.deletedCount){
                    Swal.fire({
                        title: "Deleted!",
                        text: "You deleted the material!",
                        icon: "success"
                      });
                      refetch()
                }
            })
            .catch(err => {
                console.error(err.message)
            })
        }

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
            <Button onClick={handleDelete}>Delete</Button>
        </Card>
    );
};

export default AllMaterialsCard;