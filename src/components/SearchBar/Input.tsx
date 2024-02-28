import { useState } from 'react';
import styled from 'styled-components'
import Wrapper from '../Wrapper/Wrapper';

interface IInputProps {
    $onChange: Function;
}

function Input({$onChange}: IInputProps) {

    const [inputText, setInputText] = useState('');

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value);
        $onChange(e.currentTarget.value);
    }

    return (
        <Inp
            type='text'
            placeholder='Название'
            maxLength={30}
            value={inputText}
            onChange={e => onChangeInput(e)} />
    );
}

const Inp = styled.input`
    ${Wrapper}
    
    max-width: 13rem;
    font-size: 1em;
    height: 2.5em;
    padding: 10px;

    @media (max-width: 426px) {
        max-width: 10rem;
    }
    @media (max-width: 376px) {
        min-width: 100%;
    }
`

export default Input;