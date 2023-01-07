import React from 'react'

import { Box, Input, Text } from '@chakra-ui/react'

interface Props {
    label: string,
    value: string,
    onChange: (value: string) => void,
    placeholder: string,
}

const LabeledInput: React.FC<Props> = ({ label, value, onChange, placeholder }) => {
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
        <Input 
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            focusBorderColor="brand.500"
        />
    </Box>
  )
}

export default LabeledInput