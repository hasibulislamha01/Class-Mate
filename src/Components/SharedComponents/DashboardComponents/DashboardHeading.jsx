import PropTypes from 'prop-types'


const DashboardHeading = ({title, subtitle}) => {
    return (
        <section className="text-sm mt-2 mb-5">
            <h1 className="font-semibold text-primary text-left">{title}</h1>
            <p>{subtitle}</p>
        </section>
    );
};


DashboardHeading.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
}
export default DashboardHeading;