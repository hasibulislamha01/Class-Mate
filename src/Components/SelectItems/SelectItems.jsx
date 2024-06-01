import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectItems = ({options, title}) => {

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#1d2b3a',
            border: '1px solid #ffffff40',
            borderRadius: '5px',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'lightblue', // Change text color to red
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#1d2b3a' : 'lightblue',
            color: state.isSelected ? 'white' : 'black',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'lightblue',
        }),
    };


    return (
        <Select
            options={options}
            className='w-full selectStyles'
            placeholder={title}
            name="category"
            required="required"
            styles={customStyles}
        >
        </Select>
    );
};

SelectItems.propTypes =  {
    options: PropTypes.array,
    title: PropTypes.string
}

export default SelectItems;