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

import { Coin } from '../../../types/coin';

 interface Props {
    strategyModule: string,
    currentDebtRatio: number,
    baseCoin: Coin
 }

const DebtRatioSlider : React.FC<Props> = ({ baseCoin, strategyModule, currentDebtRatio }) => {

    const {
        debtRatio,
        updateDebtRatio,
        onDebtRatioChange
    } = useUpdateDebtRatio(
        baseCoin.coinStruct,
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
            aria-label={`${strategyModule}-${baseCoin.symbol}-debt-ratio-slider`}
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