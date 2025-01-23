import { Button, Tooltip } from "antd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { RiSendPlane2Line } from "react-icons/ri";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import PropTypes from "prop-types";

const MakeCardTitleForTutor = ({ tutorPhoto, sessionId, sessionTitle, status, refetch }) => {

    const axiosSecure = useAxiosSecure()

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

    const handleRequestforApproval = (id, info) => {
        console.log('requesting id, info', id, info)
        return axiosSecure.patch(`/sessions/request/${id}`, info)
        .then(res => {
            console.log(res.data)
            if (res.data.modifiedCount) {
                toast.success('Request sent to Administrator')
                refetch()
            }
        })
        .catch(error => {
            console.error(error.message)
        })
    }

    const wrapper = (id, newStatus) => {
        const defaultAmount = 0
        const info = { newStatus, defaultAmount }
        toast.promise(
            handleRequestforApproval(id, info)
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
        <div className='my-2 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <img src={tutorPhoto} alt="tutor photo" className='h-8 w-8 object-cover rounded-full' />
                <Link to={`/sessions/${sessionId}`}>
                    <h1 className='font-bold text-primary hover:underline hover:underline-offset-4'>{sessionTitle}</h1>
                </Link>
                <h3 className='ml-2 font-md text-xs'>Star</h3>
            </div>
            <div className='flex items-center gap-1 text-text dark:text-dark-text'>
                {
                    status === 'rejected' &&
                    <Tooltip title='Request For Approval'>
                        <Button
                            shape='circle'
                            icon={<RiSendPlane2Line />}
                            className='mx-2'
                            onClick={() => wrapper(sessionId, 'pending')}
                        ></Button>
                    </Tooltip>
                }
                <div className={`${badgeBg} h-3 w-3 rounded-full`}></div>
                <h5 className='text-xs'>{status}</h5>
            </div>
        </div>
    );
};

MakeCardTitleForTutor.propTypes = {
    tutorPhoto: PropTypes.string,
    sessionId: PropTypes.string,
    sessionTitle: PropTypes.string,
    status: PropTypes.string,
    refetch: PropTypes.func
}
export default MakeCardTitleForTutor;