import React from 'react';
import { TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
      <Controller control={control} name={name} render={({field}) => <TextField {...field} name={name} fullWidth label={label} required />}/>
  );
}

export default FormInput