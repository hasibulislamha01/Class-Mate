import { Link } from "react-router-dom";
import useTodaysDate from "../../CustomHooks/useTodaysDate";
import PropTypes from 'prop-types'
import { Avatar, Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";


const SessionCard = ({ session }) => {

    const todaysDateString = useTodaysDate()
    const [statusColor, setStatusColor] = useState('')



    useEffect(() => {
        const status = session?.status
        const regEndDateString = session?.registrationEnds
        const todaysDate = new Date(todaysDateString)
        const regEndDate = new Date(regEndDateString)
        // console.log(session?.sessionTitle, regEndDate < todaysDate)

        if (status === "pending") {
            setStatusColor('bg-orange-500')
        } else if (status === "rejected") {
            setStatusColor('bg-red-600')
        } else if (status === 'renewed') {
            setStatusColor('bg-blue-500')
        }
        else if (regEndDate < todaysDate) {
            setStatusColor('bg-red-400')
        }
        else if (regEndDate >= todaysDate) {
            setStatusColor('bg-green-500')
        }
        // console.log(`${session?.sessionTitle}`, status)
    }, [session, todaysDateString])

    // console.log(statusColor)

    return (

        <Card
            className="bg-accent dark:bg-dark-accent shadow-lg shadow-primary/20"
            style={{
                width: 300,
                height: 350,
                border: '0px'
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
        >
            <Meta
                className=""
                avatar={<Avatar src={session?.tutorPhoto} />}
                title={
                    <div className="flex items-center">
                        <h3 className="font-semibold dark:text-dark-text">{session.sessionTitle}</h3>
                        <span className={`ml-auto w-2 h-2 ${statusColor} rounded-full`}></span>
                    </div>
                }

            />

            <div className="h-full flex flex-col justify-between gap-4 mt-3">
                <p className="text-text/80 dark:text-dark-text/60">{session?.description.split('')?.slice(0, 75)?.join('')} ...</p>
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