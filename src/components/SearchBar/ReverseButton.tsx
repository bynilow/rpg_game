import { useState } from 'react';
import styled from 'styled-components'
import Wrapper from '../Wrapper/Wrapper';

interface IReverseButtonProps {
    $setReversed: Function;
}

function ReverseButton({$setReversed}: IReverseButtonProps) {

    const [isReversed, setIsReversed] = useState(false);

    const onChangeSelected = () => {
        setIsReversed(!isReversed);
        $setReversed();
    }

    return (
        <Button onClick={() => onChangeSelected()}>
            {
                isReversed
                    ? 'ᐯ'
                    : 'ᐱ'
            }
        </Button>
    );
}

const Button = styled.div`
    ${Wrapper}
    
    font-size: 16px;
    line-height: 0;
    height: 2.5em;
    width: 2.5em;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
`

export default ReverseButton;