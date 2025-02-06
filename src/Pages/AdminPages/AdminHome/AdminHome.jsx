import { useNavigate } from "react-router-dom";
import useUserRole from "../../../CustomHooks/useUserRole";
import RadialChart from "./RadialBarChart";
import useAuth from "../../../CustomHooks/useAuth";
import { useEffect } from "react";
import UsersSummeryCard from "../../../Components/UsersSummeryCard/UsersSummeryCard";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";


const AdminHome = () => {

    const { user } = useAuth()
    const navigate = useNavigate()
    const role = useUserRole()

    useEffect(() => {
        if (!user?.email) {
            navigate('/login')
            return
        }
        if(role){
            if(role === 'Student'){
                navigate('/unauthorized')
            } else if (role === 'Tutor'){
                navigate('/unauthorized')
            }
        }
    }, [user, role, navigate])

    return (
        <div className="container mx-auto overflow-y-scroll">
            <DashboardHeading subtitle={'Look what is happenning on classmate today'} title={'Welcome ClassMate Admin'}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                <UsersSummeryCard subTitle={'Students'} api={`/users/counts?role=student`}/>
                <UsersSummeryCard subTitle={'Tutors'} api={`/users/counts?role=tutor`}/>
                <UsersSummeryCard subTitle={'Administrators'} api={`/users/counts?role=administrator`}/>
            </div>

            {/* radial bar chart */}
            <RadialChart />

        </div>
    );
};

export default AdminHome;