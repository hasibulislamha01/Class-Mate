import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashBoard = () => {
    return (
        <div className="h-screen rounded-3xl bg-[#1d2b3a] w-[15%] flex justify-center items-center">
            
                <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'w-full rounded-2xl m-2  p-1 flex items-center justify-center gap-6 text-white bg-blue-500' : 'w-full rounded-2xl m-2 p-1 flex items-center justify-center gap-6 text-white'}>
                    <FaUser></FaUser>
                    <h3 className='text-xl'>User</h3>
                </NavLink>
            
        </div>
    );
};

export default DashBoard;