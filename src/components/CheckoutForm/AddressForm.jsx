import React from 'react';
import { InputLabel, Select, MenuItem, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import FormInput from './FormInput';
 
const AddressForm = () => {
    const methods = useForm(); // gives us methods we need to use form


  return (
    <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit=''>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}><FormInput required name='firstName' label='First name'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput required name='lastName' label='Last name'/></Grid>
                    <Grid item xs={12}><FormInput required name='address1' label='Address line 1'/></Grid>
                    <Grid item xs={12}><FormInput required name='address2' label='Address line 2'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput required name='city' label='City'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput required name='state' label='State'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput required name='zip' label='Zip / Postal code'/></Grid>
                </Grid>
            </form>
        </FormProvider>

    </>
  )
}

export default AddressForm