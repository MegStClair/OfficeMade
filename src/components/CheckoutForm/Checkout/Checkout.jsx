import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';    
import { Link } from 'react-router-dom';

import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../library/Commerce';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
    // traverse thrue steps using usestate
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    
    // functions that move step next and back
    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1);
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);
    

    useEffect(() => {
        if (cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type:'cart' });

                    console.log(token);

                    setCheckoutToken(token);
                } catch (error) {
                    console.log(error);
                }
            };

            generateToken();
        }
    }, [cart]);


    // once we get shipping data from address form, we populate with set & use passed in data, then call next step 
    const next = (data) => {
        setShippingData(data);
        nextStep();
    };


    let Confirmation = () => order.customer ? (
        <div>
            <Typography variant="h5"> Thank you for your purchase, {order.customer.firstname}</Typography>
            <Divider classNamme={classes.divider} />
            <Typography variant="subtitle2"> Order ref: {order.customer_reference}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Shop</Button>
        </div>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error) {
        Confirmation = () => (
        <>
        <Typography variant="h5">Error: {error}</Typography>
        </>
        );
    }

     //pass data to forms
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/> 
        
    
  return (
    <>
    <div className={classes.toolbar}/> 
    <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography variant="h4" align="center">Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((step) => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />} 
        </Paper>
    </main>
    </>
  )
}

export default Checkout