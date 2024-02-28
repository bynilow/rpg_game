import { FC } from 'react';
import styled from 'styled-components'
import Wrapper from '../Wrapper/Wrapper';

interface ISquareButtonProps {
    children: React.ReactNode;
    $fontSize?: string;
    $width?: string;
    $isSquare?: boolean;
    $color?: string;
    $onClick: Function;
}

const SquareButton: FC<ISquareButtonProps> = ({
    $width = 'auto', 
    children, 
    $fontSize, 
    $isSquare = true, 
    $color = 'black',
    $onClick}) => {

    return (  
        <Button
            $fontSize={$fontSize}
            $isSquare={$isSquare}
            $width={$width}
            $color={$color}
            onClick={() => $onClick()}>
            {children}
        </Button>
    );
}

interface IButtonProps {
    $fontSize?: string;
    $isSquare?: boolean;
    $width: string;
    $color: string;
}

const Button = styled.button<IButtonProps>`
    ${Wrapper}

    font-weight: bold;
    font-size: ${p => p.$fontSize || '1.5rem'};
    width: ${p => p.$width};
    height: ${p => p.$isSquare ? p.$width : 'auto'};
    aspect-ratio: ${p => p.$isSquare ? '1/1' : 'inherit'};
    line-height: ${p => p.$isSquare ? '0' : 'normal'};
    color: ${p => p.$color};
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