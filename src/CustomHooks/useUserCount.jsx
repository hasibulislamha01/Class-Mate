import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useUserCount = (role) => {
    console.log(role);
    const axiosSecure = useAxiosSecure()
    const [total, setTotal] = useState(0)

    
    // console.log(total);
    
    useEffect(() => {
        const baseUrl = import.meta.env.VITE_LOCAL_URL
        const url = `${baseUrl}/users/numbers/${role}`
        axiosSecure.get(url)
            .then(res => {
                setTotal(res?.data.length);
            }).catch(error => {
                console.error(error?.message)
            })
    }, [axiosSecure, role])

    if(total){
        return total
    }
};

export default useUserCount;