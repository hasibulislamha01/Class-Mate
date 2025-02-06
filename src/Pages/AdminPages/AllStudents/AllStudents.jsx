
import { Link } from "react-router-dom";
import useGetAllUsersWithSameAttribute from "../../../CustomHooks/useGetAllUsersWithSameAttribute";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import ShowTable from "../../../Components/UI/ShowTable/ShowTable";

const columnItems = [
    {
        title: 'Student Name',
        dataIndex: 'name',
        key: 'name',
        render: (title, record) => (
            <div className='flex items-center gap-3'>
                <div className='h-8 w-8 '>
                    <img src={record?.thumbnail} alt="student image" className='h-full w-full rounded-full' />
                </div>
                <h3><Link to={`/users/${record.id}`}>{title}</Link></h3>
            </div>
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
]


const AllStudents = () => {

    const students = useGetAllUsersWithSameAttribute('student')
    console.log(students);

    const tableItems = students?.map((student, index) => {
        return (
            {
                key: index + 1,
                id: student._id,
                name: student.userName,
                thumbnail: student.userPhoto,
                email: student.userEmail,
                phone: student.phone,
            }
        )
    })

    console.log(tableItems, columnItems)
    return (
        <div className="">

            {/* hedings */}
            <DashboardHeading title={'ClassMate Students'} subtitle={'View the studnts available in the platform'} />

            <ShowTable columns={columnItems} dataSource={tableItems} />
        </div>
    );
};

export default AllStudents;