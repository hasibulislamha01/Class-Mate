import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import UsersSummeryCard from "../../../Components/UsersSummeryCard/UsersSummeryCard";
import useAuth from "../../../CustomHooks/useAuth";

const StudentHome = () => {
    const { user } = useAuth()
    return (
        <div className="h-full">
            <DashboardHeading
                title={'Profile'}
                subtitle={'This is a summary of your journey with Classmate'}
            />
            <div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <UsersSummeryCard
                        api={`/bookedSessions/counts?studentEmail=${user?.email}`}
                        subTitle={'Sessions booked'}
                    />
                    <UsersSummeryCard
                        api={`/reviews/counts?studentEmail=${user?.email}`}
                        subTitle={'Review given'}
                    />
                    <UsersSummeryCard
                        api={`/notes/counts?studentEmail=${user?.email}`}
                        subTitle={'Notes Created'}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentHome;