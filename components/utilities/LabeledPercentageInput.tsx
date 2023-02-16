import React from 'react'

import LabeledNumberInput from './LabeledNumberInput';

const format = (value: string) => value ? parseInt(value) / 100 + '%' : undefined;
const parse = (value: string) => value ? value.replace('%', '') + '00' : undefined;

interface Props {
    label: string,
    value: string,
    onChange: (value: string) => void,
    placeholder: string,
    min?: number,
    max?: number,
}

const LabeledPercentageInput: React.FC<Props> = ({ label, value, onChange, placeholder, min, max }) => {
  return (
    <LabeledNumberInput 
        label={label}
        value={format(value)}
        onChange={(value) => onChange(parse(value))}
        placeholder={placeholder}
        min={min}
        max={max}
    />
  )
}

export default LabeledPercentageInput