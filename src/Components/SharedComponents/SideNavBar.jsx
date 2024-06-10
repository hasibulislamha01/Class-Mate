import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { GrMenu } from "react-icons/gr";
import { Link, NavLink } from 'react-router-dom';


const SideNavBar = ({ user, handleLogout, dashboardLink }) => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (
        <div className='lg:hidden'>
            <Button type="" onClick={showDrawer}>
                <GrMenu />
            </Button>
            <Drawer
                className='w-[300px]'
                title="Basic Drawer"
                onClose={onClose}
                open={open}>
                {
                    user ?
                        <div className='list-none flex flex-col justify-between gap-24  font-semibold text-lg '>
                            <li>
                                <img className='w-16 h-16 rounded-full' src={user?.photoURL} alt="" />
                                <li className='font-medium text-sm'><a>{user?.displayName}</a></li>
                            </li>
                            <div className='flex flex-col'>
                                <NavLink to='/'>Home</NavLink>
                                <NavLink to={dashboardLink}>Dashboard</NavLink>
                                <li onClick={() => handleLogout()}> <a >Logout</a></li>

                            </div>
                        </div>
                        :
                        <div className='list-none font-semibold text-lg space-y-2'>
                            <NavLink to='/'>Home</NavLink>
                            <li><Link to='/login'><a href="">Login</a></Link></li>
                            <li>
                                <Link to='/register'><a href="">Register</a></Link>
                            </li>
                        </div>
                }
            </Drawer>
        </div>
    );
};

export default SideNavBar;