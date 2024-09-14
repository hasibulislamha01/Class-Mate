import PropTypes from 'prop-types'
import SessionCard from './SessionCard';


const GridView = ({ sessions }) => {



    return (

        // grid container
        <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-6">
            {
                sessions?.map(session =>

                    <SessionCard
                        key={session._id}
                        session={session}
                    />

                )
            }
        </div>
    );
};


GridView.propTypes = {
    sessions: PropTypes.array
}

export default GridView;