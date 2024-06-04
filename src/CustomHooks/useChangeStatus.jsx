import useAxiosSecure from "./useAxiosSecure";

const useChangeStatus = (id, newStatus, refetch) => {
    const axiosSecure = useAxiosSecure()
    // handleChangeStatus(id, newStatus)

    const handleChangeStatus = (id, newStatus) => {
        axiosSecure.patch(`/sessions/${id}`, { newStatus })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                }
            })
            .catch(error => {
                console.error(error.message)
            })
    }
    return handleChangeStatus(id, newStatus)
};

export default useChangeStatus;