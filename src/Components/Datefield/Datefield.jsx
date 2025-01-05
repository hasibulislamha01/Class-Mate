import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';


const { RangePicker } = DatePicker;

const Datefield = ({ setStart, setEnd }) => {


    const handleDateChange = (dates) => {

        const startingDate = dates && dates[0] ? dayjs(dates[0]).format('MM-DD-YYYY') : null;
        const endingDate = dates && dates[1] ? dayjs(dates[1]).format('MM-DD-YYYY') : null;

        if (dates) {
            setStart(startingDate)
            setEnd(endingDate)
        }
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };


    return (

        <RangePicker
            onChange={handleDateChange}
            disabledDate={disabledDate}
        />

    );
};

Datefield.propTypes = {
    setStart: PropTypes.func.isRequired,
    setEnd: PropTypes.func.isRequired,
};

export default Datefield;
