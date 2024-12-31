import { Button } from "antd";
import Info from "./Info";


const MaterialTab = () => {

    const iterableItems = [
        { itemName: 'Uploaded', itemValue: '2', unit: 'materials' },
        { itemName: 'Requests', itemValue: '3' },
    ]
    return (

        <div>

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

            <Button
                shape="circle"
            // icon={}
            >
                u
            </Button>

        </div>
    );
};

export default MaterialTab;