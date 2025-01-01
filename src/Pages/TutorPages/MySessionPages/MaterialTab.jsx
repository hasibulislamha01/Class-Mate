import { Button, Tooltip } from "antd";
import Info from "./Info";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiFillFileText } from "react-icons/ai";


const MaterialTab = () => {

    const iterableItems = [
        { itemName: 'Uploaded', itemValue: '2', unit: 'materials' },
        { itemName: 'Requests', itemValue: '3' },
    ]
    return (

        <div className='flex items-center gap-5 border border-red-300'>

            <div className="grid grid-cols-1 place-items-center justify-items-start gap-y-4">
                {
                    iterableItems?.map(item =>
                        <Info
                            key={item?.itemName}
                            itemName={item.itemName}
                            itemValue={item.itemValue}
                            unit={item.unit || ''}
                        />
                    )
                }
            </div>

            <Tooltip title='View Materials'>

                <Button
                    shape="circle"
                    icon={<AiFillFileText />}
                ></Button>
            </Tooltip>

            <Tooltip title='Upload Materials'>
                <Button
                    shape="circle"
                    icon={<IoCloudUploadOutline />}
                ></Button>
            </Tooltip>

        </div>
    );
};

export default MaterialTab;