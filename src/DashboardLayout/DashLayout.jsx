import { Outlet } from "react-router-dom";
import DashBoardMenu from "../Components/SharedComponents/DashBoardMenu";
import useUserRole from "../CustomHooks/useUserRole";
import useAuth from "../CustomHooks/useAuth";


const DashLayout = () => {

    const user = useAuth()
    const role = useUserRole()

    const isLoading = !user || !role;

    return (
        <div className="h-screen max-w-[1600px] mx-auto text-text dark:text-dark-text bg-background dark:bg-dark-background transition-colors duration-300">

            {
                !isLoading ?
                    <div className="flex h-screen gap-2 md:gap-4 max-w-[1920px]">
                        
                        {/*static sidebar */}
                        <div className="h-full w-[40px] md:w-[20%] lg:w-[200px] sticky top-0  bg-primary text-white dark:bg-neutral dark:bg-gradient-to-r from-[#121418] to-[#1A1F26]">
                            <DashBoardMenu role={role} />
                        </div>

                        {/* contents */}
                        <div className="w-full overflow-y-auto h-full">
                            <Outlet />
                        </div>
                    </div>

                    :

                    <div className="h-screen flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
            }
        </div>
    );
};

export default DashLayout;