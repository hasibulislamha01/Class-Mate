import { Link } from "react-router-dom";
import useTodaysDate from "../../CustomHooks/useTodaysDate";
import PropTypes from 'prop-types'
import { Avatar, Button, Card } from "antd";
import Meta from "antd/es/card/Meta";


const SessionCard = ({ session }) => {

    const todaysDateString = useTodaysDate()
    const regEndDateString = session?.registrationEnds
    const todaysDate = new Date(todaysDateString)
    const regEndDate = new Date(regEndDateString)


    const status = session?.status

    let statusColor
    if (status === "pending") {
        statusColor = 'bg-orange-500'
    }
    else if (status === "rejected") {
        statusColor = 'bg-red-600'
    } else if (regEndDate < todaysDate) {
        statusColor = 'bg-red-400'
    } else if (status === "approved") {
        statusColor = 'bg-green-500'
    }


    return (

        <Card
            style={{
                width: 300,
                height: 350
            }}
            styles={{
                cover: {
                    height: 160
                }
            }}
            cover={
                <img
                    alt="example"
                    src={session?.sessionImage}
                    className="h-full object-cover"
                />
            }
        // actions={[
        //     <SettingOutlined key="setting" />,
        //     <EditOutlined key="edit" />,
        //     <EllipsisOutlined key="ellipsis" />,
        // ]}
        >
            <Meta
                avatar={<Avatar src={session?.tutorPhoto} />}
                title={
                    <div className="flex items-center">
                        <h3 className="font-semibold">{session.sessionTitle}</h3>
                        <span className={`ml-auto w-2 h-2 ${statusColor} rounded-full`}></span>
                    </div>
                }

            />

            <div className="h-full flex flex-col justify-between gap-4 mt-3">
                <p className="text-text/80">{session?.description.split('')?.slice(0, 75)?.join('')} ...</p>
                <Link to={`/sessions/${session._id}`} className="flex justify-center items-center">
                    <Button type="primary" size="small" className="w-1/2 mx-auto">View Details</Button>
                </Link>
            </div>
        </Card>
    );
};


SessionCard.propTypes = {
    session: PropTypes.object,
    handleRedirect: PropTypes.func
}
export default SessionCard;