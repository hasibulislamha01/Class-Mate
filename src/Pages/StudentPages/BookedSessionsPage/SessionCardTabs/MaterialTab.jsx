import Info from "../../../../Components/UI/TabCard/Info";
import useGetLatestData from "../../../../CustomHooks/useGetLatestData";

const MaterialTab = ({ sessionId }) => {
    const [data] = useGetLatestData(`/materials/student/${sessionId}`)
    const materials = useGetLatestData(`/materials/counts?sessionId=${sessionId}`)
    const materialsCount = materials[0].data.count
    console.log(materials[0], materialsCount);
    return (
        <section>
            <Info
                itemName='Materials Uploaded'
                itemValue={data}
            />
        </section>
    );
};

export default MaterialTab;