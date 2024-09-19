import PropTypes from 'prop-types'
import useGetDocumentCounts from '../../CustomHooks/useGetDocumentCounts';


const UsersSummeryCard = ({ api }) => {

    // console.log(api);
    const number = useGetDocumentCounts(api)
    console.log(number);



    return (
        <div className="bg-sky-100 rounded-md p-4">
            <h3 className='font-semibold text-lg'>Total Enrollment</h3>
            <h1 className='text-3xl'>{number}</h1>
        </div>
    );
};


UsersSummeryCard.propTypes = {
    api: PropTypes.string
}
export default UsersSummeryCard;