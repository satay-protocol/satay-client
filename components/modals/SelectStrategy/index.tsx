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

interface Props {
    isOpen: boolean;
    onClose: () => void;
    baseCoin: string;
    vault: Vault
    approvedStrategies: string[]
}

const SelectStrategy : React.FC<Props> = ({ isOpen, onClose, baseCoin, vault, approvedStrategies }) => {

  const availableStrategies = strategies
    .filter(strategy => strategy.baseCoin === baseCoin && !approvedStrategies.includes(strategy.strategyModule))

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
                      key={strategy.strategyModule}
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