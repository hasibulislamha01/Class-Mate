import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import UserCard from "./UserCard";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users')
            return response.data
        }
    })
    console.log(users)

    const changeUserRole = (newRole, userId) => {
        const updatableUser = users?.find(user => user._id===userId)
        const updatableUserName = updatableUser?.userName
        Swal.fire({
            title: "Are you sure?",
            text: `if you confirm, ${updatableUserName} will be a ${newRole}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${userId}`, { role: newRole })
                    .then(response => {
                        console.log(response.data)
                        if (response.data?.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Role Updated",
                                text: `${updatableUserName} is now a ${newRole}`,
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error.message)
                    })

            }
        });


    }

    console.log(users)
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {
                    users?.map(user =>
                        <UserCard
                            changeUserRole={changeUserRole}
                            userInfo={user}
                            key={user._id}
                        ></UserCard>
                    )
                }
            </div>
        </div>
    );
};

export default AllUsers;