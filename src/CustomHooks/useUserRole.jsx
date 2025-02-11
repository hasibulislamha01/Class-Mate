import useAuth from "../CustomHooks/useAuth";
import useGetLatestData from "./useGetLatestData";

const useUserRole = () => {

    const { user } = useAuth();
    const [data, refetch, isLoading, isError, error] = useGetLatestData(`/users/${user?.email}/role`)
    const role = data?.role?.toLowerCase()
    console.log('user role found: ', role)


    return {role, refetch, isLoading, isError, error};
};

export default useUserRole;
