import PropTypes from 'prop-types'

import { Link, useLocation } from 'react-router-dom';


const BookedSessionCard = ({ bookedSession }) => {

    const location = useLocation()
    console.log(bookedSession);

    const splittedDescription = bookedSession?.description.split(' ')
    const slicedDescription = splittedDescription?.slice(0, 10)
    const shortenedDescription = slicedDescription?.join(' ')

    return (
        <div key={bookedSession?._id} className="card w-[300px] h-[350px]  rounded-[7px] border border-gray-200 flex flex-col justify-between dark:bg-gray-900">

            <img className='h-1/2 object-cover rounded-t-[7px]' src={bookedSession?.sessionImage} alt="session image" />


            {/* card body */}
            <div className='p-4 '>
                <div className=' flex items-center gap-4'>
                    <img src={bookedSession?.tutorPhoto} alt="tutor photo" className='w-8 h-8 rounded-full object-cover' />
                    <h1 className="text-lg text-center font-semibold">
                        {bookedSession.sessionTitle}
                    </h1>
                    <div className={`ml-auto w-4 h-4 ${''} rounded-full`} ></div>
                </div>

                <p className='text-sm ml-12'>
                    {shortenedDescription}...
                </p>
            </div>

            <div className='border-b-[1px] border-gray-200' />

            <div className='flex justify-evenly items-center p-4 '>

                <button className='h-[35px] px-2 rounded-md text-sm bg-white border border-primary text-primary hover:bg-primary active:scale-95 hover:text-white transition-all duration-100'>Give Review</button>

                <Link
                    to={`/sessionDetails/${bookedSession?.sessionId}`}
                    state={location.pathname}
                >
                    <button
                        className='h-[35px] px-2 rounded-md text-sm border border-primary text-primary hover:bg-primary active:scale-95 hover:text-white transition-all duration-100'
                    >
                        See Details
                    </button>
                </Link>

            </div>




        </div>
    );
};

BookedSessionCard.propTypes = {
    bookedSession: PropTypes.object
}

export default BookedSessionCard;