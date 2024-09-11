import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";
import useUserRole from "../CustomHooks/useUserRole";
import toast from "react-hot-toast";

const Nav = () => {
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


    const navigationRoutes = [
        {
            link: '/',
            title: 'Home',
        },
        {
            link: '/sessions',
            title: 'All Sessions',
        },
        
    ]



    const navItems =
        <>
            <NavLink to='/' end className={({isActive}) => isActive ? 'text-sky-500 border-b-2 border-sky-500' : 'border-gray-500'}>Home</NavLink>
            {user && <NavLink to={dashboardLink} className={({isActive}) => isActive ? 'text-sky-500 border-b-2 border-sky-500' : 'text-gray-500'}>Dashboard</NavLink>}
            {!user && <NavLink to='/login' className={({isActive}) => isActive ? 'text-sky-500 border-b-2 border-sky-500' : 'border-gray-500'}>Login</NavLink>}

        </>

    return (
        <div className="navbar-end  items-center gap-4 hidden lg:inline-flex font-medium">
            {/* {navItems} */}
            <div className="flex items-center">
                {/* <ThemeController /> */}
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
    );
};

export default Nav;