import { Link } from "react-router-dom";
import useTodaysDate from "../../CustomHooks/useTodaysDate";
import PropTypes from 'prop-types'


const SessionCard = ({ session }) => {

    const todaysDateString = useTodaysDate()
    const regEndDateString = session?.registrationEnds
    const todaysDate = new Date(todaysDateString)
    const regEndDate = new Date(regEndDateString)


    const status = session?.status

    let statusColor
    if (status === "pending") {
        statusColor = 'bg-orange-500'
    }
    else if (status === "rejected") {
        statusColor = 'bg-red-600'
    } else if (regEndDate < todaysDate) {
        statusColor = 'bg-red-400'
    } else if (status === "approved") {
        statusColor = 'bg-green-500'
    }


    return (
        <div key={session?._id} className="card w-[300px] h-[350px]  rounded-[7px] border border-accent dark:border-dark-accent flex flex-col justify-between bg-sky-50 dark:bg-gray-900 shadow-lg shadow-primary/20 dark:shadow-dark-accent">

            <img className='h-1/2 object-cover rounded-t-[7px]' src={session?.sessionImage} alt="session image" />


            {/* card body */}
            <div className='p-4 '>
                <div className=' flex items-center gap-4'>
                    <img src={session?.tutorPhoto} alt="tutor photo" className='w-8 h-8 rounded-full object-cover' />
                    <h1 className="text-lg text-center font-semibold">
                        {session.sessionTitle}
                    </h1>
                    <div className={`ml-auto w-2 h-2 ${statusColor} rounded-full`} ></div>
                </div>

                <p className='text-sm ml-12 text-gray-500/90'>
                    {session?.description.split(' ')?.slice(0, 12)?.join(' ')}...
                </p>
            </div>



            <Link to={`/sessions/${session._id}`} className="flex justify-center items-center">

                <button
                    className='mb-6 btn btn-sm w-[120px] mx-auto text-sm font-bold bg-primary/80 text-white hover:bg-primary rounded-md dark:border-dark-background'
                    
                >
                    View Details
                </button>

            </Link>


        </div>
    );
};


SessionCard.propTypes = {
    session: PropTypes.object,
    handleRedirect: PropTypes.func
}
export default SessionCard;