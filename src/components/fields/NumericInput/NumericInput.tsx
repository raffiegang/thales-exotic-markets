import FieldValidationMessage from 'components/FieldValidationMessage';
import { DEFAULT_TOKEN_DECIMALS } from 'constants/defaults';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { CurrencyLabel, FieldContainer, FieldLabel, FieldNote, Input } from '../common';

type NumericInputProps = {
    value: string | number;
    label?: string;
    note?: string;
    placeholder?: string;
    disabled?: boolean;
    step?: string;
    max?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
    showValidation?: boolean;
    validationMessage?: string;
    currencyLabel?: string;
};

const INVALID_CHARS = ['-', '+', 'e'];

const NumericInput: React.FC<NumericInputProps> = ({
    value,
    label,
    note,
    placeholder,
    disabled,
    step,
    max,
    onChange,
    showValidation,
    validationMessage,
    currencyLabel,
    ...rest
}) => {
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        let trimmedValue = value;
        if (value.indexOf('.') > -1) {
            const numberOfDecimals = value.split('.')[1].length;
            if (numberOfDecimals > DEFAULT_TOKEN_DECIMALS) {
                trimmedValue = value.substring(0, value.length - 1);
            }
        }

        onChange(e, trimmedValue.replace(/,/g, '.').replace(/[e+-]/gi, ''));
    };

    return (
        <FieldContainer>
            {label && <FieldLabel>{label}:</FieldLabel>}
            <StyledInput
                {...rest}
                value={value}
                type="number"
                onChange={handleOnChange}
                placeholder={placeholder}
                disabled={disabled}
                className={showValidation ? 'error' : ''}
                onKeyDown={(e) => {
                    if (INVALID_CHARS.includes(e.key)) {
                        e.preventDefault();
                    }
                }}
                min="0"
                max={max || 'any'}
                step={step || 'any'}
            />
            {currencyLabel && <CurrencyLabel className={disabled ? 'disabled' : ''}>{currencyLabel}</CurrencyLabel>}
            <FieldValidationMessage showValidation={showValidation} message={validationMessage} />
            {note && <FieldNote>{note}</FieldNote>}
        </FieldContainer>
    );
};

const StyledInput = styled(Input)`
    padding-right: 100px;
`;

export default NumericInput;
