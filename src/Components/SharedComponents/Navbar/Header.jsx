// Header.js
import { useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import ThemeController from "../../ThemeController";
import { NavLink } from 'react-router-dom';
import UserControls from './UserControlls';

const Header = ({ user, userImage, handleLogout, routes }) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`border border-red-300 w-full h-[50px] fixed z-50 ${isSticky && 'stickyNav'}`}>
            <div className="h-full container mx-auto w-full md:flex items-center gap-6 md:px-4">
                <NavLink to='/' className={`text-xl mr-auto ${!isSticky ? 'text-black' : 'text-white'}`}>
                    ClassMate
                </NavLink>
                <NavLinks routes={routes} isSticky={isSticky} />
                <ThemeController />
                <UserControls userImage={userImage} handleLogout={handleLogout} />
            </div>
        </div>
    );
};

export default Header;
