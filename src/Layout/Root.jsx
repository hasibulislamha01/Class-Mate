import { Outlet } from "react-router-dom";
import Navbar from "../Components/SharedComponents/Navbar";
import Footer from "../Components/SharedComponents/Footer";

const Root = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;