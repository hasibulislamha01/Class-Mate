import PropTypes from 'prop-types'
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Tooltip } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';
import { MdOutlineChromeReaderMode } from "react-icons/md";

const BookedSessionCard = ({ bookedSession }) => {

    const location = useLocation()

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
                <div key={'bottom-action'} className='flex items-center justify-between'>
                    {/* <Button key='registerSession' size='small'>Register</Button>, */}
                    <Link to={`/sessionDetails/${bookedSession?.sessionId}/#review`}
                    state={location.pathname}
                    >
                        <Tooltip placement="top" title='Give Review' arrow={true}>
                            <EditOutlined key="edit" />
                        </Tooltip>
                    </Link>

                    <Divider type="vertical" className=' border-gray-300' />

                    <Link to={`/sessionDetails/${bookedSession?.sessionId}`}
                    state={location.pathname} key='viewSessionDetails'>
                        <Tooltip placement="top" title='View Details' arrow={true} className='w-full mt-1 text-[15px]'>
                        <MdOutlineChromeReaderMode />
                        </Tooltip>
                    </Link>,
                </div>
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