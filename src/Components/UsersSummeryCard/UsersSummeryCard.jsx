import PropTypes from 'prop-types'
import useGetLatestData from '../../CustomHooks/useGetLatestData';
import { Card } from 'antd';


const UsersSummeryCard = ({ api, subTitle }) => {

    // console.log(api);
    const [data] = useGetLatestData(api)
    // console.log(data?.count);



    return (

        <Card
            className='shadow-lg hover:shadow-primary/20'
        >
            <h1 className='text-xl lg:text-2xl font-semibold'>{data?.count || 0} </h1>
            <h3 className='text-text text-[0.9rem]'>{subTitle}</h3>
        </Card>

    );
};


UsersSummeryCard.propTypes = {
    api: PropTypes.string,
    subTitle: PropTypes.string
}
export default UsersSummeryCard;