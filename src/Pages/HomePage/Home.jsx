import { Toaster } from "react-hot-toast";
import AllSessions from "./AllSessions";
import Banner from "../../Components/Banner/Banner";
import OurTutors from "./OurTutors";
import Features from "./Features";
import HowItWorks from "./HowItWorks";

const Home = () => {
    return (
        <div className="bg-background dark:bg-dark-background text-text dark:text-dark-text transition-colors duration-300">
            <Toaster></Toaster>
            <div className="">
                <Banner></Banner>
            </div>
            <div className="container mx-auto my-16">
                <Features />
                <AllSessions></AllSessions>
                <HowItWorks/>
                <OurTutors></OurTutors>
            </div>
        </div>
    );
};

export default Home;