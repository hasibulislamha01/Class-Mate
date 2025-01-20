import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/SharedComponents/Footer/Footer";
import Navbar from "../Components/SharedComponents/Navbar/Navbar";

const Root = () => {

    const location = useLocation()
    const inDashBoard = location.pathname.includes('/dashboard')
    // console.log(inDashBoard);

    return (
        <div className="bg-background dark:bg-dark-background">
            {!inDashBoard && <Navbar />}

            <Outlet className='bg-background dark:bg-dark-background'></Outlet>
            {!inDashBoard && <Footer />}
        </div>
    );
};

export default Root;