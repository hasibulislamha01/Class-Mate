import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetLatestData = (key, api) => {
    console.log(key, api)
    const axiosSecure = useAxiosSecure()

    const {data, refetch} = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const res = await axiosSecure.get(api)
            return res?.data
        }
    })

    return [data, refetch]
};

export default useGetLatestData;

// used keys : sessionAction , mySessions, updatedSession, homeAllSessions, bookedSessions mySessionsInMaterials