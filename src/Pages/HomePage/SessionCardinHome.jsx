import { EditOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Tooltip } from 'antd';
import useTodaysDate from '../../CustomHooks/useTodaysDate';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { IoReaderOutline } from "react-icons/io5";

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
    let status = 'Ongoing'
    let statusColor = 'blue'
    if (regEndDate < todaysDate) {
        status = 'Closed'
        statusColor = 'red'
    }
    else {
        status = 'Ongoing'
        statusColor = '#16a34a'
    }

    const splittedDescription = sessionDescription.split(' ')
    const slicedDescription = splittedDescription.slice(0, 10)
    const shortenedDescription = slicedDescription.join(' ')
    // console.log(shortenedDescription)

    return (

        <Badge.Ribbon text={status} placement='start' className='custom-ribbon' color={statusColor}>
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
                    <Button key='registerSession' size='small'>Register</Button>,
                    <EditOutlined key="edit" />,
                    <Link to={`/sessionDetails/${sessionId}`} key='viewSessionDetails'>
                        <Tooltip placement="top" title='View Details' arrow={true} className='w-full mt-1 text-[15px]'>
                            <IoReaderOutline />
                        </Tooltip>
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
        </Badge.Ribbon>


    );
};

SessionCardinHome.propTypes = {
    session: PropTypes.object
}

export default SessionCardinHome;