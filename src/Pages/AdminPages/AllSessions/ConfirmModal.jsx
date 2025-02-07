import { Select, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const ApproveModal = ({ id, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const paymentOptions = [
        { value: 'paid', label: 'Paid' },
        { value: 'free', label: 'Free' }
    ];

    const [selectedOption, setSelectedOption] = useState(null);
    const [fee, setFee] = useState('0');
    const [ready, setReady] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setReady((selectedOption === 'free' && fee === '0') || (selectedOption === 'paid' && fee > 0));
    }, [fee, selectedOption]);

    const handleApprove = (event) => {
        event.preventDefault();
        const newStatus = 'approved';
        const info = selectedOption === 'paid' ? { newStatus, amount: fee } : { newStatus, amount: '0' };

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Approve Session`
        }).then((result) => {
            if (result.isConfirmed) {
                setIsSubmitting(true);
                axiosSecure.patch(`/sessions/${id}`, info)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: 'Success',
                                text: `You have approved the session`,
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error.message);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong! Please try again.',
                        });
                    })
                    .finally(() => setIsSubmitting(false));
            }
        });
    };

    return (
        <section className='w-full'>
            <form onSubmit={handleApprove} className='space-y-4 w-full'>

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
                    Approve
                </Button>
            </form>
        </section>
    );
};

ApproveModal.propTypes = {
    id: PropTypes.string.isRequired,
    refetch: PropTypes.func.isRequired
};

export default ApproveModal;
