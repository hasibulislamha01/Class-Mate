import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import toast from "react-hot-toast";
import useUserRole from "../../CustomHooks/useUserRole";
import SideNavBar from "./SideNavBar";


const Navbar = () => {
    const { user, logoutUser } = useAuth()
    const navigate = useNavigate()

    const role = useUserRole()
    const userImage = user ? user?.photoURL : 'avatar.gif'

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                console.log("logout successfull")
                toast.success('Logout Successfull')
                navigate('/')
            }).catch((error) => {
                console.error(error.message)
                toast.error(error.message)
            });
    }

    let dashboardLink = '/dashboard'
    if (role === 'Administrator') {
        dashboardLink = '/dashboard/admin/allUsers'
    }
    else if (role === 'Tutor') {
        dashboardLink = '/dashboard/tutor'
    }
    else if (role === 'Student') {
        dashboardLink = '/dashboard/student'
    }

    const navItems =
        <>
            <NavLink to='/'>Home</NavLink>
            {user && <NavLink to={dashboardLink}>Dashboard</NavLink>}
            {!user && <NavLink to='/login'>Login</NavLink>}

        </>
    return (
        <div className="w-full h-[50px] fixed z-50 flex items-center justify-center">
            <div className="navbar container mx-auto min-w-12  flex justify-between ">
                <div className="navbar-start">
                   
                    <a className="btn btn-ghost text-xl">ClassMate</a>
                </div>
               
                <div className="navbar-end  items-center gap-4 hidden lg:inline-flex">
                    {navItems}
                    <div className="">
                        <div className="dropdown dropdown-hover dropdown-end relative">
                            <div tabIndex={0} role="button" className="opacity-70">
                                <img className="w-10 h-10 rounded-full object-cover" src={userImage} alt="" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                {
                                    user ?
                                        <>
                                            <li><a>{user?.displayName}</a></li>
                                            <li onClick={handleLogout}> <a >Logout</a></li>
                                            <li><Link className={user ? 'inline-block' : 'hidden'} to='/updateProfile'>Update Profile</Link></li>
                                        </>
                                        :
                                        <>
                                            <li><Link to='/login'><a href="">Login</a></Link></li>
                                            <li>
                                                <Link to='/register'><a href="">Register</a></Link>
                                            </li>
                                        </>
                                }

                            </ul>
                        </div>


                    </div>
                </div>
                <SideNavBar
                    user={user}
                    handleLogout={handleLogout}
                    dashboardLink={dashboardLink}
                ></SideNavBar>
            </div>
        </div>
    );
};

export default Navbar;