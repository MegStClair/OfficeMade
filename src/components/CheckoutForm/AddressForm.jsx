import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import { commerce } from '../../library/Commerce';

import FormInput from './FormInput';
 
const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([]); 
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingRegions, setShippingRegions] = useState([]); 
    const [shippingRegion, setShippingRegion] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]); 
    const [shippingOption, setShippingOption] = useState('');

    const methods = useForm(); // gives us methods we need to use form
    
    //turning object into an array in order to loop over it & retrieving country code & name
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    // convert object into 2d array => map over it to turn into normal array & get code & name => return array with objects that have id and label
    console.log(countries)

    const fetchShippingCountries = async (checkoutTokenID) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenID);
        console.log(countries)
        setShippingCountries(countries);
        setShippingCountries(Object(countries))
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);


  return (
    <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit=''>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}><FormInput required name='firstName' label='First name'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput required name='lastName' label='Last name'/></Grid>
                    <Grid item xs={12}><FormInput required name='address1' label='Address'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput required name='city' label='City'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput required name='state' label='State'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput required name='zip' label='Zip / Postal code'/></Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.label}>{country.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <InputLabel>State / Providence</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Option</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Select Me
                            </MenuItem>
                        </Select>
                    </Grid>*/}
                </Grid> 
            </form>
        </FormProvider>

    </>
  )
}

export default AddressForm