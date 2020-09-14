import { FormControl, FormLabel, Input, Select, Textarea, Tooltip } from '@chakra-ui/core'
import { useField } from 'formik'
import React from 'react'

const InputField = ({ label, items, element, ...props }) => {
  const [field, { error, touched }] = useField(props)
  const el =
    element === 'textarea' ? (
      <Textarea {...field} {...props} id={field.name} variant='filled' mb={2} />
    ) : element === 'select' ? (
      <Select id={field.name} variant='filled' mb={2} {...field} {...props}>
        {items.map((item, id) => (
          <option key={id} value={item}>
            {item}
          </option>
        ))}
      </Select>
    ) : (
      <Input {...field} {...props} id={field.name} variant='filled' mb={2} />
    )

  return (
    <FormControl isInvalid={!!error && !!touched} id={field.name}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Tooltip hasArrow label={error} bg='red.600' placement={'top'} isDisabled={!touched}>
        {el}
      </Tooltip>
    </FormControl>
  )
}

export default InputField
