import useGetLatestData from '../../CustomHooks/useGetLatestData'
import { Rate } from 'antd'

const Rating = ({sessionId}) => {
    const [data] = useGetLatestData(`/reviews?sessionId=${sessionId}`)
    return (
        <div className="text-sm font-semibold flex items-center gap-4">
            <h3>Rating:</h3>
            {data?.rating ?
                <Rate
                    style={{
                        fontSize: 16,
                        color: '#5CBFE9'
                    }} disabled value={data.rating} /> :
                <p className="font-medium text-xs">no reviews yet</p>
            }
        </div>
    )
}

export default Rating
