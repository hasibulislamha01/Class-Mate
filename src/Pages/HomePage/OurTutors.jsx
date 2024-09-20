import RoundSkeleton from "../../Components/Skeletons/RoundSkeleton";
import useGetLatestData from "../../CustomHooks/useGetLatestData";
import TutorCard from "./TutorCard";

const OurTutors = () => {
    const query = useGetLatestData('ourTeachers', '/users/role/tutors')
    const tutors = query[0]
    console.log(tutors)
    return (
        <div className="my-12 lg:my-24 space-y-6 lg:space-y-12">
            <h1 className="text-center text-3xl my-6">Meet Our Tutors</h1>
                {
                    tutors ?
                        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center ">
                            {
                                tutors?.map(tutor =>
                                    <TutorCard
                                        key={tutor?._id}
                                        tutor={tutor}
                                    ></TutorCard>
                                )
                            }
                        </div>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center ">
                            <RoundSkeleton />
                            <RoundSkeleton />
                            <RoundSkeleton />
                        </div>
                }
            </div>
    );
};

export default OurTutors;