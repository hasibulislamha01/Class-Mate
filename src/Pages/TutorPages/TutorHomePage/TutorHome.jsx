import UsersSummeryCard from "../../../Components/UsersSummeryCard/UsersSummeryCard";
import useAuth from "../../../CustomHooks/useAuth";

const TutorHome = () => {

    const {user} = useAuth()
    
    return (
        <div className="h-full py-6 border border-blue-600">
            <h1 className="text-xl font-bold text-center text-primary">Welcome Tutor</h1>

            <div>
                <UsersSummeryCard 
                api={`/bookedSessions/numbers/${user?.email}`}
                />
            </div>
        </div>
    );
};

export default TutorHome;