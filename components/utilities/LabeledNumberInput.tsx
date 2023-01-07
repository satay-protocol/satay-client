import React from 'react'

import { Box, NumberInput, NumberInputField, Text, useColorModeValue } from '@chakra-ui/react'

interface Props {
    label: string,
    value: string,
    onChange: (value: string) => void,
    placeholder: string,
    max?: number,
    min?: number,
}

const LabeledNumberInput: React.FC<Props> = ({ label, value, onChange, placeholder, max, min }) => {
  return (
    <Box
        flex={1}
        display="flex"
        flexDirection="column"
        gap={1}
    >
        <Text
            fontSize="xs"
            fontWeight="medium"
        >
            {label}
        </Text>
        <NumberInput
            value={value}
            onChange={onChange}
            focusBorderColor={useColorModeValue('brand.500', 'brand.400')}
            max={max}
            min={min}
        >
            <NumberInputField 
                placeholder={placeholder}
            />
        </NumberInput>
    </Box>
  )
}

export default LabeledNumberInput