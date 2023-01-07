import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text
} from '@chakra-ui/react'

import StrategyOption from './StrategyOption';

import { strategies } from '../../../data/strategies';

import { Vault } from '../../../types/vaults';
import { StructData } from '../../../types/aptos';
import { structToString } from '../../../services/aptosUtils';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    baseCoin: StructData;
    vault: Vault
    approvedStrategies: string[]
}

const SelectStrategy : React.FC<Props> = ({ isOpen, onClose, baseCoin, vault, approvedStrategies }) => {

  const availableStrategies = strategies
    .filter(strategy => 
      structToString(strategy.baseCoin.coinStruct) === structToString(baseCoin) 
      && !approvedStrategies.includes(structToString(strategy.strategyWitness))
    )

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Strategy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
                availableStrategies.length > 0 ? (
                  availableStrategies.map(strategy => (
                    <StrategyOption
                      key={structToString(strategy.strategyWitness)}
                      strategy={strategy}
                      vault={vault}
                    />
                  ))
                ) : (
                  <Text>No available strategies.</Text>
                )
            }
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
  )
}

export default SelectStrategy