import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/SharedComponents/Footer";
import Navbar from "../Components/SharedComponents/Navbar/Navbar";

const Root = () => {
    
    const location = useLocation()
    const inDashBoard = location.pathname.includes('/dashboard')
    // console.log(inDashBoard);

    return (
        <div className="">
            {!inDashBoard && <Navbar/>}
            
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;