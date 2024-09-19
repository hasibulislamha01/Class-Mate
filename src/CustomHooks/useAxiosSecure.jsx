import axios from "axios";
import { useMemo } from "react";

const useAxiosSecure = () =>{
    const axiosSecure = useMemo(()=> {
        return axios.create({
            baseURL: import.meta.env.VITE_BASE_URL
        })
    }, [])

    return axiosSecure;
}

export default useAxiosSecure;