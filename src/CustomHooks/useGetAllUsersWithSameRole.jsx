import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllUsersWithSameRole = (role) => {
    const axiosSecure = useAxiosSecure()
    const [totalUserWithSameRole, setTotalUserWithSameRole] = useState(0)
    const baseUrl = import.meta.env.VITE_LOCAL_URL
    const url = `${baseUrl}/users/role/${role}`

    useEffect(()=> {
        axiosSecure.get(url)
        .then(res => setTotalUserWithSameRole(res?.data))
        .catch(error => console.error(`error getting all the users having the role: ${role} `, error))
    }, [role, url, axiosSecure])

    // console.log(totalUserWithSameRole); ok
    
    if(totalUserWithSameRole){
        return totalUserWithSameRole
    }
};

export default useGetAllUsersWithSameRole;