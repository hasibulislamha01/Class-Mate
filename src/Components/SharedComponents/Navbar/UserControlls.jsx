// UserControls.js
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'

const UserControls = ({ userImage, handleLogout }) => {
    useEffect(() => {
        const userControlls = document.getElementById('userImage');
        const dropdown = document.getElementById('dropdown');

        const showDropDown = () => dropdown.classList.remove('hidden');
        const hideDropDown = () => dropdown.classList.add('hidden');

        if (userControlls) {
            userControlls.addEventListener('mouseover', showDropDown);
        }

        if (dropdown) {
            dropdown.addEventListener('mouseover', showDropDown);
            dropdown.addEventListener('mouseleave', hideDropDown);
        }

        return () => {
            if (userControlls) userControlls.removeEventListener('mouseover', showDropDown);
            if (dropdown) {
                dropdown.removeEventListener('mouseover', showDropDown);
                dropdown.removeEventListener('mouseleave', hideDropDown);
            }
        };
    }, []);

    return (
        <div className="ml-5 flex items-center gap-2">
            <img id='userImage' src={userImage} alt="user image" className="h-8 w-8 rounded-full" />

            <div id="dropdown" className="absolute top-[85%] left-[83%] hidden w-[150px] rounded-[7px] bg-sky-200 text-primary space-y-2 py-2 px-2">
                {userImage ? (
                    <>
                        <button onClick={handleLogout} className="btn h-[40px] btn-block">
                            Logout
                        </button>
                        <button className="btn h-[40px] btn-block">Update Profile</button>
                    </>
                ) : (
                    <NavLink to={'/login'}>
                        <button className="btn h-[40px] btn-block">Login</button>
                    </NavLink>
                )}
            </div>
        </div>
    );
};

UserControls.propTypes = {
    userImage: PropTypes.string,
    handleLogout: PropTypes.func
}

export default UserControls;
