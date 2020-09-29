import { HStack, Radio, RadioGroup } from '@chakra-ui/core'
import React from 'react'
// const items = ['entrée', 'plat principal', 'aperitif et buffet', 'dessert', 'toutes']

const SideMenu = (props) => {
  return (
    <HStack spacing='1rem' {...props} pt={3}>
      <RadioGroup name='category'>
        <Radio>Entrée</Radio>
        <Radio>Plat</Radio>
        <Radio>Dessert</Radio>
        <Radio>Apéritif</Radio>
      </RadioGroup>
    </HStack>
  )
}

export default SideMenu
