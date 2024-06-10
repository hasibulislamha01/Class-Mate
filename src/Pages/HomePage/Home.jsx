import { Toaster } from "react-hot-toast";
import AllSessions from "./AllSessions";
import Banner from "../../Components/Banner/Banner";
import OurTutors from "./OurTutors";

const Home = () => {
    return (
        <div>
            <Toaster></Toaster>
            <div className="">
                <Banner></Banner>
            </div>
            <div className="container mx-auto my-16">
                <AllSessions></AllSessions>
                <OurTutors></OurTutors>
            </div>
        </div>
    );
};

export default Home;