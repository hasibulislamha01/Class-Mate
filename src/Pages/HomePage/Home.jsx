import { Toaster } from "react-hot-toast";
import AllSessions from "./AllSessions";
import Banner from "../../Components/Banner/Banner";

const Home = () => {
    return (
        <div>
            <Toaster></Toaster>
            <div className="">
                <Banner></Banner>
            </div>
            <div className="container mx-auto my-16">
                <AllSessions></AllSessions>
            </div>
        </div>
    );
};

export default Home;