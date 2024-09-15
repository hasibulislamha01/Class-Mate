import { Link } from "react-router-dom";
import ListSkeleton from "../../../Components/Skeletons/ListSkeleton";
import useGetAllUsersWithSameAttribute from "../../../CustomHooks/useGetAllUsersWithSameAttribute";

const AllTeachers = () => {

    const teachers = useGetAllUsersWithSameAttribute('Tutor', 'all')
    console.log(teachers);

    return (
        <div className="min-h-screen py-8">
            <h1 className="text-xl font-bold text-center">ClassMate Tutors</h1>

            <table className="mt-6 w-full table table-auto table-pin-rows table-xs md:table-md lg:table-lg">
                <thead>
                    <tr className="text-[15px] h-[50px] text-primary bg-sky-50">
                        <th>Tutor Name</th>
                        <th className="text-left">Email</th>
                        <th className="text-left hidden md:table-cell">Phone</th>
                        <th>See Details</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        !teachers ?
                            <ListSkeleton />
                            :
                            teachers?.map(tutor =>
                                <tr key={tutor._id}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar hidden md:block">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={tutor.userPhoto}
                                                        alt='student image'
                                                        className="rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-left">{tutor.userName}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td className="">
                                        {tutor.userEmail}
                                    </td>
                                    <td className="hidden md:table-cell">{tutor?.phone}</td>
                                    <th>
                                        <Link to={`/tutorDetails/${tutor._id}`}>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </Link>
                                    </th>
                                    <td className=" flex justify-evenly items-center">

                                    </td>

                                </tr>
                            )

                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllTeachers;