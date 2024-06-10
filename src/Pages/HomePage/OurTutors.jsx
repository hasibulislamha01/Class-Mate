import useGetLatestData from "../../CustomHooks/useGetLatestData";

const OurTutors = () => {
    const query = useGetLatestData('ourTeachers', '/users/role/tutors')
    const tutors = query[0]
    console.log(tutors)
    return (
        <div>
            
        </div>
    );
};

export default OurTutors;