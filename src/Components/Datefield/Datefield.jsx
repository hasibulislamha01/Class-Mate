import { useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types'

const Datefield = ({ name, label }) => {
    const [startDate, setStartDate] = useState(null)

    return (
        <div className="date-picker-container">
            <DatePicker
                name={name}
                required="required"
                className="date-picker-input"
                id="date-picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            ></DatePicker>
            <label
                className={`date-picker-label ${startDate ? "date-picker-label-active" : ""
                    }`}
            >{label}</label>
        </div>
    );
};

Datefield.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
}

export default Datefield;