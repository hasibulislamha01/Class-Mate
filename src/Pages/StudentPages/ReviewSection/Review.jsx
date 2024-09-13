import { Flex, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from 'prop-types'
import Rating from "react-rating";

const Review = ({sessionId}) => {

    const axiosSecure = useAxiosSecure()

    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [value, setValue] = useState()
    const handleReview = (event) => {
        event.preventDefault()
        const ratingValue = value
        const ratingDescription = event.target.reviewDescription.value
        const ratingInfo = {
            ratingValue,
            ratingDescription,
            sessionId
        }
        axiosSecure.post('/reviews', ratingInfo)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    title: "Thank you for the review",
                    text: "Your review gives us inspiration",
                    icon: "success"
                  });
            }
        })
        .catch(err => {
            console.error(err.message)
        })
    }
    return (
        <div id='review' className="min-h-screen flex flex-col justify-center space-y-12">
            <h1 className="text-center text-3xl">Give a Review</h1>
            <form onSubmit={handleReview} className="space-y-4 w-1/2 mx-auto">
                <Flex gap="middle" vertical>
                    <Rate tooltips={desc} onChange={setValue} value={value} className="text-5xl" />
                    {value ? <span>{desc[value - 1]}</span> : null}
                </Flex>
                <TextArea
                    name="reviewDescription"
                    placeholder="describe your rating"
                    allowClear
                    className="text-lg"
                />
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};


Review.propTypes = {
    sessionId: PropTypes.string
}
export default Review;