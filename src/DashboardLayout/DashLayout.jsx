import { Outlet } from "react-router-dom";
import DashBoardMenu from "../Components/SharedComponents/DashBoardMenu";
import useUserRole from "../CustomHooks/useUserRole";
import useAuth from "../CustomHooks/useAuth";
import TopBar from "./TopBar";
import { Spin } from "antd";

// import DashboardMenu from "./DashboardMenu";


const DashLayout = () => {

    const { user } = useAuth()
    const foundRole = useUserRole()
    const role = foundRole?.toLowerCase()
    console.log('user in layout', user);
    const isLoading = !user || !role;

    return (
        <div className="min-h-screen max-w-[1600px] mx-auto text-text dark:text-dark-text bg-background dark:bg-dark-background transition-colors duration-300">

            {
                !isLoading ?

                    <div className="">


                        {/* top controlls */}
                        <TopBar
                            userName={user?.displayName}
                            userPhoto={user?.photoURL}
                            userRole={role}
                        />


                        <div className="flex items-start max-w-[1920px]">

                            {/*static sidebar */}
                            <div className="h-full w-11 md:w-[20%] lg:w-60 sticky top-0  text-text dark:bg-neutral dark:bg-gradient-to-r from-[#121418] to-[#1A1F26] rounded-r-lg ">
                                <DashBoardMenu role={role} />
                            </div>

                            {/* contents */}
                            <div className="h-full mx-auto px-2 md:px-5 lg:px-8 xl:px-10  w-full bg-background dark:bg-dark-background rounded-lg overflow-y-auto pb-12">
                                <Outlet />
                            </div>
                        </div>
                    </div>

                    :

                    <div className="h-screen flex items-center justify-center">
                        <Spin size="large"/>
                    </div>
            }
        </div>
    );
};

export default DashLayout;