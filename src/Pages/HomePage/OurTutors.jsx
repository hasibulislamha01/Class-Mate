import useGetLatestData from "../../CustomHooks/useGetLatestData";
import TutorCard from "./TutorCard";

const OurTutors = () => {
    const query = useGetLatestData('ourTeachers', '/users/role/tutors')
    const tutors = query[0]
    console.log(tutors)
    return (
        <div className="my-16">
            <h1 className="text-center text-3xl my-6">Meet Our Tutors</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 space-y-6">
                {
                    tutors?.map(tutor =>
                        <TutorCard
                            key={tutor?._id}
                            tutor={tutor}
                        ></TutorCard>
                    )
                }
            </div>
        </div>
    );
};

export default OurTutors;