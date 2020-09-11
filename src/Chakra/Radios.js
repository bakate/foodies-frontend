/* eslint-disable react/display-name */
import { Button, RadioButtonGroup } from '@chakra-ui/core';
import React from 'react';

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      size="sm"
      rounded={{ base: 'sm', md: 'full' }}
      px={{ md: '4' }}
      ref={ref}
      fontSize={{ base: '10px', md: 'md' }}
      letterSpacing={{ base: 'tight' }}
      colorScheme={isChecked ? 'red' : 'gray'}
      aria-checked={isChecked}
      lineHeight={{ base: 'shorter' }}
      role="radio"
      overflow="hidden"
      isDisabled={isDisabled}
      {...rest}
    />
  );
});

// Step 2: Add `CustomRadio` as children of `RadioButtonGroup`
function Languages() {
  return (
    <RadioButtonGroup
      p={{ base: '0 1rem', md: '.4rem 2rem 0 0' }}
      defaultValue="french"
      onChange={val => console.log(val)}
      backgroundColor="black"
      display="flex"
      justifyContent={{ base: 'center', md: 'flex-end' }}
      isInline
    >
      <CustomRadio value="french">Fran&ccedil;ais</CustomRadio>
      <CustomRadio value="english">Anglais</CustomRadio>
      <CustomRadio value="spanish">Espagnol</CustomRadio>
      <CustomRadio value="italian"> Italien</CustomRadio>
      <CustomRadio value="polska"> Polonais</CustomRadio>
      <CustomRadio value="chinese"> Chinois</CustomRadio>
    </RadioButtonGroup>
  );
}

export default Languages;
