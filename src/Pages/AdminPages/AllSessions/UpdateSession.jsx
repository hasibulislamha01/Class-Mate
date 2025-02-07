import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Select } from 'antd'
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import { Button, Input } from "antd";
import PropTypes from "prop-types";


const paymentOptions = [
    { value: 'paid', label: 'Paid' },
    { value: 'free', label: 'Free' }
]


const UpdateSession = ({ sessionId }) => {

    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const sessionArr = useGetLatestData(`/sessions/${sessionId}`)
    const session = sessionArr[0]

    const [selectedOption, setSelectedOption] = useState(null);
    const [fee, setFee] = useState('0');
    const [ready, setReady] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // console.log(selectedOption, fee)

    useEffect(() => {
        if (selectedOption === 'free') {
            setFee('0')
        }
        setReady((selectedOption === 'free' && fee === '0') || (selectedOption === 'paid' && fee > 0));

    }, [fee, selectedOption]);
    // console.log(sessionArr)


    const sessionTitle = session?.sessionTitle
    const sessionImg = session?.sessionImage

    // console.log(sessionTitle, sessionImg)




    const handleUpdate = (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        const form = event.target;
        // const paymentStatus = form.paymentStatus.value;
        const amount = form?.amount?.value;
        const defaultAmount = '0'
        const newStatus = 'approved'

        let info = {}
        if (selectedOption?.value === 'paid') {
            info = { newStatus, amount }
        }
        else {
            info = { newStatus, defaultAmount }
        }
        console.log(info)

        Swal.fire({
            title: "Are you sure?",
            customClass: 'swal-container',
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Update Session`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/sessions/${sessionId}`, info)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount) {
                            // refetch()
                            Swal.fire({
                                title: 'Success',
                                text: `You have Updated the session`,
                                icon: "success",
                            });
                            setIsSubmitting(false)
                        }
                        else {
                            Swal.fire({
                                title: "The session wasn't updated",
                                text: "You provided the same data the session had before",
                                icon: "question"
                            });
                            setIsSubmitting(false)
                        }
                    })
                    .catch(error => {
                        console.error(error.message)
                    })

            }
            else {
                navigate('/dashboard/admin/allSessions')
            }
        })

    }


    return (
        <div className="">
            <h1 className="text-lg font-semibold text-primary">Update Session</h1>
            <div className=" pt-5 flex flex-col lg:flex-row justify-start items-center gap-6">

                <div className=" w-[60%] space-y-3 text-left">
                    <img src={sessionImg} alt="session image" className="rounded-md w-full h-full object-cover" />
                    <h1 className="text-lg text-primary">{sessionTitle}</h1>
                    <p className="text-sm">Expected Time: {session?.duration} hours</p>
                </div>
                <form onSubmit={handleUpdate} className='space-y-4 w-full'>

                    <div className='w-full'>
                        <label htmlFor="paymentStatus" className='block mb-1'>Is the Session Paid?</label>
                        <Select
                            value={selectedOption}
                            onChange={(value) => setSelectedOption(value)}
                            id="paymentStatus"
                            required
                            options={paymentOptions}
                            className="z-50 w-full"
                            placeholder="Select one"
                        />
                    </div>

                    {selectedOption === 'paid' && (
                        <div>
                            <label htmlFor="fee" className='block mb-1'>Set a Registration Fee</label>
                            <Input
                                id="fee"
                                value={fee}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        setFee(value);
                                    }
                                }}
                                placeholder="Enter a number"
                                className="w-full"
                                required
                            />
                        </div>
                    )}

                    <Button disabled={!ready || isSubmitting} loading={isSubmitting} htmlType='submit' type='primary'>
                        Update
                    </Button>
                </form>
            </div>

        </div>
    );
};

UpdateSession.propTypes = {
    sessionId: PropTypes.string
}
export default UpdateSession;