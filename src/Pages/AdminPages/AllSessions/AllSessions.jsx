import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import { Link } from "react-router-dom";
import ApproveModal from "./ConfirmModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import ShowTable from "../../../Components/UI/ShowTable/ShowTable";



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
                    <div className='ml-2 flex items-center gap-4'>
                        <Link to={`/dashboard/admin/allSessions/update/${record.id}`}>
                            <button className="btn btn-sm w-[65px] bg-sky-200">
                                Update
                            </button>
                        </Link>
                        <button
                            className="btn btn-sm bg-red-100 w-[65px]"
                            onClick={() => handleDeleteSession(record.id)}>
                            Delete
                        </button>
                    </div>
                    :
                    record.status === 'pending' ?
                        <div className='flex items-center justify-evenly'>
                            <ApproveModal
                                id={record.id}
                            // refetch={refetch}
                            ></ApproveModal>
                            < button className="btn btn-sm bg-green-300" onClick={() => document.getElementById('my_modal_5').showModal()}>
                                Approve
                            </button >

                            <div onClick={() => handleSession(record.id, 'rejected', 'Reject')} className='btn btn-sm bg-red-300'>
                                Reject
                            </div>

                            

                        </div>
                        : <></>

            )
        }
    ]


    return (
        <div className="container mx-auto">
            <DashboardHeading subtitle={'All sessions that are created and waiting for your approve'} title={'All Sessions'} />

            <div className="mx-auto">
                {/* <table className="mt-6 w-full table table-zebra table-auto table-pin-rows table-xs md:table-md lg:table-lg">
                    <thead>
                        <tr className="text-[15px] h-[50px] bg-sky-50 text-primary">
                            <th>Session Title</th>
                            <th className="hidden lg:table-cell">Tutor Name</th>
                            <th className="hidden md:table-cell">Deadline</th>
                            <th>See Details</th>
                            <th colSpan={2} className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">


                        {
                            !allSessions ?

                                <ListSkeleton />

                                :

                                allSessions?.map(session =>
                                    <tr key={session._id}>

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar hidden md:block">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={session.sessionImage}
                                                            alt='session image'
                                                            className="rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-left">{session.sessionTitle}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden lg:table-cell text-left">
                                            {session.tutorName}
                                        </td>
                                        <td className="hidden md:table-cell text-left">{session?.registrationEnds}</td>
                                        <th className="text-left">
                                            <Link to={`/sessionDetails/${session._id}`}>
                                                <button className="btn btn-ghost btn-xs">details</button>
                                            </Link>
                                        </th>
                                        <td className=" flex justify-evenly items-center">
                                            {
                                                session.status === 'approved' ?
                                                    <div className='ml-2 flex items-center gap-4'>
                                                        <Link to={`/dashboard/admin/allSessions/update/${session._id}`}>
                                                            <button className="btn btn-sm w-[65px] bg-sky-200">
                                                                Update
                                                            </button>
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm bg-red-100 w-[65px]"
                                                            onClick={() => handleDeleteSession(session._id)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                    :
                                                    session.status === 'pending' ?
                                                        <div className='ml-5 flex items-center justify-evenly gap-6'>
                                                            <ApproveModal
                                                                id={session._id}
                                                                refetch={refetch}
                                                            ></ApproveModal>
                                                            < button className="btn btn-sm bg-green-300 w-[65px]" onClick={() => document.getElementById('my_modal_5').showModal()}>
                                                                Approve
                                                            </button >

                                                            <div onClick={() => handleSession(session._id, 'rejected', 'Reject')} className='btn btn-sm bg-red-300 w-[65px]'>
                                                                Reject
                                                            </div>

                                                            {/* <Button onClick={() => handleSession(sessionId, 'approved', 'Approve')} variant="contained" className='ml-5'>Approve</Button>
                            <Button onClick={() => handleSession(sessionId, 'rejected', 'Reject')} variant="contained" className='ml-5'>Reject</Button> */}
                {/* </div>
                                                        :
                                                        <></> */}



                {/* }
                                        </td>
                                    </tr>
                                )
                        }

                    </tbody> */}
                {/* </table> */}
                {/*                 
                        // console.log(session)
                        // <SessionCardinAdmin
                        //     key={session?._id}
                        //     session={session}
                        //     refetch={refetch}
                        // ></SessionCardinAdmin>
                     */}
            </div>
            <ShowTable columns={tableColumns} dataSource={tableData} />
        </div >
    );
};

export default AllSessions;