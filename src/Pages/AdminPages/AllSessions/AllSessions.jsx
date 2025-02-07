import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import { Link } from "react-router-dom";
import ApproveModal from "./ConfirmModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import ShowTable from "../../../Components/UI/ShowTable/ShowTable";
import { Button } from "antd";
import ShowModal from "../../../Components/UI/ShowModal/ShowModal";
import UpdateSession from "./UpdateSession";



const AllSessions = () => {

    const queryInfo = useGetLatestData('/sessions')
    const axiosSecure = useAxiosSecure()
    const allSessions = queryInfo[0]
    const refetch = queryInfo[1]


    const tableData = allSessions?.map((session, index) => {
        return (
            {
                key: index + 1,
                id: session._id,
                name: session.sessionTitle,
                thumbnail: session.sessionImage,
                tutor: session.tutorName,
                tutorThumbnail: session.tutorPhoto,
                status: session.status,

            }
        )
    })
    // console.log('table data is :', tableData)

    // delete the session
    const handleDeleteSession = (id) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Delete Session`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/sessions/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: 'Success',
                                text: `You have Delted the session`,
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error.message)
                    })

            }
        })

    }


    const handleSession = (id, newStatus, action) => {
        console.log(typeof id)
        console.log(newStatus, action)
        const defaultAmount = '0'
        const info = { newStatus, defaultAmount }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${action} Session`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/sessions/${id}`, info)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                title: 'Success',
                                text: `You have ${newStatus} the session`,
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error.message)
                    })

            }
        })


    }

    const tableColumns = [
        {
            title: 'Session',
            dataIndex: 'name',
            key: 'name',
            render: (title, record) => (
                <div className='flex items-center gap-3'>
                    <div className='h-8 w-8 '>
                        <img src={record?.thumbnail} alt="session image" className='h-full w-full rounded-full' />
                    </div>
                    <h3><Link to={`/sessions/${record.id}`}>{title}</Link></h3>
                </div>
            ),
        },
        {
            title: 'Tutor',
            dataIndex: 'tutor',
            key: 'tutor',
            render: (title, record) => (
                <div className='flex items-center gap-3'>
                    <div className='h-8 w-8 '>
                        <img src={record?.tutorThumbnail} alt="session image" className='h-full w-full rounded-full' />
                    </div>
                    <h3><Link to={`/users/${record.id}`}>{title}</Link></h3>
                </div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (title, record) => (

                record.status === 'approved' ?
                    <div className='ml-2 flex items-center justify-start gap-4'>


                        <ShowModal
                            controlButton={
                                <Button danger variant='outlined' size="small" >
                                    Update
                                </Button>
                            }
                            modalContent={
                                <UpdateSession
                                    sessionId={record?.id}
                                />
                            }

                        />

                        <Button type="primary" size="small" danger
                            onClick={() => handleDeleteSession(record.id)}
                        >
                            Delete
                        </Button>

                    </div>
                    :
                    record.status === 'pending' ?
                        <div className='flex items-center justify-start gap-4'>



                            <ShowModal
                                modalTitle='Approve Session?'
                                controlButton={
                                    <Button
                                        className="border-green-700 text-green-700 hover:border-green-500 hover:text-green-500"
                                        variant="outlined"
                                        size="small"
                                    >
                                        Approve
                                    </Button>
                                }

                                modalContent={
                                    <ApproveModal
                                        id={record.id}
                                        refetch={refetch}
                                    ></ApproveModal>
                                }
                            />


                            <Button type="primary" size="small" danger
                                onClick={() => handleSession(record.id, 'rejected', 'Reject')}
                            >
                                Reject
                            </Button>



                        </div>
                        : <></>

            )
        }
    ]


    return (
        <div className="container mx-auto">
            <DashboardHeading subtitle={'All sessions that are created and waiting for your approve'} title={'All Sessions'} />
            <ShowTable columns={tableColumns} dataSource={tableData} />
        </div >
    );
};

export default AllSessions;