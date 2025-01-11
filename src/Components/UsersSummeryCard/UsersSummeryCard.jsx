import PropTypes from 'prop-types'
import useGetLatestData from '../../CustomHooks/useGetLatestData';


const UsersSummeryCard = ({ api }) => {

    // console.log(api);
    const [data] = useGetLatestData(api)
    console.log(data?.count);



    return (
        <div className="bg-sky-100 rounded-md p-4">
            <h3 className='font-semibold text-lg'>Total Enrollment</h3>
            <h1 className='text-3xl'>{data?.count || 0} </h1>
        </div>
    );
};


UsersSummeryCard.propTypes = {
    api: PropTypes.string
}
export default UsersSummeryCard;