import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Grid, Typography, Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../library/Commerce';

import FormInput from './FormInput';
 
const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]); 
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]); 
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]); 
    const [shippingOption, setShippingOption] = useState('');

    const methods = useForm(); // gives us methods we need to use form
    
    //turning object into an array in order to loop over it & retrieving country code & name
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })); // convert object into 2d array => map over it to turn into normal array & get code & name => return array with objects that have id and label
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })); // loop thru second grid's select values
    const options = shippingOptions.map((shipOpt) => ({ id: shipOpt.id, label: `${shipOpt.description} - (${shipOpt.price.formatted_with_symbol})`})); // options are an array by default, so we can map

    const fetchShippingCountries = async (checkoutTokenID) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenID);

        setShippingCountries(countries);
        setShippingCountries(Object.keys(countries));
    }

    const fetchSubdivisions = async (checkoutTokenID, countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(checkoutTokenID, countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions));
    }

    const fetchShippingOptions = async (checkoutTokenID, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenID, {country, region});

        setShippingOptions(options);
        setShippingOption(options[0].id);
    }



    // fetching countries
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [checkoutToken.id]);

    // fetching subdivisions
    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry); //if shipping country exists, call fetch
    }, [shippingCountry]);  // when shipping coutnry is selected, recall useEffect

    // fetching shipping options
    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision.id)
    }, [checkoutToken.id, shippingCountry, shippingSubdivision]);   


  return (
    <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            {/*call next on submit & give it params to pass: spread data object, plus individual shipping values to use later*/}
            <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}> 
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}><FormInput name='firstName' label='First name'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput name='lastName' label='Last name'/></Grid>
                    <Grid item xs={12}><FormInput name='address' label='Address'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput name='city' label='City'/></Grid>
                    <Grid item xs={12} sm={6}><FormInput name='zip' label='Zip / Postal code'/></Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.label}>{country.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>State / Province</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                            {subdivisions.map((subdivision) => (
                                <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>                    
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Option</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map((option) => (
                                <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}><FormInput name='email' label='Email'/></Grid>
                </Grid> 
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button component={Link} to="/cart" variant="outlined">Edit Cart</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>
                </div>
            </form>
        </FormProvider>

    </>
  )
}

export default AddressForm