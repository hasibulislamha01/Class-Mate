import Rating from "react-rating";
import { CiStar } from "react-icons/ci";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const ReviewModal = ({ bookedSessions, showModal }) => {

    const [rating, setRating] = useState(0)
    const [ratingError, setRatingError] = useState('')
    const handleSetReview = (newRating) => {
        setRating(newRating)
    }
    // console.log(ratingValue);

    const handleSubmit = (e) => {
        e.preventDefault()
        const sessionId = bookedSessions?.sessionId
        const ratingValue = rating
        const ratingDescription = e.target.description.value
        const ratingInfo = {
            ratingValue,
            ratingDescription,
            sessionId
        }
        const submitReview = () => {
            console.log('submitted', ratingInfo);

        }
        if (ratingValue === 0) {
            setRatingError('Please enter a rating value')
            return
        }
        setRatingError('')
        submitReview()

    }
    return (
        <div id="modal" className={`absolute top-[15%] left-[50%] translate-x-[-50%] translatte-y-[50%]  w-[80%] md:w-[50%] mx-auto py-12 rounded-lg bg-sky-100 z-10 ${showModal ? 'block' : 'hidden'}`}>
            
            <IoIosClose size={40} className="absolute top-0 right-0 cursor-pointer"/>

            <h1 className="text-center text-lg font-medium mb-5">Share your experience about the session</h1>

            {
                ratingError &&
                <h1 className="text-center text-red-500">{ratingError}</h1>
            }

            <form action=""
                className="flex flex-col items-center justify-center gap-4"
                onSubmit={handleSubmit}
            >

                <Rating
                    quiet={false}
                    initialRating={rating}
                    emptySymbol={
                        <CiStar size={40} color=""/>
                    }
                    fullSymbol={
                        <CiStar size={40} color="#f59e0b"/>
                    }
                    onChange={handleSetReview}
                />

                <p>current rating: {rating}</p>

                <textarea
                    className="border border-gray-300 w-[70%]"
                    name="description" id="" required></textarea>

                <button type="submit" className="btn px-24 bg-primary text-white font-bold">Submit</button>

            </form>

        </div>
    );
};

export default ReviewModal;