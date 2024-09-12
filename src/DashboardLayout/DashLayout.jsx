import { Outlet } from "react-router-dom";
import DashBoardMenu from "../Components/SharedComponents/DashBoardMenu";
import useUserRole from "../CustomHooks/useUserRole";
import useAuth from "../CustomHooks/useAuth";


const DashLayout = () => {

    const user = useAuth()
    const role = useUserRole()



    return (
        <div className="h-screen max-w-[1600px] mx-auto">

            {
                user || role ?
                    <div className="flex gap-2 md:gap-4 max-w-[1920px]">

                        {/* this menu will be shown as a side bar */}
                        <DashBoardMenu
                            role={role}
                        ></DashBoardMenu>

                        {/* contents will be displayed here */}
                        <div className="w-full overflow-y-scroll">
                            <Outlet></Outlet>
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