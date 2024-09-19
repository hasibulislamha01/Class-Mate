import UsersSummeryCard from "../../../Components/UsersSummeryCard/UsersSummeryCard";
import useAuth from "../../../CustomHooks/useAuth";

const TutorHome = () => {

    const { user } = useAuth()

    return (
        <div className="h-full py-6 border border-blue-600">
            <h1 className="text-xl font-bold text-center text-primary">Welcome Tutor</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                <UsersSummeryCard
                    api={`/bookedSessions/numbers/${user?.email}`}
                />
                <UsersSummeryCard
                    api={`/bookedSessions/numbers/${user?.email}`}
                />
            </div>
        </div>
    );
};

export default TutorHome;