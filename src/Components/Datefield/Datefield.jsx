import { useState } from "react";
import { DatePicker } from 'antd';
import PropTypes from 'prop-types'
// import dayjs from 'dayjs';
import useTodaysDate from "../../CustomHooks/useTodaysDate";


const { RangePicker } = DatePicker;
// const disabledDate = (current) => {
//     // Can not select days before today and today
//     return current && current < dayjs().endOf('day');
// };

const Datefield = ({ setStart, setEnd }) => {
    const today = useTodaysDate
    const [startDate, setStartDate] = useState(null)
    console.log(startDate, today,);

    return (
        <div className="">
            <RangePicker
                onchange={(e) => setStartDate(e.target.value)}
            />
        </div>
    );
};

Datefield.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
}

export default Datefield;