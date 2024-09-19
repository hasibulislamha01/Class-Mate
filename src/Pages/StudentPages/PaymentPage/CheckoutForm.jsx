import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAuth from "../../../CustomHooks/useAuth";
import useTodaysDate from "../../../CustomHooks/useTodaysDate";
import Swal from "sweetalert2";
import PropTypes from 'prop-types'
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ session, clientSecret }) => {

    const { user } = useAuth()
    // const paymentData = { amount: session?.registrationFee, }
    const stripe = useStripe();
    const navigate = useNavigate()
    const elements = useElements();
    const todaysDate = useTodaysDate()
    const axiosSecure = useAxiosSecure()
    // const axiosSecure = useAxiosSecure()

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const studentEmail = user?.email
    const sessionId = session?._id
    // console.log(sessionId, studentEmail, regFee)
    const bookedSessionInfo = {
        ...session,
        sessionId,
        studentEmail
    }
    delete bookedSessionInfo?._id
    console.log(bookedSessionInfo)

    const handleCheckout = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            setIsLoading(false)
            return;
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            setIsLoading(false)
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.error('[error]', error);
            setError(error.message)
            setIsLoading(false)
            return
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
            setIsLoading(false)
        }

        const { error: confirmationError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName
                }
            },

        })

        if (confirmationError) {
            console.error(confirmationError)
            setError(confirmationError.message)
            setIsLoading(false)
            return
        }

        if (paymentIntent.status === 'succeeded') {
            // creating payment info
            const paymentInfo = {
                ...bookedSessionInfo,
                transactionId: paymentIntent.id,
                date: todaysDate,
            }
            axiosSecure.post('/bookedSessions', bookedSessionInfo)
                .then(response => {
                    console.log(response.data)
                    if (response.data.insertedId) {
                        Swal.fire({
                            title: "Congratulations",
                            text: 'You Booked the session',
                            width: 600,
                            padding: "3em",
                            color: "#716add",
                            background: "#fff url(/images/trees.png)",
                            backdrop: `
                              rgba(0,0,123,0.4)
                              url("/images/nyan-cat.gif")
                              left top
                              no-repeat
                            `
                        });
                    } else {
                        Swal.fire({
                            title: "Session Booked but failed to save",
                            text: "You booked the session",
                            icon: "success"
                        });
                    }
                })
            console.log(paymentInfo)
            setIsLoading(false)
            navigate('/dashboard/student/bookedSessions')
        }

    }

    // const paymentElementOptions = {
    //     layout: "tabs"
    // }

    const spinner = <span className="loading loading-spinner loading-sm"></span>

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: "#424770",
                fontSize: "16px",
                fontFamily: 'Arial, sans-serif',
                fontWeight: '500',
                fontSmoothing: "antialiased",
                letterSpacing: '0.025em',
                "::placeholder": {
                    color: "#aab7c4",
                    fontStyle: 'italic',
                },
            },
            invalid: {
                color: "#9e2146",
                textDecoration: 'underline',
            },
            complete: {
                color: "#4caf50",
            },
        },
    }
    return (
        <form onSubmit={handleCheckout} >
            {/* <PaymentElement id="payment-element" options={paymentElementOptions} /> */}
            <CardElement
            className="h-[100px] bg-sky-50 rounded-lg"
                options={CARD_ELEMENT_OPTIONS}
            />
            <button className="btn mx-auto w-[200px]" type="submit" disabled={!stripe}>
                {isLoading ? spinner : 'Pay'}
            </button>
            <p className="text-red-500">{error}</p>
        </form>
    );
};

CheckoutForm.propTypes = {
    session: PropTypes.object,
    clientSecret: PropTypes.string
}

export default CheckoutForm;