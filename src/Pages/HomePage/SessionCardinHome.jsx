import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Tooltip } from 'antd';
import useTodaysDate from '../../CustomHooks/useTodaysDate';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const { Meta } = Card;


const SessionCardinHome = ({ session }) => {

    const todaysDateString = useTodaysDate()
    // console.log(todaysDate)
    console.log(session)

    const sessionId = session?._id
    const sessionImage = session?.sessionImage
    const sessionTitle = session?.sessionTitle
    const sessionTutorImage = session?.tutorPhoto
    const sessionTutorName = session?.tutorName
    const sessionDescription = session?.description
    const regStartDateString = session?.registrationStarts
    const regEndDateString = session?.registrationEnds

    const todaysDate = new Date(todaysDateString)
    const regEndDate = new Date(regEndDateString)

    // console.log( todaysDate,  regEndDate, regEndDate > todaysDate)
    let status = 'Ongoing'
    if (regEndDate < todaysDate) {
        status = 'Closed'
    }
    else {
        status = 'Ongoing'
    }

    const splittedDescription = sessionDescription.split(' ')
    const slicedDescription = splittedDescription.slice(0, 10)
    const shortenedDescription = slicedDescription.join(' ')
    // console.log(shortenedDescription)

    return (

        <Badge.Ribbon text={status} placement='start'>
            <Card
                className='flex flex-col justify-between'
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
                        <Button  size='small'>Details</Button>
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