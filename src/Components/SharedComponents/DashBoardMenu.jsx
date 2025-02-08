import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import { FiUsers } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { LiaChalkboardTeacherSolid, LiaUserTieSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { GrDocumentUser, GrUserAdmin } from "react-icons/gr";
import { SlDocs } from "react-icons/sl";
import { PiGraduationCapLight } from "react-icons/pi";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ThemeController from "../ThemeController";
import { GoHome } from "react-icons/go";
// import { RiShutDownLine } from "react-icons/ri";
import { UserOutlined, VideoCameraAddOutlined } from '@ant-design/icons'
import { MdOutlineNoteAlt } from "react-icons/md";


const DashBoardMenu = ({ role }) => {

    // console.log(role)
    const defaultRoutes = [
        {
            link: '/',
            icon: <GoHome />,
            linkTitle: 'Home'
        },

    ]

    let dashboardRout = []

    const adminRoutes = [

        {
            link: '/dashboard/admin/profile',
            icon: <UserOutlined />,
            linkTitle: 'Profile'
        },
        {
            link: '/dashboard/admin/students',
            icon: <PiGraduationCapLight/>,
            linkTitle: 'Students'
        },
        {
            link: '/dashboard/admin/tutors',
            icon: <LiaUserTieSolid />,
            linkTitle: 'Tutors'
        },
        {
            link: '/dashboard/admin/administrators',
            icon: <GrUserAdmin />,
            linkTitle: 'Administrators'
        },
        {
            link: '/dashboard/admin/allSessions',
            icon: <LiaChalkboardTeacherSolid />,
            linkTitle: 'All Sessions'
        },
        {
            link: '/dashboard/admin/allMaterials',
            icon: <GiNotebook />,
            linkTitle: 'All Materials'
        },
    ]

    const tutorRoutes = [

        {
            link: '/dashboard/tutor/profile',
            icon: <UserOutlined key={'user'} />,
            linkTitle: 'Profile'
        },
        {
            link: '/dashboard/tutor/createSessions',
            icon: <VideoCameraAddOutlined key='create' />,
            linkTitle: 'Create Sessions'
        },
        {
            link: '/dashboard/tutor/mySessions',
            icon: <SiGoogleclassroom />,
            linkTitle: 'My Sessions'
        },
        // {
        //     link: '/dashboard/tutor/uploadMaterials',
        //     icon: <TbBookUpload />,
        //     linkTitle: 'Upload Materials'
        // },
        {
            link: '/dashboard/tutor/myMaterials',
            icon: <GrDocumentUser />,
            linkTitle: 'My Materials'
        },
        {
            link: '/dashboard/tutor/allNotes',
            icon: <SlDocs />,
            linkTitle: 'All Notes'
        },
    ]

    const studentRoutes = [

        {
            link: '/dashboard/student/profile',
            icon: <UserOutlined/>,
            linkTitle: 'Profile'
        },

        {
            link: '/dashboard/student/bookedSessions',
            icon: <GiNotebook />,
            linkTitle: 'Booked Sessions'
        },
        {
            link: '/dashboard/student/createNote',
            icon: <MdOutlineNoteAlt />,
            linkTitle: 'Create Note'
        },
        {
            link: '/dashboard/student/manageNotes',
            icon: <GiNotebook />,
            linkTitle: 'Manage Notes'
        },
        {
            link: '/dashboard/student/allMaterials',
            icon: <GiNotebook />,
            linkTitle: 'All Materials'
        },
    ]

    if (role === 'administrator') {
        dashboardRout = adminRoutes
    }
    else if (role === 'tutor') {
        dashboardRout = tutorRoutes
    }
    else if (role === "student") {
        dashboardRout = studentRoutes
    }


    return (
        <div className="h-screen pt-5 w-full flex flex-col justify-start bg-accent dark:bg-dark-accent dark:text-dark-text">



            {/* user based menues */}
            {
                role ?

                    <>
                        <div className="flex flex-col justify-start items-start px-1 lg:px-4 ">
                            <h4 className="hidden md:block uppercase mb-5 font-semibold text-gray-500 text-[0.6rem]  lg:text-xs">Dashboard</h4>

                            {
                                dashboardRout?.map(route =>

                                    <NavLink key={route.link} to={route.link} className={({ isActive }) => `text-xs lg:text-sm w-full py-2 transition-all duration-200 ${isActive ? 'bg-primary rounded-md text-accent' : ''}`}>
                                        <div className="flex items-center justify-center md:justify-start gap-2">
                                            <div className="p-2 rounded-xl flex items-center justify-center">{route.icon}</div>
                                            <h3 className='hidden md:block'>{route.linkTitle}</h3>
                                        </div>
                                    </NavLink>
                                )
                            }
                        </div>

                        <hr className="border-b-1 mt-5  " />

                        <div  className="flex flex-col justify-start items-start px-1 lg:px-4 pt-5">
                            <h4 className="hidden md:block uppercase font-semibold text-gray-500 text-xs ">Controls</h4>
                            {
                                defaultRoutes?.map(item =>
                                    <NavLink
                                        key={item.link}
                                        to={item.link}
                                        className={({ isActive }) => `text-xs lg:text-sm w-full py-2 transition-all duration-200 ${isActive ? 'bg-primary rounded-md text-accent' : ''}`}>
                                        <div className="flex items-center justify-center md:justify-start gap-2">
                                            <h3 className="p-2 rounded-xl flex items-center justify-center">{item.icon}</h3>
                                            <h3 className='hidden md:block'>{item.linkTitle}</h3>
                                        </div>
                                    </NavLink>
                                )

                            }
                            {/* <button className="text-2xl md:text-base flex items-center gap-2">
                                <RiShutDownLine />
                                <span className="hidden md:block">Logout</span>
                            </button> */}
                            <ThemeController />
                        </div>
                    </>

                    :

                    <div className="border border-red-500 h-full flex flex-col items-center gap-6">
                        <Skeleton width={150} height={20} />
                        <Skeleton width={150} height={20} />
                        <Skeleton width={150} height={20} />
                        <Skeleton width={150} height={20} />
                    </div>
            }
        </div>
    );
};

DashBoardMenu.propTypes = {
    role: PropTypes.string
}

export default DashBoardMenu;

