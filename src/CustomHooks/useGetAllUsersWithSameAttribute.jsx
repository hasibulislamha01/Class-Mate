import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllUsersWithSameAttribute = (role, gender) => {
    console.log(role, gender);

    const axiosSecure = useAxiosSecure()
    const [userWithSameRole, setUserWithSameAttribute] = useState([])

    useEffect(() => {

        let url = ``
        if (role && gender) url = `/users?role=${role}&gender=${gender}`
        if (role) url = `/users?role=${role}`
        if (gender) url = `/users?gender=${gender}`



        axiosSecure.get(url)
            .then(res => setUserWithSameAttribute(res?.data || []))
            .catch(error => console.error(`error getting all the users having the role : ${role} and gender ${gender}`, error))
    }, [role, gender, axiosSecure])

    // console.log(totalUserWithSameRole); ok

    return userWithSameRole || 0;
};

export default useGetAllUsersWithSameAttribute;