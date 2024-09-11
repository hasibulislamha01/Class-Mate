import { Outlet } from "react-router-dom";
import DashBoardMenu from "../Components/SharedComponents/DashBoardMenu";
import useUserRole from "../CustomHooks/useUserRole";
import useAuth from "../CustomHooks/useAuth";


const DashLayout = () => {

    const user = useAuth()
    const role = useUserRole()



    return (
        <div className="min-h-screen">
        
            {
                user || role ?
                    <div className="flex gap-12 max-w-[1920px]">
                        <DashBoardMenu
                            // routes={dashboardRout}
                            role={role}
                        ></DashBoardMenu>
                        <div className="pt-16 w-full">
                            <Outlet></Outlet>
                            {/* <BottomNav
                    routes={dashboardRout}
                ></BottomNav> */}
                        </div>
                    </div>
                    :
                    <div className="h-[100px] flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
            }
        </div>
    );
};

export default DashLayout;