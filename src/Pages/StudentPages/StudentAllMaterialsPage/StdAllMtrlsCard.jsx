import { Avatar, Button, Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const StdAllMtrlsCard = ({ bookedSession }) => {

    const splittedDescription = bookedSession?.description?.split(' ')
    const slicedDescription = splittedDescription.slice(0, 10)
    const shortenedDescription = slicedDescription.join(' ')


    return (
        <Card
            className='flex flex-col justify-between h-full mx-auto shadow-lg dark:bg-dark-accent dark:border-dark-accent text-text dark:text-dark-text'
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
                    <Link to={`/dashboard/student/allMaterials/${bookedSession?.sessionId}`}>
                        <Button> View Materials </Button>
                    </Link>

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


StdAllMtrlsCard.propTypes = {
    bookedSession: PropTypes.object
}
export default StdAllMtrlsCard;