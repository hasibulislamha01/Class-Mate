import { Button, Tooltip } from "antd";
import Info from "../../../../Components/UI/TabCard/Info";
import useGetLatestData from "../../../../CustomHooks/useGetLatestData";
import { AiFillFileText } from "react-icons/ai";
import { Link } from "react-router-dom";

const MaterialTab = ({ sessionId }) => {
    const [data] = useGetLatestData(`/materials/student/${sessionId}`)
    const materials = useGetLatestData(`/materials/counts?sessionId=${sessionId}`)
    const materialsCount = materials[0]?.count
    // console.log(materials[0], materialsCount);
    console.log(data)
    return (
        <section>
            <Info
                itemName='Materials Uploaded'
                itemValue={materialsCount}
            />

            <div className="flex items-center gap-2">
                <h3>View materials</h3>
                <Tooltip title='View Materials'>
                    <Link to='/dashboard/student/allMaterials'>
                        <Button
                            shape="circle"
                            icon={<AiFillFileText />}
                        ></Button>
                    </Link>
                </Tooltip>
            </div>
        </section>
    );
};

export default MaterialTab;