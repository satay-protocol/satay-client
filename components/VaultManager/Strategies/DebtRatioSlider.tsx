import React from 'react'

import { 
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Button,
    Text,
    Flex
 } from '@chakra-ui/react'

import useUpdateDebtRatio from '../../../hooks/vaultManager/useUpdateDebtRatio';

 interface Props {
    vaultId: string,
    strategyModule: string,
    currentDebtRatio: number,
 }

const DebtRatioSlider : React.FC<Props> = ({ vaultId, strategyModule, currentDebtRatio }) => {

    const {
        debtRatio,
        updateDebtRatio,
        onDebtRatioChange
    } = useUpdateDebtRatio(
        vaultId,
        strategyModule,
        currentDebtRatio
    );

  return (
    <Flex
        flex={1}
        alignItems="center"
        gap={4}
    >
        <Slider 
            aria-label={`${strategyModule}-${vaultId}-debt-ratio-slider`}
            value={debtRatio}
            onChange={onDebtRatioChange}
            colorScheme="brand"
        >
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
        <Text>
            {debtRatio}%
        </Text>
        <Button
            onClick={updateDebtRatio}
            colorScheme='brand'
            flexShrink={0}
            disabled={debtRatio === currentDebtRatio / 100}
        >
            Update
        </Button>
    </Flex>
    
  )
}

export default DebtRatioSlider