import { Outlet } from "react-router-dom";
import DashBoard from "../Components/SharedComponents/DashBoard";
import useUserRole from "../CustomHooks/useUserRole";


const DashLayout = () => {
    const role = useUserRole()
    console.log(role)
    return (
        <div className="flex gap-12">
            <DashBoard></DashBoard>
            <div className="pt-16">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashLayout;