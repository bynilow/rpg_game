import { FC, useState } from 'react';
import styled from 'styled-components'

interface IRangeProps {
    $min: number;
    $max: number;
    $step?: number;
    $onChange: Function;
}

const Range: FC<IRangeProps> = ({$min, $max, $step = 1, $onChange}) => {

    const [value, setValue] = useState($min);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
        $onChange(Number(e.target.value));
    };

    return (  
        <Input 
            type='range' 
            min={$min} 
            max={$max} 
            step={$step}
            value={value}
            onChange={e => onChange(e)} />
    );
}

const Input = styled.input`
    width: 100%;
    accent-color: orange;
    -webkit-appearance: none;
    position: relative;
    cursor: pointer;

    &::-webkit-slider-thumb{
        position: relative;
        -webkit-appearance: none;
        border-radius: 50%;
        background-color: blue;
        top: -50%;
        height: 30px;
        width: 30px;
        transition: 0.1s;

        &:hover{
            background-color: #5757f9;
            transform: scale(1.2);
        }
    }

    &::-webkit-slider-runnable-track{
        background-color: #c1c1c1;
        height: 15px;
        border-radius: 10px;
    }
`

export default Range;