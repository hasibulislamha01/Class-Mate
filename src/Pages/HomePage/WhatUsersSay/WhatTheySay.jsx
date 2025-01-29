import { Card } from "antd";
import { useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import './whatUsersSay.css'

const testimonials = [
    {
        "name": "Emily Johnson",
        "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpuUwExMndJ0IioFnec42P_uyo-kr6LJ3LAA&s",
        "testimonial": "Classmate has completely transformed the way I study. The collaborative tools make it so easy to share notes and prepare for exams together.",
        "role": "University Student",
        "rating": 5
    },
    {
        "name": "Michael Brown",
        "profileImage": "https://t4.ftcdn.net/jpg/05/08/09/55/360_F_508095569_gWiezEAqSNpFlgJXfQpugdcs5fMBd7f1.jpg",
        "testimonial": "I love how Classmate allows us to form study groups in real-time. It has made group assignments so much more manageable!",
        "role": "College Student",
        "rating": 4.5
    },
    {
        "name": "Sarah Davis",
        "profileImage": "https://img.freepik.com/premium-photo/young-female-graduate-student-portrait_693425-16955.jpg",
        "testimonial": "The user-friendly interface and excellent features of Classmate have helped me stay organized and focused throughout the semester.",
        "role": "Graduate Student",
        "rating": 4
    },
    {
        "name": "David Martinez",
        "profileImage": "https://media.istockphoto.com/id/1763926700/photo/portrait-of-smiling-smart-school-boy-wearing-braces-on-teeth-looking-at-camera-education.jpg?s=612x612&w=0&k=20&c=kDQg5b1no9fvjtsmdme9aB-oRd3xmXroT4577FL2pb4=",
        "testimonial": "Classmate is a game-changer! It’s like having a virtual study room where you can collaborate seamlessly with classmates from anywhere.",
        "role": "High School Student",
        "rating": 5
    },
    {
        "name": "Sophia Wilson",
        "profileImage": "https://thumbs.dreamstime.com/b/university-portrait-proud-black-woman-campus-graduation-event-phd-certificate-diploma-success-outdoor-education-college-317745104.jpg",
        "testimonial": "Thanks to Classmate, I can keep track of all my study materials and collaborate effectively with my peers, no matter where we are.",
        "role": "PhD Candidate",
        "rating": 4.8
    }
]


const WhatTheySay = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (currentIndex + 1) % testimonials.length;

    const handleNext = () => {
        setCurrentIndex(nextIndex);
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex);
    };



    return (
        <section className="min-h-screen">

            <Card
                className="relative md:p-5 w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] mx-auto shadow-lg "
            >

                <div className="space-y-3 ">
                    <h1 className="text-xl font-bold text-center">What Users Are Saying</h1>
                    <hr className="w-[90%] md:w-[50%] lg:w-[40%] mx-auto border-b" />
                </div>

                <div className=" mt-12">

                    <div className="flex flex-col items-center" key={currentIndex}>
                        <p className="testimonial-text text-center w-[99%] md:w-[70%] mx-auto text-[0.9rem] lg:text-[1rem]">
                            {testimonials[currentIndex]?.testimonial}
                        </p>
                        <div className="flex flex-col items-center">
                            <div className="relative flex items-center justify-center mt-12 h-20 gap-10">
                                <img
                                    src={testimonials[prevIndex].profileImage}
                                    alt="Previous User"
                                    onClick={handlePrev}
                                    className="opacity-80 object-cover left-1/4 transform transition-transform duration-500 w-12 h-12 rounded-full cursor-pointer hover:scale-110 z-[99]"
                                    style={{ zIndex: 1 }}
                                />
                                <img
                                    src={testimonials[currentIndex].profileImage}
                                    alt="Current User"
                                    className="object-cover transform transition-transform duration-500 w-20 h-20 rounded-full"
                                    style={{ zIndex: 2, transform: 'scale(1.2)' }}
                                />
                                <img
                                    src={testimonials[nextIndex].profileImage}
                                    alt="Next User"
                                    onClick={handleNext}
                                    className="opacity-80 object-cover right-1/4 transform transition-transform duration-500 w-12 h-12 rounded-full cursor-pointer hover:scale-110"
                                // style={{ zIndex: 1 }}
                                />
                                
                            </div>
                            <h4 className="font-bold mt-5">{testimonials[currentIndex]?.name}</h4>
                            <p>{testimonials[currentIndex]?.role}</p>
                        </div>
                    </div>
                    <div className="controls">
                        <button onClick={handleNext} className="absolute left-[-5%] top-[50%] translate-y-[-50%] next-button">
                            <GrCaretPrevious />
                        </button>
                        <button onClick={handlePrev} className="absolute right-[-5%] top-[50%] tranlate-y-[-50%] prev-button">
                            <GrCaretNext />
                        </button>
                    </div>

                </div>
            </Card>
        </section>
    );
};

export default WhatTheySay;