import { useEffect, useState } from "react";

const useTodaysDate = () => {

    const [date, setDate] = useState('')

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const formattedDate = `${year}-${month}-${day}`;
        // console.log(formattedDate);
        setDate(formattedDate);
    }, [])
    
    return date || 'N/A'
};

export default useTodaysDate;