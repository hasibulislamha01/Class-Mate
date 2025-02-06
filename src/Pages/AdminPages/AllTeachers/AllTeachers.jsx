import { Link } from "react-router-dom";
import useGetAllUsersWithSameAttribute from "../../../CustomHooks/useGetAllUsersWithSameAttribute";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import ShowTable from "../../../Components/UI/ShowTable/ShowTable";

const columnItems = [
    {
        title: 'Tutor Name',
        dataIndex: 'tutor',
        key: 'tutor',
        render: (title, record) => (
            <div className='flex items-center gap-3'>
                <div className='h-8 w-8 '>
                    <img src={record?.thumbnail} alt="session image" className='h-full w-full rounded-full' />
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


const AllTeachers = () => {



    const teachers = useGetAllUsersWithSameAttribute('tutor')
    console.log(teachers);

    const tableData = teachers?.map((tutor, index) => {
        return(
            {
                key: index + 1,
                id: tutor._id,
                tutor: tutor.userName,
                thumbnail: tutor.userPhoto,
                email: tutor.userEmail,
                phone: tutor.phone,
            }
        )
    })

    return (
        <div className="min-h-screen">
            
            <DashboardHeading subtitle={'See all the teachers in the platform'} title={'All Tutors'}/>

            <ShowTable columns={columnItems} dataSource={tableData}/>
        </div>
    );
};

export default AllTeachers;