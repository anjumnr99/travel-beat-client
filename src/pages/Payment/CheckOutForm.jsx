import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


// eslint-disable-next-line react/prop-types
const CheckOutForm = ({price}) => {
    const [error,setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const {user} = useContext(AuthContext);
    console.log(price);
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
        axiosSecure.post('/create-payment-intent', price)
        .then(res=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
    },[axiosSecure, price])

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          if (error) {
            console.log('[error]', error);
            setError(error.message);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
          }

        //   confirm payment 
        const { paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card: card,
                billing_details:{
                    email: user?.email || 'Anonymous',
                    name: user?.displayName || 'Anonymous'
                }
            }
        })

        if(confirmError){
            console.log('confirm error');
        }else{
            if(paymentIntent.status === 'succeeded'){
                setTransactionId(paymentIntent.id)
            }
        }
    }
    return (
        <form onClick={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-md btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {
                transactionId && <p className="text-green-500">
                    Your transaction id : {transactionId}
                </p>
            }
        </form>
    );
};

export default CheckOutForm;