import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'

const DashBoard = ({ routes }) => {
    console.log(routes)
    return (
        <div className="h-screen mt-12 rounded-r-3xl bg-[#1d2b3a] w-[20%]  flex-col justify-center items-center hidden md:flex md:w-auto px-2">

            {
                routes?.map(route =>
                    <NavLink key={route.link} to={route.link} className={({ isActive }) => isActive ? 'w-full rounded-2xl m-2  p-1 flex items-center justify-center gap-6 text-white bg-blue-500' : 'w-full rounded-2xl my-2 p-1 flex items-center justify-start text-white px-5 gap-3'}>
                        <h3>{route.icon}</h3>
                        <h3 className='text-xl'>{route.linkTitle}</h3>
                    </NavLink>
                )
            }

        </div>
    );
};

DashBoard.propTypes = {
    routes: PropTypes.array
}

export default DashBoard;