import { Outlet } from "react-router-dom";
import DashBoardMenu from "../Components/SharedComponents/DashBoardMenu";
import useUserRole from "../CustomHooks/useUserRole";
import useAuth from "../CustomHooks/useAuth";


const DashLayout = () => {

    const user = useAuth()
    const role = useUserRole()

    const isLoading = !user || !role;

    return (
        <div className="h-screen max-w-[1600px] mx-auto">

            {
                !isLoading ?
                    <div className="flex h-screen gap-2 md:gap-4 max-w-[1920px]">
                        
                        {/*static sidebar */}
                        <div className="h-full w-[15%] md:w-[20%] lg:w-[200px] sticky top-0">
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