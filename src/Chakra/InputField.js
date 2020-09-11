import { FormControl, FormLabel, Input, Textarea, Tooltip } from '@chakra-ui/core'
import { useField } from 'formik'
import React from 'react'

// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
// which we can spread on <input> and also replace ErrorMessage entirely.

const InputField = ({ textarea, label, ...props }) => {
  const [field, { error, touched }] = useField(props)
  let InputOrTextarea = Input
  if (textarea) {
    InputOrTextarea = Textarea
  }
  return (
    <Tooltip hasArrow label={error} bg='red.600' placement='left' isDisabled={!touched}>
      <FormControl isInvalid={!!error && !!touched} id={field.name}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <InputOrTextarea {...field} {...props} id={field.name} variant='filled' mb={2} />
        {/* {!!error && <FormErrorMessage>{error}</FormErrorMessage>} */}
      </FormControl>
    </Tooltip>

    // <Field name={props.name}>
    //   {({ field, form }) => (
    // <Tooltip hasArrow label={form.error.id} bg='red.600' placement='left' isDisabled={!touched}>
    //   <FormControl id={props.id} isInvalid={}>
    //     <FormLabel>{props.label}</FormLabel>
    //     <Input variant='filled' {...props} {...field} id={props.id} />
    //   </FormControl>
    // </Tooltip>
    //   )}
    // </Field>
  )
}

export default InputField
