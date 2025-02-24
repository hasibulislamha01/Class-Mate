import Svg from "./Svg";
import './Banner.css'
import useAuth from "../../CustomHooks/useAuth";

const Banner = () => {
    const { user } = useAuth()
    return (
        <div className="doodleBg bg-opacity-50 h-screen py-16 px-3 flex flex-col justify-center">
            <div className="w-full min-h-screen  flex justify-center">
                <div className="flex flex-col lg:flex-row justify-center items-center container mx-auto ">
                    <div className="space-y-8 ">
                        <h1 className="text-5xl font-bold  text-black leading-[4rem]">Unlock Your Potential with ClassMate</h1>
                        <p className="font-semibold text-black text-lg leading-7">
                            Join millions of learners and transform your skills today. <br /> Start your journey with expert-led online courses.
                        </p>

                        <button className='py-2 bg-primary/90 text-accent hover:bg-primary text-[1.1rem] font-bold rounded-full w-52 btn hover:scale-[102%] shadow-lg shadow-accent transition-all duration-500'>
                            
                                {
                                    // console.log(user)
                                    user ? 'Get Started' : "Sign In"
                                }
                            
                        </button>
                    </div>
                    <Svg></Svg>
                </div>
            </div>
        </div>
    );
};

export default Banner;