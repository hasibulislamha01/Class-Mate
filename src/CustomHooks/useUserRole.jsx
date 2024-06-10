import { useEffect, useState } from "react";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import useAuth from "../CustomHooks/useAuth";


const useUserRole = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const baseURL = import.meta.env.VITE_BASE_URL


    const [userRole, setUserRole] = useState()
    useEffect(() => {
        axiosSecure.get(`${baseURL}/users/${user?.email}/role`)
            .then(response => {
                // console.log(response.data)
                const role = response.data?.role
                console.log(role)
                setUserRole(role)
            })
            .catch(error => {
                console.error(error.message)
            })
    }, [user, axiosSecure, baseURL])

    // console.log(userRole)
    return userRole
};

export default useUserRole;