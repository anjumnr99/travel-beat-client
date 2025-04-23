import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";


const Payment = () => {
    const {price} = useParams();
    console.log(price);
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckOutForm price={price} ></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;