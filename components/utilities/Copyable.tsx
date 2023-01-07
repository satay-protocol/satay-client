import React, { useEffect } from 'react'

import { Box, Text, useClipboard, useColorModeValue, useToast } from '@chakra-ui/react';

interface Props {
    display: string;
    copyText: string;
}

const Copyable: React.FC<Props> = ({ display, copyText }) => {

  const { onCopy, setValue } = useClipboard(copyText)

  useEffect(() => {
    setValue(copyText)
  }, [copyText, setValue])

  const toast = useToast()

  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
  const bgHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100');

  const copy = () => {
    onCopy()
    toast({
      title: "Copied",
      status: "success",
      duration: 2000,
    })
  }

  return (
    <Box
        onClick={copy}
        cursor="pointer"
        bg={bgColor}
        px={2}
        py={1}
        borderRadius="lg"
        _hover={{
            bg: bgHoverColor
        }}
        transition="background-color 0.2s"
    >
        <Text>
            {display}
        </Text>
    </Box>
  )
}

export default Copyable