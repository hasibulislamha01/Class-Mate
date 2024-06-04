import PropTypes from 'prop-types'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { IoIosArrowDown } from 'react-icons/io';
import useAuth from '../../../CustomHooks/useAuth';
import useFormateDate from '../../../CustomHooks/useFormateDate';
import { CardMedia } from '@mui/material';
import { Button } from 'antd';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const SessionCard = ({ mySession, refetch }) => {
    // console.log(mySession)
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const sessionId = mySession?._id
    const tutorPhoto = user?.photoURL
    // const tutorName = mySession?.tutorName
    const sessionTitle = mySession?.sessionTitle
    // const registrationStartingDate = mySession?.registrationStarts
    const formattedRegistrationStartingDate = useFormateDate(mySession?.registrationStarts)
    const formattedRegistrationEndingDate = useFormateDate(mySession?.registrationEnds)
    const formattedClassStartingDate = useFormateDate(mySession?.classStarts)
    const formattedClassEndingDate = useFormateDate(mySession?.classEnds)
    const applyingDate = useFormateDate(mySession?.applyingDate)
    const duration = mySession?.duration
    const registrationFee = mySession?.registrationFee
    const status = mySession?.status
    const sessionImage = mySession?.sessionImage


    let badgeBg = 'white'
    if (status === 'pending') {
        badgeBg = 'bg-warning'
    }
    else if (status === 'approved') {
        badgeBg = 'bg-[#15803d] text-[#dcfce7]'
    }
    else if (status === 'rejected') {
        badgeBg = 'bg-[#dc2626] text-[#fef2f2]'
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };




    const handleRequestforApproval = (id, newStatus) => {
        // console.log('requesting', id)
        return axiosSecure.patch(`/sessions/${id}`, { newStatus })
            // .then(res => {
            //     console.log(res.data)
            //     if (res.data.modifiedCount) {
            //         toast.success('Request sent to Administrator')
            //         refetch()
            //     }
            // })
            // .catch(error => {
            //     console.error(error.message)
            // })
    }

    const wrapper = (id, newStatus) => {
        toast.promise(
            handleRequestforApproval(id, newStatus)
                .then(res => {
                    console.log(res.data)
                    if (res.data.modifiedCount) {
                        refetch()

                    }
                })
                .catch(error => {
                    console.error(error.message)
                }),

            {
                loading: 'Saving...',
                success: <b>Request Sent to Administrator</b>,
                error: <b>Could not sent Request</b>,
            }

        )
    }


    return (
        <Card sx={{ maxWidth: 345 }}>
            <Toaster></Toaster>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], }} aria-label="recipe">
                        <img src={tutorPhoto} alt="" />
                    </Avatar>
                }
                action={

                    <div className='w-full font-semibold'>
                        <div id='status-badge' className={`badge border-transparent w-[100px] mt-3 p-3 ${badgeBg}`}>{status}</div>
                    </div>

                }
                title={sessionTitle}
                subheader={applyingDate}
            ></CardHeader>

            <CardMedia
                component="img"
                className='h-[200px] object-contain'
                image={sessionImage}
                alt="Paella dish"
            />

            <CardContent>

                <div className='grid grid-cols-2 justify-items-stretch gap-6'>

                    <div className='text-center'>
                        <p className=''>Registration Starts</p>
                        <h1 className='font-medium'>{formattedRegistrationStartingDate}</h1>
                    </div>
                    <div className='text-center'>
                        <p className=''>Registration Ends</p>
                        <h1 className='font-medium'>{formattedRegistrationEndingDate}</h1>
                    </div>

                    <div className='text-center'>
                        <p className=''>Class Starts</p>
                        <h1 className='font-medium'>{formattedClassStartingDate}</h1>
                    </div>
                    <div className='text-center'>
                        <p className=''>Class Ends</p>
                        <h1 className='font-medium'>{formattedClassEndingDate}</h1>
                    </div>

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
            <CardActions disableSpacing className=''>

                {
                    status === 'rejected' ?
                        <Button onClick={() => wrapper(sessionId, 'pending')} type="primary">Request a new Approval</Button>
                        : <></>
                }

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <IoIosArrowDown />

                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant='h5'>Session Details</Typography>
                    <Typography paragraph>
                        {mySession?.description}
                    </Typography>
                </CardContent>
            </Collapse>

        </Card>
    );
};

SessionCard.propTypes = {
    mySession: PropTypes.object,
    refetch: PropTypes.func
}

export default SessionCard;