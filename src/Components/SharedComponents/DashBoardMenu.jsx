import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import { FiUsers } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { SiGoogleclassroom } from "react-icons/si";
import { TbBookUpload } from "react-icons/tb";
import { GrDocumentUser } from "react-icons/gr";
import { SlDocs } from "react-icons/sl";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ThemeController from "../ThemeController";
import { GoHome } from "react-icons/go";



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
            link: '/dashboard/admin/students',
            icon: <FiUsers />,
            linkTitle: 'Students'
        },
        {
            link: '/dashboard/admin/teachers',
            icon: <FiUsers />,
            linkTitle: 'Teachers'
        },
        {
            link: '/dashboard/admin/administrators',
            icon: <FiUsers />,
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
            link: '/dashboard/tutor/createSessions',
            icon: <HiOutlinePencilSquare />,
            linkTitle: 'Create Sessions'
        },
        {
            link: '/dashboard/tutor/mySessions',
            icon: <SiGoogleclassroom />,
            linkTitle: 'My Sessions'
        },
        {
            link: '/dashboard/tutor/uploadMaterials',
            icon: <TbBookUpload />,
            linkTitle: 'Upload Materials'
        },
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
            link: '/dashboard/student/bookedSessions',
            icon: <GiNotebook />,
            linkTitle: 'Booked Sessions'
        },
        {
            link: '/dashboard/student/createNote',
            icon: <GiNotebook />,
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

    if (role === 'Administrator') {
        dashboardRout = adminRoutes
    }
    else if (role === 'Tutor') {
        dashboardRout = tutorRoutes
    }
    else if (role === "Student") {
        dashboardRout = studentRoutes
    }


    console.log(dashboardRout)
    return (
        <div className="min-h-screen w-[15%] md:w-[20%] lg:w-[200px] border border-blue-600">

            {/* logo */}
            <div className="flex items-center justify-center md:justify-start font-bold my-4">
                <img src="/logo.jpg" alt="logo" className="w-[50px] h-[50px]rounded-full" />
                <h1 className="hidden md:inline-flex">ClassMate</h1>
            </div>

            {/* menues */}
            {
                role ?
                    <div className="flex flex-col justify-start items-start gap-1">



                        {
                            dashboardRout?.map(route =>
                                <NavLink key={route.link} to={route.link} className={({ isActive }) => isActive ? 'w-full text-sky-500 ' : 'w-full  text-black '}>
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <h3 className="text-2xl md:text-base">{route.icon}</h3>
                                        <h3 className='hidden md:block'>{route.linkTitle}</h3>
                                    </div>
                                </NavLink>
                            )
                        }
                        <ThemeController />

                    </div>
                    :
                    // <div className="h-screen flex flex-col items-center justify-center md:w-[20%]">
                    //     <Skeleton baseColor="#d41313"/>
                    // </div>
                    <Skeleton className="text-red-500 bg-blue-500" />
            }
        </div>
    );
};

DashBoardMenu.propTypes = {
    role: PropTypes.string
}

export default DashBoardMenu;