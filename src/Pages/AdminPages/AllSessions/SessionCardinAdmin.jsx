import PropTypes from 'prop-types'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { IoIosArrowDown } from 'react-icons/io';
import useFormateDate from '../../../CustomHooks/useFormateDate';
import { CardMedia } from '@mui/material';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import Swal from 'sweetalert2';
import ApproveModal from './ConfirmModal';
import { Button } from 'antd';
import { Link } from 'react-router-dom';



const ExpandMore = styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const SessionCardinAdmin = ({ session, refetch }) => {

    const axiosSecure = useAxiosSecure()
    // const confirmAlert = useConfirmAlert()
    // const getStatus = useChangeStatus(id, action, refetch)


    const sessionId = session?._id
    const tutorPhoto = session?.tutorPhoto
    const tutorName = session?.tutorName
    const tutorEmail = session?.tutorEmail
    const sessionTitle = session?.sessionTitle
    const formattedRegistrationStartingDate = useFormateDate(session?.registrationStarts)
    const formattedRegistrationEndingDate = useFormateDate(session?.registrationEnds)
    const formattedClassStartingDate = useFormateDate(session?.classStarts)
    const formattedClassEndingDate = useFormateDate(session?.classEnds)
    const applyingDate = useFormateDate(session?.applyingDate)
    const duration = session?.duration
    const registrationFee = session?.registrationFee
    const status = session?.status
    const sessionImage = session?.sessionImage



    // console.log(typeof sessionId)

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


    let badgeBg = 'white'
    if (status === 'pending') {
        badgeBg = 'bg-warning'
    }
    else if (status === 'approved') {
        badgeBg = 'bg-[#059669] text-[#ecfccb]'
    }
    else if (status === 'rejected') {
        badgeBg = 'bg-[#f43f5e] text-[#fff1f2]'
    }

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


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], }} aria-label="recipe">
                        <img src={tutorPhoto} alt="" />
                    </Avatar>
                }
                action={

                    <div className='w-full mt-3'>
                        <div id='status-badge' className={`badge border-transparent  w-[100px] font-semibold mr-2 p-3 ${badgeBg}`}>{status}</div>
                    </div>


                }
                title={sessionTitle}
                subheader={applyingDate}
            ></CardHeader>

            <CardMedia
                component="img"
                className='h-[200px] object-contain'
                image={sessionImage}
                alt="Session Image"
            />

            <CardContent>

                <div className='grid grid-cols-2 justify-items-stretch gap-6'>

                    

                    <div className='text-center'>
                        <p className=''>Duration</p>
                        <h1 className='font-medium'>{duration} hours</h1>
                    </div>
                    <div className='text-center'>
                        <p className=''>Registration Fee</p>
                        <h1 className='font-medium'>{registrationFee}</h1>
                    </div>

                </div>
            </CardContent>
            <CardActions disableSpacing>



                {
                    status === 'approved' ?
                        <div className='ml-2 flex items-center gap-4'>
                            <Link to={`/dashboard/admin/allSessions/update/${sessionId}`}> <Button>Update</Button> </Link>
                            <Button onClick={() => handleDeleteSession(sessionId)}>Delete</Button>
                        </div>
                        :
                        status === 'pending' ?
                            <div className='ml-5 flex items-center justify-center gap-6'>
                                <ApproveModal
                                    id={sessionId}
                                    refetch={refetch}
                                ></ApproveModal>
                                < button className="h-[50px] w-[50px]" onClick={() => document.getElementById('my_modal_5').showModal()}>
                                    <img src="https://i.ibb.co/2SgPbdG/icons8-approve-96.png" alt="approve session" />
                                </button >

                                <div onClick={() => handleSession(sessionId, 'rejected', 'Reject')} className='hover:cursor-pointer'>
                                    <img className='h-[50px]' src="https://i.ibb.co/dg3yXmt/icons8-reject-100.png" alt="reject session" />
                                </div>

                                {/* <Button onClick={() => handleSession(sessionId, 'approved', 'Approve')} variant="contained" className='ml-5'>Approve</Button>
                            <Button onClick={() => handleSession(sessionId, 'rejected', 'Reject')} variant="contained" className='ml-5'>Reject</Button> */}
                            </div>
                            :
                            <></>



                }

                
            </CardActions>
            

        </Card>
    );
};

SessionCardinAdmin.propTypes = {
    session: PropTypes.object,
    refetch: PropTypes.func
}

export default SessionCardinAdmin;