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



const DashBoard = ({ role }) => {

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
        ...defaultRoutes,
        {
            link: '/dashboard/admin/allUsers',
            icon: <FiUsers />,
            linkTitle: 'All Users'
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
        ...defaultRoutes,
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
        ...defaultRoutes,
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
        <>
            {
                role ?
                    <div className=" h-screen w-[50px] md:w-[200px] flex-col justify-start items-start hidden md:flex gap-1 border border-red-400">

                        {
                            dashboardRout?.map(route =>
                                <NavLink key={route.link} to={route.link} className={({ isActive }) => isActive ? 'w-full text-sky-500 border border-blue-300 ' : 'w-full  text-black border border-green-400'}>
                                    <div className="flex items-center justify-start border border-red-400 gap-2">
                                        <h3>{route.icon}</h3>
                                        <h3 className=''>{route.linkTitle}</h3>
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
        </>
    );
};

DashBoard.propTypes = {
    role: PropTypes.string
}

export default DashBoard;