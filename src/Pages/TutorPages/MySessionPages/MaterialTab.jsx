import Info from "./Info";

const MaterialTab = () => {

    const iterableItems = [
        { itemName: 'Uploaded', itemValue: '2', unit: 'materials' },
        { itemName: 'Requests', itemValue: '3'},
    ]
    return (
        <div className="grid grid-cols-2 place-items-center justify-items-start gap-x-5">
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
    );
};

export default MaterialTab;