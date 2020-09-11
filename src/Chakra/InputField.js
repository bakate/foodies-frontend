import { FormControl, FormLabel, Input, Textarea, Tooltip } from '@chakra-ui/core'
import { useField } from 'formik'
import React from 'react'

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
      </FormControl>
    </Tooltip>
  )
}

export default InputField
