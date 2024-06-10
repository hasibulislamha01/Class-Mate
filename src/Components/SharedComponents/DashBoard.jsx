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
import useUserRole from "../../CustomHooks/useUserRole";

const DashBoard = ({ routes }) => {

    const role = useUserRole()
    console.log(role)

    let dashboardRout = []

    const adminRoutes = [
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
        <div className="h-screen mt-12 rounded-r-3xl bg-[#1d2b3a] w-[20%]  flex-col justify-center items-center hidden md:flex md:w-auto px-2 space-y-6">

            {
                dashboardRout?.map(route =>
                    <NavLink key={route.link} to={route.link} className={({ isActive }) => isActive ? 'w-full rounded-2xl m-2  p-1 flex items-center justify-center gap-6 text-white bg-blue-500' : 'w-full rounded-2xl my-2 p-1 flex items-center justify-start text-white px-5 gap-3'}>
                        <h3>{route.icon}</h3>
                        <h3 className='text-xl'>{route.linkTitle}</h3>
                    </NavLink>
                )
            }

        </div>
    );
};

DashBoard.propTypes = {
    routes: PropTypes.array
}

export default DashBoard;