import PropTypes from 'prop-types'
import SessionCard from '../../Components/SharedComponents/SessionCard';


const GridView = ({ sessions, handleRedirect }) => {

    // console.log(sessions);

    return (
        <>
            {
                sessions?.length !== 0 ?
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
                    </div> :
                    <div className='min-h-[60vh] flex flex-col justify-center'>
                        <h3 className='text-center text-lg md:text-xl font-semibold text-red-500'>No Sessions Found</h3>
                    </div>
            }
        </>
    );
};


GridView.propTypes = {
    sessions: PropTypes.array,
    handleRedirect: PropTypes.func
}

export default GridView;