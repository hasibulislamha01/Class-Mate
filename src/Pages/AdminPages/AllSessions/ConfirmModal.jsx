import Select from 'react-select'
import { useState } from 'react';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types'

const ApproveModal = ({ id, refetch }) => {

    const axiosSecure = useAxiosSecure()
    const paymentOptions = [
        { value: 'paid', label: 'Paid' },
        { value: 'free', label: 'Free' }
    ]


    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);

        const amountContainer = document.getElementById('amountContainer')
        const amountField = document.getElementById('amountField')
        if (selectedOption?.value === 'paid') {
            amountContainer.classList.remove('hidden')
            amountField.setAttribute('required', true)
            amountField.setAttribute('name', 'amount')

        }
        else {
            amountContainer.classList.add('hidden')
            amountField.removeAttribute('required', true)
        }
    };


    const handleApprove = (event) => {
        event.preventDefault()
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
            confirmButtonText: `Approve Session`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/sessions/${id}`, info)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                title: 'Success',
                                text: `You have approved the session`,
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
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle lowModal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <form onSubmit={handleApprove}>

                    <div>
                        <p>Is the Session Paid ?</p>
                        <Select
                            value={selectedOption}
                            onChange={handleChange}
                            id='select'
                            required
                            name='paymentStatus'
                            options={paymentOptions}
                            className="z-50"
                            placeholder='Select one'
                        />
                    </div>

                    <div id="amountContainer" className="input-container hidden">
                        <p>If paid, Enter amont</p>
                        <input
                            id="amountField"
                            type="number"
                        />
                    </div>
                    <button type="submit" className="btn ">Approve</button>
                </form>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

ApproveModal.propTypes = {
    id: PropTypes.string,
    refetch: PropTypes.func
}

export default ApproveModal;