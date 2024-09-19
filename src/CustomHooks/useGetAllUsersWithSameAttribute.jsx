import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllUsersWithSameAttribute = (role, gender) => {
    console.log(role, gender);

    const axiosSecure = useAxiosSecure()
    const [userWithSameRole, setUserWithSameAttribute] = useState([])

    useEffect(() => {

        if (!role) return

      


        axiosSecure.get(`/users/role/${role}/${gender}`)
            .then(res => setUserWithSameAttribute(res?.data || []))
            .catch(error => console.error(`error getting all the users having the role: ${role} `, error))
    }, [role, gender, axiosSecure])

    // console.log(totalUserWithSameRole); ok

    return userWithSameRole || 0;
};

export default useGetAllUsersWithSameAttribute;