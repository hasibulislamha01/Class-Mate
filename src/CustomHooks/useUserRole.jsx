import { useEffect, useState } from "react";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import useAuth from "../CustomHooks/useAuth";


const useUserRole = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const [userRole, setUserRole] = useState()
    useEffect(() => {
        axiosSecure.get(`/users/${user?.email}/role`)
            .then(response => {
                // console.log(response.data)
                const role = response.data?.role
                console.log(role)
                setUserRole(role)
            })
            .catch(error => {
                console.error(error.message)
            })
    }, [user])

    // console.log(userRole)
    return userRole
};

export default useUserRole;