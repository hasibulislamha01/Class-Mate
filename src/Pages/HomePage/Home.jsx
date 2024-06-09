import { Toaster } from "react-hot-toast";
import AllSessions from "./AllSessions";

const Home = () => {
    return (
        <div>
            <Toaster></Toaster>
            <div className="p-32 text-center bg-rose-100 text-5xl font-semibold">
                Home Sweet Home
            </div>
            <div className="container mx-auto">
                <AllSessions></AllSessions>
            </div>
        </div>
    );
};

export default Home;