import { Button, Tooltip } from "antd";
import Info from "../../../../Components/UI/TabCard/Info";
import useGetLatestData from "../../../../CustomHooks/useGetLatestData";
import { AiFillFileText } from "react-icons/ai";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MaterialTab = ({ sessionId }) => {
    const [data] = useGetLatestData(`/materials/student/${sessionId}`)
    const materials = useGetLatestData(`/materials/counts?sessionId=${sessionId}`)
    const materialsCount = materials[0]?.count
    // console.log(materials[0], materialsCount);
    console.log(data)
    return (
        <section className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Info
                itemName='Materials Uploaded'
                itemValue={materialsCount}
            />

            <div className="flex flex-col items-start gap-2">
                <h3>View materials</h3>
                <Tooltip title='View Materials'>
                    <Link to='/dashboard/student/allMaterials'>
                        <Button
                            shape="circle"
                            icon={<AiFillFileText />}
                            size="small"
                        ></Button>
                    </Link>
                </Tooltip>
            </div>
        </section>
    );
};

MaterialTab.propTypes = {
    sessionId: PropTypes.string
}

export default MaterialTab;