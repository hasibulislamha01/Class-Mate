import UsersSummaryCard from "../../../Components/UsersSummaryCard/UsersSummaryCard";


const AdminHome = () => {

    return (
        <div className="container mx-auto border border-red-200">
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
        </div>
    );
};

export default AdminHome;