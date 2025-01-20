import ShowLineChart from "../../../Components/SharedComponents/SharedCharts/ShowLineChart";
import UsersSummeryCard from "../../../Components/UsersSummeryCard/UsersSummeryCard";
import useAuth from "../../../CustomHooks/useAuth";

const TutorHome = () => {

    const { user } = useAuth()

    return (
        <div className="h-full py-6">
            <h1 className="text-xl font-bold text-center text-primary">Welcome Tutor</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                <UsersSummeryCard
                    api={`/sessions/counts?tutorEmail=${user?.email}`}
                    subTitle={'Session Created'}
                />
                <UsersSummeryCard
                    api={`/bookedSessions/counts?tutorEmail=${user?.email}`}
                    subTitle={'Total Enrollment Count'}
                />
                <UsersSummeryCard
                    api={`/bookedSessions/revenue?tutorEmail=${user?.email}`}
                    subTitle={'Total Earnings in $'}
                />
            </div>

            <div className="my-12 grid grid-cols-1 lg:grid-cols-3 place-items-center gap-8">
                <ShowLineChart/>
                <ShowLineChart/>
                <ShowLineChart/>
            </div>
        </div>
    );
};

export default TutorHome;