import useGetLatestData from "../../CustomHooks/useGetLatestData";
import PropTypes from 'prop-types'


const UsersSummeryCard = ({api}) => {


    const [data] = useGetLatestData(api, api)
    console.log(data, api);
    


    return (
        <div className="bg-sky-100 rounded-md">

        </div>
    );
};


UsersSummeryCard.propTypes = {
    api: PropTypes.string
}
export default UsersSummeryCard;