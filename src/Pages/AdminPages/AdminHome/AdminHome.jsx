import { useNavigate } from "react-router-dom";
import AdminsSummaryCard from "../../../Components/AdminSummaryCard/AdminSummaryCard";
import useUserRole from "../../../CustomHooks/useUserRole";
import RadialChart from "./RadialBarChart";
import useAuth from "../../../CustomHooks/useAuth";
import { useEffect } from "react";


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
            <h1 className="text-center text-red-600">Welcome, ClassMate Admin !</h1>
            <div className="w-full flex items-center gap-4">
                <AdminsSummaryCard
                    role={'Student'}
                />
                <AdminsSummaryCard
                    role={'Tutor'}
                />
                <AdminsSummaryCard
                    role={'Administrator'}
                />
            </div>

            {/* radial bar chart */}
            <RadialChart />

        </div>
    );
};

export default AdminHome;