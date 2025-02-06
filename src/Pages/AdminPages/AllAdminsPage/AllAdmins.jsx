import { Link } from "react-router-dom";
import useGetAllUsersWithSameAttribute from "../../../CustomHooks/useGetAllUsersWithSameAttribute";
import ShowTable from "../../../Components/UI/ShowTable/ShowTable";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";


const columnItems = [
    {
        title: 'Admin Name',
        dataIndex: 'name',
        key: 'name',
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


const AllAdmins = () => {

    const admins = useGetAllUsersWithSameAttribute('administrator')

    const tableData = admins?.map((admin, index) => {
        return (
            {
                key: index + 1,
                id: admin._id,
                name: admin.userName,
                thumbnail: admin.userPhoto,
                email: admin.userEmail,
                phone: admin.phone
            }
        )
    })

    return (
        <div className="min-h-screen">
            
            <DashboardHeading title={'ClassMate Admins'} subtitle={'These are the admins who have the power'}/>

            <ShowTable columns={columnItems} dataSource={tableData} />
        </div>
    );
};

export default AllAdmins;