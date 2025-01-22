import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MakeCardTitle = ({tutorPhoto, sessionId, sessionTitle}) => {
    return (
        <div className='flex items-center gap-4'>
            <img src={tutorPhoto} alt="tutor photo" className='h-8 w-8 object-cover rounded-full' />
            <Link to={`/sessions/${sessionId}`}>
                <h1 className='font-bold text-primary hover:underline hover:underline-offset-4'>{sessionTitle}</h1>
            </Link>
            <h3 className='ml-2 font-md text-xs'></h3>
        </div>
    );
};

MakeCardTitle.propTypes = {
 tutorPhoto: PropTypes.string,
 sessionId: PropTypes.string,
 sessionTitle: PropTypes.string,
}

export default MakeCardTitle;