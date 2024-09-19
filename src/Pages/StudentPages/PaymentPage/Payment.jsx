import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";

const Payment = () => {

    const [session] = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const publishableKey = import.meta.env.VITE_payment_publishable_key
    const stripePromise = loadStripe(publishableKey)

    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', session)
            .then(res => {
                console.log(res.data)
                setClientSecret(res.data.clientSecret)
            })
            .catch(error => {
                console.error(error.message)
            })
    }, [axiosSecure, session])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    console.log(clientSecret)

    return (
        <div className="min-h-screen flex flex-col justify-center items-center border border-green-300">
            <h1>Please Pay</h1>
            <div className="w-1/2 border border-blue-300">
                {
                    clientSecret &&
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm
                            session={session}
                            clientSecret={clientSecret}
                        ></CheckoutForm>
                    </Elements>
                }
            </div>
        </div>
    );
};

export default Payment;