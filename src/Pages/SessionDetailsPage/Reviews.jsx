import { UserOutlined } from '@ant-design/icons';
import { Avatar, Rate } from 'antd';
import useGetLatestData from '../../CustomHooks/useGetLatestData';
import PropTypes from 'prop-types';

const Reviews = ({ sessionId }) => {

    // console.log(sessionId);
    const [data] = useGetLatestData(`/reviews?sessionId=${sessionId}`)
    // console.log(data);
    return (

        <section className='min-h-48 flex flex-col justify-center'>
            <h1 className='text-primary text-xl font-semibold text-center mb-8'>User Reviews</h1>
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
                <div className='h-48 flex flex-col items-center justify-center'>
                    <h3 className='text-lg font-bold'>No Reviews Yet</h3>
                </div>
            }

        </section>
    )
};

Reviews.propTypes = {
    sessionId: PropTypes.string
}
export default Reviews;
