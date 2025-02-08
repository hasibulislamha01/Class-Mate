import { Link } from "react-router-dom";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import ShowTable from "../../../Components/UI/ShowTable/ShowTable";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import { Button } from "antd";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";





const AllMaterials = () => {

    const axiosSecure = useAxiosSecure()
    const query = useGetLatestData(`/materials`)
    const materials = query[0]
    const refetch = query[1]

    const tableData = materials?.map((material, index) => {
        return (
            {
                key: index + 1,
                id: material._id,
                name: material.materialtitle,
                thumbnail: material.materialImage,
                material: material.driveLink,
                phone: material.phone
            }
        )
    })

    const handleDelete = (materialId) => {
        Swal.fire({
            title: "Are you sure?",
            customClass: 'swal-container',
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Delete anyway`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/materials/${materialId}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "You deleted the material!",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(err => {
                        console.error(err.message)
                    })
            }
        })

    }


    const columnItems = [
        {
            title: 'Material Title',
            dataIndex: 'name',
            key: 'name',
            render: (title, record) => (
                <div className='flex items-center gap-3'>
                    <div className='h-8 w-8 '>
                        <img src={record?.thumbnail} alt="material image" className='h-full w-full rounded-full' />
                    </div>
                    <h3><Link to={`/users/${record.id}`}>{title}</Link></h3>
                </div>
            ),
        },
        {
            title: 'View Material',
            dataIndex: 'material',
            key: 'material',
            render: (title, record) => (
                <div className='flex items-center gap-3'>
                    <h3><Link to={record.driveLink}>Drive Link</Link></h3>
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (title, record) => (
                <Button
                    onClick={() => handleDelete(record.id)}
                >
                    Delete Material
                </Button>
            ),
        },
    ]

    return (
        <div>
            <DashboardHeading title={'All Materials'} subtitle={'See the materials uploaded by the tutors.'} />
            <ShowTable columns={columnItems} dataSource={tableData} />
        </div>
    );
};

export default AllMaterials;