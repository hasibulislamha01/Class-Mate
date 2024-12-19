import PropTypes from 'prop-types'
import SessionCard from '../../Components/SharedComponents/SessionCard';


const GridView = ({ sessions, handleRedirect }) => {



    return (

        // grid container
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center  gap-y-5 lg:gap-y-8 ">
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