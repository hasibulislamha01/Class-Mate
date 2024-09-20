import { useEffect, useState } from "react";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import useAuth from "../CustomHooks/useAuth";

const useUserRole = () => {
    
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [userRole, setUserRole] = useState();

    useEffect(() => {
        if (user?.email) { // Ensure that user email is available
            const fetchUserRole = async () => {
                try {
                    const response = await axiosSecure.get(`/users/${user.email}/role`);
                    const role = response?.data?.role;
                    // console.log(role);
                    setUserRole(role);
                } catch (error) {
                    console.error("Error fetching user role:", error?.message);
                }
            };
            fetchUserRole();
        }
    }, [user?.email, axiosSecure]); // Depend only on user.email, axiosSecure, baseURL

    return userRole;
};

export default useUserRole;
