import { Button, Tooltip } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiFillFileText } from "react-icons/ai";
import PropTypes from 'prop-types'
import ShowModal from "../../../../../Components/UI/ShowModal/ShowModal";
import UploadMaterial from "../../../UploadMaterialPage/UploadMaterial";
import { Link } from "react-router-dom";
import Info from "../../../../../Components/UI/TabCard/Info";
import useGetLatestData from "../../../../../CustomHooks/useGetLatestData";


const MaterialTab = ({ sessionId, tutorEmail, sessionImage }) => {

    const [data] = useGetLatestData(`/materials/counts?tutorEmail=${tutorEmail}`)


    const iterableItems = [
        { itemName: 'Uploaded', itemValue: data?.count || 0, unit: 'materials' },
    ]


    return (

            <div className="grid grid-cols-2 place-items-center justify-items-start gap-y-6 gap-x-8">
                {
                    iterableItems?.map(item =>
                        <Info
                            key={item?.itemName}
                            itemName={item.itemName}
                            itemValue={item.itemValue}
                            unit={item.unit || ''}
                            className={'border border-red-500'}
                        />
                    )
                }

                <div></div>


                {/* action buttons */}
               
                    <Tooltip title='View Materials'>
                        <Link to='/dashboard/tutor/myMaterials'>
                            <Button
                                // shape="circle"
                                size="small"
                                icon={<AiFillFileText />}
                            >View</Button>
                        </Link>
                    </Tooltip>

                    <Tooltip title='Upload Materials'>
                        <div>
                            <ShowModal
                                controlButton={
                                    <Button
                                        icon={<IoCloudUploadOutline />}
                                        size="small"
                                    >Upload</Button>
                                }
                                modalContent={<UploadMaterial
                                    sessionId={sessionId}
                                    tutorEmail={tutorEmail}
                                    sessionImage={sessionImage}
                                />}

                            />
                        </div>
                    </Tooltip>

            </div>

    );
};

MaterialTab.propTypes = {
    sessionId: PropTypes.string,
    tutorEmail: PropTypes.string,
    sessionImage: PropTypes.string,
}

export default MaterialTab;