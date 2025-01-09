import FeatureCard from "./FeatureCard";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { FaSlideshare } from "react-icons/fa";
import { LuCalendarCheck } from "react-icons/lu";
import { RiTeamLine } from "react-icons/ri";


const studentFeatures = [
    {
        "id": 1,
        "title": "Real-Time Learning",
        "description": "Join group study sessions online, where students can share ideas, solve problems together, and enhance their learning experience through collective knowledge.",
        icon: <PiGraduationCapDuotone size={20} />

    },
    {
        "id": 2,
        "title": "Resource Sharing",
        "description": "Upload and access notes, presentations, and study materials from peers, ensuring students have all the resources they need in one place.",
        icon: <FaSlideshare size={20} />
    },
    // {
    //     "id": 3,
    //     "title": "Task Management",
    //     "description": "Keep track of assignments and deadlines with an organized task list, helping students manage their time and stay on top of their academic responsibilities."
    // },
    // {
    //     "id": 4,
    //     "title": "Interactive Discussion Forums",
    //     "description": "Participate in topic-specific discussions to clarify doubts, get peer feedback, and learn from a community of students and tutors."
    // },
    {
        "id": 5,
        "title": "Efficient Session Management",
        "description": "Manage multiple study groups in real time, allowing tutors to reach more students simultaneously and maximize their teaching efficiency.",
        icon: <LuCalendarCheck size={20} />
    },
    {
        "id": 6,
        "title": "Enhanced Student Engagement",
        "description": "Participate in interactive forums where tutors can provide additional support, answer queries, and create a more engaged learning environment.",
        icon: <RiTeamLine size={20} />
    }
]

// const tutorFeaturs = [
//     {
//         "id": 2,
//         "title": "Streamlined Resource Distribution",
//         "description": "Quickly upload and share teaching materials, ensuring all students have easy access to necessary resources without repetitive manual distribution."
//     },
//     {
//         "id": 3,
//         "title": "Automated Task Tracking",
//         "description": "Assign tasks and automatically track student submissions and progress, reducing administrative overhead and allowing tutors to focus more on teaching."
//     },
// ]



const Features = () => {
    return (

        <section className="min-h-screen flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-12 px-2 md:px-4">

            <div className="space-y-3">
                <h1 className="text-xl xl:text-2xl font-bold text-center">Who We Are ?</h1>
                <p className="text-center w-[95%] md:w-[85%] lg:w-[60%] mx-auto">
                    ClassMate is here to help you out finding the best online learning platform. Join the millons of learners today to develop your career.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4">
                {studentFeatures.map((features, index) => (
                    <div
                        key={features?.id}
                        className={
                            index >= Math.floor(studentFeatures.length / 4) * 4
                                ? "col-span-1 md:col-span-2 lg:col-span-3 flex justify-center"
                                : ""
                        }
                    >
                        <FeatureCard
                            title={features?.title}
                            description={features?.description}
                            icon={features?.icon}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
