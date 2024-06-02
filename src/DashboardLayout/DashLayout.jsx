import { Outlet } from "react-router-dom";
import DashBoard from "../Components/SharedComponents/DashBoard";
import useUserRole from "../CustomHooks/useUserRole";
import { FiUsers } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";


const DashLayout = () => {
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
            link: '/dashboard/admin/materials',
            icon: <GiNotebook />,
            linkTitle: 'Create Sessions'
        },
        {
            link: '/dashboard/admin/materials',
            icon: <GiNotebook />,
            linkTitle: 'My Sessions'
        },
        {
            link: '/dashboard/admin/materials',
            icon: <GiNotebook />,
            linkTitle: 'Upload Materials'
        },
        {
            link: '/dashboard/admin/materials',
            icon: <GiNotebook />,
            linkTitle: 'My Materials'
        },
        {
            link: '/dashboard/admin/materials',
            icon: <GiNotebook />,
            linkTitle: 'All Notes'
        },
    ]

    const studentRoutes = [
        {
            link: '/dashboard/admin/materials',
            icon: <GiNotebook />,
            linkTitle: 'Booked Sessions'
        },
        {
            link: '/dashboard/admin/materials',
            icon: <GiNotebook />,
            linkTitle: 'Create Note'
        },
        {
            link: '/dashboard/admin/materials',
            icon: <GiNotebook />,
            linkTitle: 'Manage Notes'
        },
        {
            link: '/dashboard/admin/materials',
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
    else if(role === "Student"){
        dashboardRout = studentRoutes
    }


    return (
        <div className="flex gap-12">
            <DashBoard
                routes={dashboardRout}
            ></DashBoard>
            <div className="pt-16">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashLayout;