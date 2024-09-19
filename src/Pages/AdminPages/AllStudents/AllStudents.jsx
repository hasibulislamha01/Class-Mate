import { useEffect, useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";

const AllStudents = () => {

    const axiosSecure = useAxiosSecure()
    const [students, setStudents] = useState([])
    useEffect(() => {
       
        const url = `/users/role/Student/all`
        axiosSecure.get(url)
            .then(res => setStudents(res?.data))
            .catch(error => console.error('error loading student data in admin panel :', error?.massege))
    }, [axiosSecure])
    console.log(students);
    return (
        <div className="">

            {/* hedings */}
            <h1 className="font-bold text-3xl text-center my-12">ClassMate Students</h1>

            <table className="mt-6 w-full table table-zebra table-auto table-pin-rows table-xs md:table-md lg:table-lg">
                <thead>
                    <tr className="bg-sky-100 text-primary text-[15px]">
                        <th className=" ">Student Name</th>
                        <th className="hidden lg:table-cell text-left">Email</th>
                        <th className="hidden md:table-cell text-left">Phone</th>
                        <th>See Details</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        students ? 
                        students?.map(student =>
                            <tr key={student._id}>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar hidden md:block">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={student.userPhoto}
                                                    alt='student image'
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-left">{student.userName}</div>

                                        </div>
                                    </div>
                                </td>
                                <td className="hidden lg:table-cell">
                                    {student.userEmail}
                                </td>
                                <td className="hidden md:table-cell">{student?.phone}</td>
                                <td>
                                    <Link to={`/studentDetails/${student._id}`}>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </Link>
                                </td>
                                <td className=" flex justify-evenly items-center">

                                </td>
                            </tr>
                        )
                        :
                        <Skeleton/>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllStudents;