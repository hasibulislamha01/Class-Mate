import PropTypes from 'prop-types'
import SessionCard from './SessionCard';


const GridView = ({ sessions, handleRedirect }) => {



    return (

        // grid container
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center justify-items-stretch gap-4 lg:gap-6">
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