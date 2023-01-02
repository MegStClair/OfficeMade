import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); //stripe API key


const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    
    // error handling
    if(!stripe || !elements) return;

    // get element by passing in cardElement
    const cardElement = elements.getElement(CardElement);

    //use Stripe API to create payment method
    const { error, paymentMethod} = await stripe.createPaymentMethod({ type:'card', card: cardElement})

    //handle error, if none- create object containing all data (products, customer, address, shipping, payment info, etc)
    if(error) {
      console.log(error)
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { 
          name: 'Primary', 
          street: shippingData.address, 
          town_city: shippingData.city, 
          county_state: shippingData.shippingSubdivision, 
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: { payment_method_id: paymentMethod.id }
        }
      }
      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  }


  return (
    <>
      <Review checkoutToken={checkoutToken}/>
      <Divider />
      <Typography variant="h6" gutterBottom style={{margin:'20 px 0'}}>Payment Method</Typography>
      {/* below is done by Stripe (Stripe's pre-made Elements)  */}
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
              <CardElement />
              <br /><br/>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">Pay {checkoutToken.subtotal.formatted_with_symbol}</Button>
              </div>
            </form>

          )}
        </ElementsConsumer>

      </Elements>
    </>
  )
}

export default PaymentForm;