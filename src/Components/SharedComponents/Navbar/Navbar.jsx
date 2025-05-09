import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../CustomHooks/useAuth";
import useUserRole from "../../../CustomHooks/useUserRole";
import SideNavBar from "../SideNavBar";
import { useEffect, useState } from "react";
import './Navbar.css'
import ThemeController from "../../ThemeController";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import { Dropdown, message } from "antd";
import { AiOutlineLogin } from "react-icons/ai";
import { VscSaveAs } from "react-icons/vsc";
import { RxAvatar } from "react-icons/rx";



const Navbar = () => {

    const axiosPublic = useAxiosPublic()
    const { user, logoutUser } = useAuth()
    const navigate = useNavigate()
    const [dashboardLink, setDashboardLink] = useState({ link: '/login', title: 'Login' })
    const { role, refetch } = useUserRole()
    const [isSticky, setIsSticky] = useState(false)

    // console.log('user role in navbar is : ', role)

    const userImage = user ? user?.photoURL : 'avatar.gif'

    if (role === undefined) { refetch() }
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    })


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
                refetch()
                message.success('Logout Successfull')
                navigate('/')
            }).catch((error) => {
                console.error(error.message)
                message.error(error.message)
            });
    }


    // delete user
    const deleteUser = async (email) => {
        try {
            const response = await axiosPublic.delete(`/users/${email}`);

            if (response.status === 200) {
                console.log('User deleted successfully:', response.data.message);
                message.success(response.data.message)
                handleLogout()

            } else {
                console.error('Error deleting user:', response.data.message || 'Unknown error');
                message.error(response.data.message)
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error(error)
        }
    }

    // console.log("user role is: ", role);

    // let title = 'Login'
    useEffect(() => {
        if (role === 'administrator') {
            setDashboardLink({ link: '/dashboard/admin/profile', title: 'Dashboard' })
        }
        else if (role === 'tutor') {
            setDashboardLink({ link: '/dashboard/tutor/profile', title: 'Dashboard' })
        }
        else if (role === 'student') {
            setDashboardLink({ link: '/dashboard/student/profile', title: 'Dashboard' })
        } else if (role === 'unknown') {
            setDashboardLink({ link: '/dashboard/user', title: 'Dashboard' })
        } else {
            setDashboardLink({ link: '/login', title: 'Login' })
        }
    }, [role])





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
            link: dashboardLink?.link,
            title: dashboardLink?.title,
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
        },
        {
            key: '3',
            label: (
                <button onClick={() => deleteUser(user?.email)}>
                    Delete account
                </button>
            ),
        },
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
    // console.log(user);
    if (user) {
        items = userItems
    } else {
        items = guestItems
    }



    return (
        <div className={`w-full h-[50px] fixed z-50 flex items-center px-2 md:px-0 ${isSticky ? 'stickyNav shadow-lg dark:bg-slate-900/95' : 'bg-white/40 dark:bg-slate-900/60'}`}>

            {/* website name visible in mobiles */}
            <NavLink to='/' className={`md:hidden text-lg font-bold mr-auto`}>
                {/* <img src="/favicon.png" /> */}
                <h1>
                    <span className={`font-semibold ${isSticky ? 'text-accent' : 'text-primary'}`}> Class</span>
                    <span className={`font-semibold ${isSticky ? 'text-secondary' : 'text-primary'} `}>Mate</span>
                </h1>
            </NavLink>

            {/* horizontal navbar */}
            <div className="hidden h-full container mx-auto w-full md:flex items-center gap-6 md:px-4 font-bold">

                {/* website name visible in larger screens */}
                <NavLink to='/' className={`text-xl font-bold mr-auto flex items-center gap-2 ${!isSticky ? 'text-black' : 'text-white'}`}>
                    <div className="hidden md:inline-flex">
                        <img src="/favicon.png" className="w-8 h-8 " />
                    </div>
                    <h1>
                        <span className={`font-semibold ${isSticky ? 'text-accent' : 'text-primary  dark:text-accent'}`}> Class</span>
                        <span className={`font-semibold ${isSticky ? 'text-secondary' : 'text-primary dark:text-secondary'} `}>Mate</span>
                    </h1>
                </NavLink>

                <div className="hidden h-full md:flex items-center gap-6 font-bold">
                    {
                        navigationRoutes?.map(routes =>
                            <NavLink
                                key={routes.link}
                                to={routes.link}
                                className={({ isActive }) => `font-semibold ${isActive ? isSticky ? 'text-secondary' : 'text-primary dark:text-secondary' : `${isSticky ? 'text-accent' : 'text-gray-500 dark:text-gray-300'}`} `}

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
                                <img id='userImage' src={userImage} alt="user image" className="h-8 w-8 rounded-full object-cover" />
                            ) : (

                                <RxAvatar size={30} fill="#F4E04D" className="text-accent" />
                            )
                        }
                    </Dropdown>

                </div>

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