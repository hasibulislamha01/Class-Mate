import { useEffect, useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import UserCard from "./UserCard";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [users, setUsers] = useState([])
    useEffect(() => {
        axiosSecure.get('/users')
            .then(response => {
                console.log(response.data)
                setUsers(response.data)
            }).catch(error => {
                console.error(error.message)
            })
    }, [])
    console.log(users)
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {
                    users?.map(user =>
                        <UserCard
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