import Select from 'react-select'

const PaymentStatus = () => {

    const options = [
        { value: 'paid', label: 'Paid' },
        { value: 'free', label: 'Free' }
    ]
    return (
        <Select
            // onChange={}
            id='select'
            required
            name='paymentStatus'
            options={options}
        />
    );
};

export default PaymentStatus;