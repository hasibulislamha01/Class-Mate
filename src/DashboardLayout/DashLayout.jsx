import { Outlet } from "react-router-dom";
import DashBoard from "../Components/SharedComponents/DashBoard";
import useUserRole from "../CustomHooks/useUserRole";
import { FiUsers } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { SiGoogleclassroom } from "react-icons/si";
import { TbBookUpload } from "react-icons/tb";
import { GrDocumentUser } from "react-icons/gr";
import { SlDocs } from "react-icons/sl";


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