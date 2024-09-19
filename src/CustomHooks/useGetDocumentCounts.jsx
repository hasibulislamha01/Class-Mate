import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";


const useGetDocumentCounts = (api) => {

    const axiosSecure = useAxiosSecure()
    const [number, setNumber] = useState(0)

    useEffect(()=> {
        
        
        axiosSecure.get(api)
        .then(response => setNumber(response?.data))
        .catch(error => console.error(`error fetching data from: ${api}`, error.message ))
        
    }, [api, axiosSecure])
    
    console.log(number);
    return  number || 0
};

export default useGetDocumentCounts;