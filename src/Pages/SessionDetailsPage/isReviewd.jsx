import { useState } from "react";
import useGetLatestData from "../../CustomHooks/useGetLatestData";

const isReviewd = () => {

    const [data] = useGetLatestData()
    const [isReviewed, setIsReviewed] = useState(false)
    
    return (

    )
};

export default isReviewd;