import { LikeOutlined, MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, List, Rate } from 'antd';
import useGetLatestData from '../../CustomHooks/useGetLatestData';
import PropTypes from 'prop-types';
// const data = Array.from({
//     length: 23,
// }).map((_, i) => ({
//     href: 'https://ant.design',
//     title: `ant design part ${i}`,
//     avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//     description:
//         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }));
// const IconText = ({ icon, text }) => (
//     <Space>
//         {React.createElement(icon)}
//         {text}
//     </Space>
// );

const Reviews = ({ sessionId }) => {

    const [data, refetch] = useGetLatestData(`/reviews/${sessionId}`)
    console.log(typeof data[0]?.ratingValue);

    return (

        <section>
            {
                data?.map(review =>
                    <div
                        key={review._id}
                        className='flex items-center gap-4'>
                            {console.log(typeof review.ratingValue)}
                        <div>
                            {
                                review.reviewerImage ?
                                    <img
                                        src={review?.reviewerImage}
                                        alt="User image" /> :
                                    <Avatar
                                        style={{
                                            backgroundColor: '#87d068',
                                        }}
                                        icon={<UserOutlined />}
                                    />

                            }
                        </div>
                        <div>
                            <Rate style={{fontSize: '1rem'}} disabled defaultValue={review.ratingValue} />
                            <p>{review.ratingDescription}</p>
                        </div>
                    </div>
                )}
        </section>
    )
};

Reviews.propTypes = {
    sessionId: PropTypes.string
}
export default Reviews;
