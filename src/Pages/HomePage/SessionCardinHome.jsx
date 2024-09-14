import { Avatar, Button, Card, Tooltip } from 'antd';
import useTodaysDate from '../../CustomHooks/useTodaysDate';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const { Meta } = Card;


const SessionCardinHome = ({ session }) => {

    const todaysDateString = useTodaysDate()
    // console.log(todaysDate)
    // console.log(session)

    const sessionId = session?._id
    const sessionImage = session?.sessionImage
    const sessionTitle = session?.sessionTitle
    const sessionTutorImage = session?.tutorPhoto
    const sessionTutorName = session?.tutorName
    const sessionDescription = session?.description
    // const regStartDateString = session?.registrationStarts
    const regEndDateString = session?.registrationEnds

    const todaysDate = new Date(todaysDateString)
    const regEndDate = new Date(regEndDateString)

    // console.log( todaysDate,  regEndDate, regEndDate > todaysDate)
    let statusColor = 'bg-sky-400'
    if (regEndDate < todaysDate) {
        statusColor = 'bg-red-400'
    }
    else {
        statusColor = 'bg-green-500'
    }

    const splittedDescription = sessionDescription.split(' ')
    const slicedDescription = splittedDescription.slice(0, 10)
    const shortenedDescription = slicedDescription.join(' ')
    // console.log(shortenedDescription)

    return (

        <div className='relative '>
            <Card
                className='flex flex-col justify-between h-full mx-auto'
                style={{
                    width: 300,
                }}
                cover={
                    <img
                        alt="example"
                        src={sessionImage}
                        className='h-[200px] object-cover tooltip'
                    />
                }
                actions={[
                    <Link to={`/sessionDetails/${sessionId}`} key='viewSessionDetails'>

                        <Button>View Details</Button>
                    </Link>,
                ]}
            >


                <Meta
                    avatar={
                        <Tooltip placement="top" title={sessionTutorName} arrow={true} >
                            <Avatar src={sessionTutorImage} />
                        </Tooltip>
                    }
                    title={sessionTitle}
                    description={`${shortenedDescription} ...`}
                />

            </Card>

            {/* status indicator */}
            <div className={`absolute right-[5%] top-[60%] w-4 h-4 rounded-full ${statusColor}`}>

            </div>
        </div>


    );
};

SessionCardinHome.propTypes = {
    session: PropTypes.object
}

export default SessionCardinHome;