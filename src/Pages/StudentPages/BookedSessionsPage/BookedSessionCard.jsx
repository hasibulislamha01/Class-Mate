import PropTypes from 'prop-types'
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';

const BookedSessionCard = ({ bookedSession }) => {

    const splittedDescription = bookedSession?.description.split(' ')
    const slicedDescription = splittedDescription.slice(0, 10)
    const shortenedDescription = slicedDescription.join(' ')
    
    return (
        <Card
            className='flex flex-col justify-between h-full mx-auto'
            style={{
                width: 300,
            }}
            cover={
                <img
                    alt="example"
                    src={bookedSession?.sessionImage}
                    className='h-[200px] object-cover tooltip'
                />
            }
            actions={[
                <Button key='registerSession' size='small'>Register</Button>,
                <EditOutlined key="edit" />,
                <Link to={`/sessionDetails/${bookedSession?.sessionId}`} key='viewSessionDetails'>
                    <Button size='small'>Details</Button>
                </Link>,
            ]}
        >

            <Meta
                avatar={
                    <Tooltip placement="top" title={bookedSession?.tutorName} arrow={true} >
                        <Avatar src={bookedSession?.tutorPhoto} />
                    </Tooltip>
                }
                title={bookedSession?.sessionTitle}
                description={`${shortenedDescription} ...`}
            />

        </Card>
    );
};

BookedSessionCard.propTypes = {
    bookedSession: PropTypes.object
}

export default BookedSessionCard;