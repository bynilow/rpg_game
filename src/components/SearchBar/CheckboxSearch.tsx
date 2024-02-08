import { useState } from 'react';
import styled from 'styled-components'

interface ICheckboxProps {
    $setChecked: Function;
}

function CheckboxSearch({$setChecked}: ICheckboxProps) {

    const [isChecked, setIsChecked] = useState(false);

    const onChangeChecked = () => {
        setIsChecked(!isChecked);
        $setChecked();
    }

    return (
        <CheckBoxBlock onClick={() => onChangeChecked()} >
            <Checkbox $isChecked={isChecked}>
                {
                    isChecked && '🗸'
                }
            </Checkbox>
            Готовы к крафту
        </CheckBoxBlock>
    );
}

interface ICheckbox {
    $isChecked: boolean;
}

const Checkbox = styled.div<ICheckbox>`
    width: 1.5em;
    height: 1.5em;
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
    border-radius: 5px;

    ${
        p => p.$isChecked
        ? `
        border: 2px solid #455a48;
        color: #455a48; `
        : 
        `border: 1px solid black;
        color: black; `
    }
    
`

const CheckBoxBlock = styled.div`
    font-size: 16px;
    height: 2.5em;
    min-width: 13em;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 10px;
    cursor: pointer;
    user-select: none;

    @media (max-width: 426px) {
        min-width: 10rem;
    }
    @media (max-width: 376px) {
        min-width: 100%;
    }
`

export default CheckboxSearch;