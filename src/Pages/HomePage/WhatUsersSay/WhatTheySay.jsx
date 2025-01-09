import { Card } from "antd";
import { useState } from "react";
import './whatUsersSay.css'

const testimonials = [
    {
        "name": "Emily Johnson",
        "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpuUwExMndJ0IioFnec42P_uyo-kr6LJ3LAA&s",
        "testimonial": "Classmate has completely transformed the way I study with my friends. The collaborative tools make it so easy to share notes and prepare for exams together.",
        "role": "University Student",
        "rating": 5
    },
    {
        "name": "Michael Brown",
        "profileImage": "https://t4.ftcdn.net/jpg/05/08/09/55/360_F_508095569_gWiezEAqSNpFlgJXfQpugdcs5fMBd7f1.jpg",
        "testimonial": "I love how Classmate allows us to form study groups and work on projects in real-time. It has made group assignments so much more manageable!",
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

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="min-h-screen">

            <Card
                className="w-[95%] md:w-[85%] lg:w-[75%] xl:w-[65%] mx-auto"
            >

                <div className="space-y-3">
                    <h1 className="text-xl font-bold text-center">What Users Are Saying</h1>
                    <hr className="w-[90%] md:w-[50%] lg:w-[40%] mx-auto border-b" />
                </div>

                <div className="testimonial-carousel mt-12">

                    <div className="testimonial-slide flex flex-col items-center" key={currentIndex}>
                        <p className="testimonial-text text-center w-[80%] md:w-[70%] mx-auto">
                            {testimonials[currentIndex].testimonial}
                        </p>
                        <div className="flex flex-col items-center my-5">
                            <img
                                src={testimonials[currentIndex].profileImage}
                                alt="Profile"
                                className="object-cover w-20 h-20"
                            />
                            <h4 className="font-bold">{testimonials[currentIndex].name}</h4>
                            <p>{testimonials[currentIndex].role}</p>
                        </div>
                    </div>
                    <div className="controls">
                        <button onClick={handlePrev} className="prev-button">Prev</button>
                        <button onClick={handleNext} className="next-button">Next</button>
                    </div>

                </div>
            </Card>
        </section>
    );
};

export default WhatTheySay;