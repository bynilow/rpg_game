import { useState } from 'react';
import styled from 'styled-components'

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
    font-size: 16px;
    line-height: 0;
    height: 2.5em;
    width: 2.5em;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
`

export default ReverseButton;