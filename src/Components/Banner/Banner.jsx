import Svg from "./Svg";
import './Banner.css'

const Banner = () => {
    return (
        <div className="doodleBg   bg-opacity-50 min-h-screen py-16 px-3">
            <div className="w-full min-h-screen  flex justify-center">
                <div className="flex flex-col lg:flex-row justify-center items-center container mx-auto ">
                    <div className="space-y-8 ">
                        <h1 className="text-5xl font-bold">Unlock Your Potential with ClassMate</h1>
                        <p className="font-semibold">
                            Join millions of learners and transform your skills today. Start your journey with expert-led online courses.
                        </p>
                    </div>
                    <Svg></Svg>
                </div>
            </div>
        </div>
    );
};

export default Banner;