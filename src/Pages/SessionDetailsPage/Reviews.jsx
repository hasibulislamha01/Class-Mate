import { UserOutlined } from '@ant-design/icons';
import { Avatar, Rate } from 'antd';
import useGetLatestData from '../../CustomHooks/useGetLatestData';
import PropTypes from 'prop-types';

const Reviews = ({ sessionId }) => {

    // console.log(sessionId);
    const [data] = useGetLatestData(`/reviews?sessionId=${sessionId}`)
    // console.log(data);
    return (

        <section className='min-h-48 flex flex-col justify-center items-center'>
            <h1 className='my-10 font-semibold text-lg'>User Reviews</h1>
            {data?.length !== 0 ?
                data?.map(review =>
                    <div
                        key={review._id}
                        className=' flex items-center gap-4'>
                        {/* {console.log(typeof review.ratingValue)} */}
                        <div className=''>
                            {
                                review.reviewerImage ?
                                    <img
                                        src={review?.reviewerImage}
                                        alt="User image"
                                    /> :
                                    <Avatar
                                        style={{
                                            backgroundColor: '#87d068',
                                        }}
                                        icon={<UserOutlined />}
                                    />

                            }
                        </div>
                        <div>
                            <Rate
                                style={{ fontSize: '1rem' }}
                                disabled
                                defaultValue={review.ratingValue}
                            />
                            <p>{review.ratingDescription}</p>
                        </div>
                    </div>
                ) :
                
                    <h3 className='font-semibold text-sm text-red-500'>No Reviews Yet</h3>
            }

        </section>
    )
};

Reviews.propTypes = {
    sessionId: PropTypes.string
}
export default Reviews;
