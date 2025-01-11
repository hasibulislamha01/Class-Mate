import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../CustomHooks/useAuth";
import toast from "react-hot-toast";
import useUserRole from "../../../CustomHooks/useUserRole";
import SideNavBar from "../SideNavBar";
import { useEffect, useState } from "react";
import './Navbar.css'
import ThemeController from "../../ThemeController";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import { Dropdown } from "antd";
import { AiOutlineLogin } from "react-icons/ai";
import { VscSaveAs } from "react-icons/vsc";
import { RxAvatar } from "react-icons/rx";




const Navbar = () => {

    const axiosPublic = useAxiosPublic()
    const { user, logoutUser } = useAuth()
    const navigate = useNavigate()
    const role = useUserRole()
    console.log(role);
    const [isSticky, setIsSticky] = useState(false)

    const userImage = user ? user?.photoURL : 'avatar.gif'

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [])


    // useEffect(() => {
    //     const userControlls = document.getElementById('userImage');
    //     const dropdown = document.getElementById('dropdown');

    //     const showDropDown = () => {
    //         dropdown.classList.remove('hidden');
    //     };

    //     const hideDropDown = () => {
    //         dropdown.classList.add('hidden');
    //     };

    //     if (userControlls) {
    //         userControlls.addEventListener('mouseover', showDropDown);
    //     }

    //     if (dropdown) {
    //         // Keep the dropdown visible when hovering over it
    //         dropdown.addEventListener('mouseover', showDropDown);

    //         // Hide dropdown when the mouse leaves the dropdown area
    //         dropdown.addEventListener('mouseleave', hideDropDown);
    //     }

    //     // Cleanup event listeners
    //     return () => {
    //         if (userControlls) {
    //             userControlls.removeEventListener('mouseover', showDropDown);
    //         }
    //         if (dropdown) {
    //             dropdown.removeEventListener('mouseover', showDropDown);
    //             dropdown.removeEventListener('mouseleave', hideDropDown);
    //         }
    //     };
    // }, []);


    // logout function
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


    // delete user
    const handleDeleteUser = () => {
        axiosPublic.delete(`/users/:${user?.userEmail}`)
            .then(res => {
                console.log('deleted user', res);

            }).catch(error => {
                console.error(error, error?.message);

            })
    }

    console.log("user role is: ", role);
    let dashboardLink = '/login'
    let title = 'Login'
    if (role === 'administrator') {
        dashboardLink = '/dashboard/admin'
        title = 'Dashboard'
    }
    else if (role === 'tutor') {
        dashboardLink = '/dashboard/tutor'
        title = 'Dashboard'
    }
    else if (role === 'student') {
        dashboardLink = '/dashboard/student'
        title = 'Dashboard'
    } else {
        dashboardLink = '/login',
            title = 'Login'
    }




    const navigationRoutes = [
        {
            link: '/',
            title: 'Home',
            style: '',
        },
        {
            link: '/sessions',
            title: 'All Sessions',
            style: '',
        },
        {
            link: dashboardLink,
            title: title,
            style: user && role ? 'flex' : 'hidden',
        },

    ]

    const userItems = [
        {
            key: '1',
            label: (
                <button onClick={handleLogout}>
                    Logout
                </button>
            ),

        },
        {
            key: '2',
            label: (
                <button>
                    Update Profile
                </button>
            ),
        }
    ]

    const guestItems = [
        {
            key: '1',
            label: (
                <Link to='/login'>
                    Sign In
                </Link>
            ),
            icon: <AiOutlineLogin />
        },
        {
            key: '2',
            label: (
                <Link to='/register'>
                    Sign Up
                </Link>
            ),
            icon: <VscSaveAs />
        },
    ]

    let items;
    console.log(user);
    if (user) {
        items = userItems
    } else {
        items = guestItems
    }



    return (
        <div className={`w-full h-[50px] fixed z-50 flex items-center px-2 md:px-0 shadow-lg  ${isSticky && 'stickyNav shadow-lg'}`}>

            {/* website name visible in mobiles */}
            <NavLink to='/' className={`md:hidden text-xl mr-auto ${!isSticky ? 'text-black' : 'text-white'}`}>
                {/* <img src="/favicon.png" /> */}
                <h1>ClassMate</h1>
            </NavLink>

            {/* horizontal navbar */}
            <div className="hidden h-full container mx-auto w-full md:flex items-center gap-6 md:px-4 font-bold">

                {/* website name visible in larger screens */}
                <NavLink to='/' className={`text-xl mr-auto flex items-center gap-2 ${!isSticky ? 'text-black' : 'text-white'}`}>
                    <div className="hidden md:inline-flex">
                        <img src="/favicon.png" className="w-8 h-8 " />
                    </div>
                    <h1>ClassMate</h1>
                </NavLink>

                <div className="hidden h-full md:flex items-center gap-6">
                    {
                        navigationRoutes?.map(routes =>
                            <NavLink
                                key={routes.link}
                                to={routes.link}
                                className={({ isActive }) => isActive ? `${isSticky ? 'text-secondary' : 'text-primary'} ${routes.style}`
                                    :
                                    `${isSticky ? 'text-white' : 'text-gray-500'}`}
                            >
                                {routes.title}
                            </NavLink>
                        )
                    }
                </div>

                <div className="ml-5 flex items-center gap-2">
                    <ThemeController />
                    <Dropdown menu={{ items }} placement="bottom" arrow>
                        {
                            user ? (
                                <img id='userImage' src={userImage} alt="user image" className="h-8 w-8 rounded-full" />
                            ) : (

                                <RxAvatar size={30} fill="#F4E04D" className="text-accent" />
                            )
                        }
                    </Dropdown>

                </div>

            </div>

            {/* user controlls dropdown */}
            <div className="">

                {/* {
                    user ?
                        <>
                            <button
                                onClick={handleLogout}
                                className="btn h-[40px] btn-block border-transparent bg-sky-400 hover:bg-primary hover:text-white dark:bg-primary dark:hover:bg-sky-400 dark:text-white dark:hover:text-black transition-all duration-500"
                            >
                                Logout
                            </button>


                            <button
                                onClick={handleDeleteUser}
                                className="btn h-[40px] btn-block border-transparent bg-sky-400 hover:bg-primary hover:text-white dark:bg-primary dark:hover:bg-sky-400 dark:text-white dark:hover:text-black transition-all duration-500"
                            >
                                Delete Account
                            </button>

                        </>
                        :
                        <NavLink to={'/login'}>
                            <button
                                className="btn h-[40px] btn-block border-transparent bg-sky-400 hover:bg-primary hover:text-white transition-all duration-500">
                                Login
                            </button>
                        </NavLink>
                } */}

            </div>

            {/* mobile navbar */}
            <SideNavBar
                user={user}
                handleLogout={handleLogout}
                dashboardLink={dashboardLink}
            ></SideNavBar>
        </div>
    );
};

export default Navbar;