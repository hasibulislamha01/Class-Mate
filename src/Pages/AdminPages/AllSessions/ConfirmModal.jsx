import Select from 'react-select'
import './modal'
import { useState } from 'react';

const ApproveModal = () => {


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
        const paymentStatus = form.paymentStatus.value;
        const amount = form?.amount?.value;
        const defaultAmount = 0

        let info = {}
        if (selectedOption?.value === 'paid') {
            info = { paymentStatus, amount }
        }
        else {
            info = { paymentStatus, defaultAmount }
        }
        console.log(info)
    }
    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
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

export default ApproveModal;