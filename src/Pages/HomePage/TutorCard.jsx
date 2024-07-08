import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const TutorCard = ({ tutor }) => {
    return (
        <Card
            className="h-full"
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="example" src={tutor?.userPhoto} className="h-[250px] object-cover" />}
        >
            <Meta className="text-center" title={tutor?.userName}/>
        </Card>
    );
};

export default TutorCard;