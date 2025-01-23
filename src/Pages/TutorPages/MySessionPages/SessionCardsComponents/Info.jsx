import PropTypes from "prop-types";


const Info = ({ itemName, itemValue, unit }) => {
    return (
        <div className="flex flex-col justify-start">
            <p>{itemName}</p>
            <h3 className="font-bold">{itemValue} {unit}</h3>
        </div>
    );
};

Info.propTypes = {
    itemName: PropTypes.string,
    itemValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    unit: PropTypes.string
}
export default Info;