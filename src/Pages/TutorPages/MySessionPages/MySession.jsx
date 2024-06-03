import { useEffect, useState } from "react";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import SessionCard from "./SessionCard";

const MySession = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const tutorEmail = user?.email;

    const [mySessions, setMySessions] = useState([])
    useEffect(()=> {
        axiosSecure.get(`/sessions/${tutorEmail}`)
        .then(res => {
            console.log(res.data)
            setMySessions(res.data)
        })
        .catch(error => {
            console.log(error.message)
        })
    }, [axiosSecure, tutorEmail])

    return (
        <div>
            <h1 className="text-center text-3xl text-red-500">My Sessions</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {
                    mySessions?.map(mySession => 
                        <SessionCard
                            key={mySession._id}
                            mySession={mySession}
                        ></SessionCard>
                    )
                }
            </div>
        </div>
    );
};

export default MySession;