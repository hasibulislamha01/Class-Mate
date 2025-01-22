import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

/**
 * Custom hook to fetch the latest data from a given API endpoint using a secure Axios instance.
 * @param {string} key - Unique query key for react-query.
 * @param {string} api - API endpoint to fetch data from.
 * @returns {object} - Contains fetched data, refetch function, loading status, error status, and error details.
 */
const useGetLatestData = (api) => {
    
    const axiosSecure = useAxiosSecure();
    console.log(api);

    const {
        data = null,
        refetch,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: [api],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(api);
                return response?.data;
            } catch (err) {
                throw new Error(err.response?.data?.message || 'Error fetching data');
            }
        }
    });

    return [data, refetch, isLoading, isError, error];
};

export default useGetLatestData;
