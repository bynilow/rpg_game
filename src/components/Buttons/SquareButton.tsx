import { FC } from 'react';
import styled from 'styled-components'

interface ISquareButtonProps {
    children: React.ReactNode;
    $fontSize?: string;
    $isSquare?: boolean;
    $onClick: Function;
}

const SquareButton: FC<ISquareButtonProps> = ({children, $fontSize, $isSquare = true, $onClick}) => {

    return (  
        <Button
            $fontSize={$fontSize}
            $isSquare={$isSquare}
            onClick={() => $onClick()}>
            {children}
        </Button>
    );
}

interface IButtonProps {
    $fontSize?: string;
    $isSquare?: boolean;
}

const Button = styled.button<IButtonProps>`
    font-weight: bold;
    font-size: ${p => p.$fontSize || '1.5rem'};
    aspect-ratio: ${p => p.$isSquare ? '1/1' : 'inherit'};
    line-height: ${p => p.$isSquare ? '0' : 'normal'};
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s;
    cursor: pointer;
    user-select: none;

    &:hover{
        transform: scale(0.9);
    }
`

export default SquareButton;