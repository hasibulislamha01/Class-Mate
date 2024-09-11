// NavLinks.js
import { NavLink, useLocation } from "react-router-dom";

const NavLinks = ({ routes, isSticky }) => {
    const currentLocation = useLocation();

    return (
        <div className="hidden h-full md:flex items-center gap-6">
            {routes.map(route => (
                <NavLink 
                    key={route.link} 
                    to={route.link} 
                    className={currentLocation === route.link ? 'text-black' : (isSticky ? 'text-white' : 'text-black')}
                >
                    {route.title}
                </NavLink>
            ))}
        </div>
    );
};

export default NavLinks;
