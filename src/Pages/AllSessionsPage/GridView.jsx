import PropTypes from 'prop-types'
import SessionCard from './SessionCard';


const GridView = ({ sessions, handleRedirect }) => {



    return (

        // grid container
        <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-6">
            {
                sessions?.map(session =>

                    <SessionCard
                        key={session._id}
                        session={session}
                        handleRedirect={handleRedirect}
                    />

                )
            }
        </div>
    );
};


GridView.propTypes = {
    sessions: PropTypes.array,
    handleRedirect: PropTypes.func
}

export default GridView;