import { Button } from "antd";
import SessionCard from "../../Components/SharedComponents/SessionCard";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import { Link } from "react-router-dom";

const sessions = [
    {
        "_id": "66653f0015717405e45ade5a",
        "sessionTitle": "Introductory Statistics",
        "tutorName": "Hasibul Islam",
        "tutorEmail": "hasibul.ruislam@gmail.com",
        "tutorPhoto": "https://lh3.googleusercontent.com/a/ACg8ocJy8Neyc_gdMY0UFC1cay7mRCD9z77i3Bpb4wcVWalXvLzSfDY=s309-c-no",
        "duration": "36",
        "description": "Join our introductory Statistics Course to enhance your basics  in statistics. If you are looking for a path career in Data Science, Population Studies or any research work Statistics is a must known subject so that you can infer. ",
        "registrationStarts": "06/02/2024",
        "registrationEnds": "06/10/2024",
        "classStarts": "06/13/2024",
        "classEnds": "06/30/2024",
        "registrationFee": "35",
        "status": "approved",
        "applyingDate": "6/9/2024",
        "sessionImage": "https://i.ibb.co/Yb6gpDm/bell-curve.jpg"
    },
    {
        "_id": "6665463c15717405e45ade5e",
        "sessionTitle": "Astro Physics",
        "tutorName": "Neil Tyson",
        "tutorEmail": "tyson@gmail.com",
        "tutorPhoto": "https://hips.hearstapps.com/hmg-prod/images/gettyimages-487238689.jpg",
        "duration": "500",
        "description": "Welcome to the universe of space time. If you are enthusiastic to know about our space you can join this program. You will learn about the space time, intersteller travelling and some magestic creatures like black whole and worm whole. ",
        "registrationStarts": "06/10/2024",
        "registrationEnds": "06/20/2024",
        "classStarts": "07/01/2024",
        "classEnds": "05/31/2025",
        "registrationFee": "999",
        "status": "approved",
        "applyingDate": "6/9/2024",
        "sessionImage": "https://i.ibb.co/j8xBTM3/nebula.jpg"
    }, {
        "_id": "66654a5f15717405e45ade5f",
        "sessionTitle": "Psychology",
        "tutorName": "Shizuka Nobi",
        "tutorEmail": "shizuka@gmail.com",
        "tutorPhoto": "https://photosly.net/wp-content/uploads/2024/02/shizuka-photo41.jpg",
        "duration": "350",
        "description": "Psychology is the scientific study of the mind and behavior, exploring how individuals think, feel, and act. It encompasses a range of topics including cognitive processes, emotional regulation, development across the lifespan, and the impact of social and environmental factors. By examining these areas, psychology seeks to understand and address various mental health issues and improve overall well-being.",
        "registrationStarts": "06/05/2024",
        "registrationEnds": "06/10/2024",
        "classStarts": "06/20/2024",
        "classEnds": "03/02/2025",
        "registrationFee": "299",
        "status": "approved",
        "applyingDate": "6/9/2024",
        "sessionImage": "https://i.ibb.co/0KDJrcy/psychology-2706902-640.jpg"
    },
    {
        "_id": "6665417415717405e45ade5c",
        "sessionTitle": "Intro to CSE",
        "tutorName": "Jhankar  Mahbub",
        "tutorEmail": "jhankar@gmail.com",
        "tutorPhoto": "https://i.ibb.co/KG45Xw8/jhankar.jpg",
        "duration": "150",
        "description": "This introductory CSE session enables a student to get the fundamental knowledge about computer, computer software and their functionality. It will help student to understand how a computer thinks or manages requests. It provides necessary knowledge about data and algorithm.",
        "registrationStarts": "06/05/2024",
        "registrationEnds": "06/20/2024",
        "classStarts": "06/25/2024",
        "classEnds": "09/10/2024",
        "registrationFee": "45678",
        "status": "approved",
        "applyingDate": "6/9/2024",
        "sessionImage": "https://i.ibb.co/P1hqXhw/cse.jpg"
    },

]

const AllSessions = () => {

    return (
        <div className="min-h-screen flex flex-col items-center space-y-6 lg:space-y-12 mt-12 lg:mt-24">
            <h1 className="text-xl xl:text-2xl font-bold text-center ">Explore Yourself</h1>

            {
                !sessions ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-6">

                        {
                            sessions?.map(session =>
                                <SessionCard
                                    key={session._id}
                                    session={session}
                                ></SessionCard>
                            )
                        }

                    </div>
            }

            <Link to='/sessions'>
                <Button
                >
                    Browse more sessions
                </Button>
            </Link>
        </div>
    );
};

export default AllSessions;