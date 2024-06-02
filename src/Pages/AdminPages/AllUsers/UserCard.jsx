import PropTypes from 'prop-types'
import { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

const UserCard = ({ userInfo }) => {
    const role = userInfo?.role
    const [newRole, setNewRole] = useState(role)
    console.log(newRole)
    return (
        <div className="card card-side bg-base-100 w-full shadow-xl h-32 space-x-4">
            <figure className='w-1/5 ml-4'><img className=' rounded-lg  object-cover w-16 h-16 lg:w-[80px]  lg:h-[80px]' src={userInfo?.userPhoto} alt="Movie" /></figure>

            <div className="flex flex-row justify-between items-center flex-1">

                <div className='ml-3'>
                    <h2 className="card-title">{userInfo?.userName}</h2>
                    <p className=' break-all'>{userInfo?.userEmail}</p>
                    <p className='mt-2 font-bold space-x-2'>
                        <span>
                            Role:
                        </span>
                        <span className={role === "Administrator" ? 'badge bg-rose-200 text-rose-500 p-3' : 'badge bg-sky-300 text-sky-600 p-3'}>
                            {userInfo?.role}
                        </span>
                    </p>
                </div>

                <div className="dropdown dropdown-end ml-4 ">
                    <div tabIndex={0} role="button" className="btn btn-sm  text-sm m-1"><FaExchangeAlt /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <button onClick={() => setNewRole('Student')}>Student</button>
                        </li>
                        <li>
                            <button onClick={() => setNewRole('Tutor')}>Tutor</button>
                        </li>
                        <li>
                            <button onClick={() => setNewRole('Administrator')}>Administrator</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    userInfo: PropTypes.object
}
export default UserCard;