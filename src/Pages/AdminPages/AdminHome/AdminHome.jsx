import UsersSummaryCard from "../../../Components/UsersSummaryCard/UsersSummaryCard";
import RadialChart from "./RadialBarChart";


const AdminHome = () => {

    return (
        <div className="container mx-auto overflow-y-scroll">
            <h1 className="text-center text-red-600">Welcome, ClassMate Admin !</h1>
            <div className="w-full flex items-center gap-4">
                <UsersSummaryCard
                    role={'Student'}
                />
                <UsersSummaryCard
                    role={'Tutor'}
                />
                <UsersSummaryCard
                    role={'Administrator'}
                />
            </div>

            {/* radial bar chart */}
            <RadialChart/>

        </div>
    );
};

export default AdminHome;