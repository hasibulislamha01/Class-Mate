import { Button, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from 'prop-types'
import useAuth from "../../../CustomHooks/useAuth";
// import Rating from "react-rating";
// import { CiStar } from "react-icons/ci";


const Review = ({ sessionId }) => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const userImage = user?.photoURL
    const userName = user?.displayName

    // console.log(user);
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [value, setValue] = useState()
    const [ratingDescription, setRatingDescription] = useState()
    const [ready, setReady] = useState(false)

    // Use effect to set ready state when value or ratingDescription change
    useEffect(() => {
        if (value && ratingDescription) {
            setReady(true);
        } else {
            setReady(false);
        }
    }, [value, ratingDescription]);

    const handleReview = (event) => {
        event.preventDefault()
        const ratingValue = value
        const ratingInfo = {
            ratingValue,
            ratingDescription,
            sessionId,
            userImage,
            userEmail: user?.email,
            userName,
            likes: 0,
            dislikes: 0,
            replies: 0,
        }
        console.log(ratingInfo, ready);
        axiosSecure.post('/reviews', ratingInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
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
        <section className="p-3 flex flex-col items-center justify-evenly gap-5">

            <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">Share your experience with the session.</h3>
                <p>
                    Your feedback is valuable in helpling us better understand the areas of improvements.
                </p>
            </div>

            <Rate style={{ fontSize: '1.9rem' }} tooltips={desc} onChange={setValue} value={value} />
            {value ? <span>{desc[value - 1]}</span> : null}

            <TextArea rows={4} placeholder="Describe your rating" maxLength={200} showCount onChange={(e) => setRatingDescription(e.target.value)} />

            <Button
                className="bg-primary dark:bg-dark-primary text-accent"
                disabled={!ready}
                onClick={handleReview}>Submit Review
            </Button>
        </section>
    );
};


Review.propTypes = {
    sessionId: PropTypes.string
}
export default Review;