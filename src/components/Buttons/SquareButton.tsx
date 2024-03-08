import { FC } from 'react';
import styled, { keyframes } from 'styled-components'
import Wrapper from '../Wrapper/Wrapper';
import { palette } from '../../styles/palette';

interface ISquareButtonProps {
    children: React.ReactNode;
    $fontSize?: string;
    $width?: string;
    $isSquare?: boolean;
    $color?: string;
    $onClick: Function;
    $isDisabled?: boolean;
}

const SquareButton: FC<ISquareButtonProps> = ({
    $width = 'auto',
    children,
    $fontSize,
    $isSquare = true,
    $color = 'black',
    $onClick,
    $isDisabled }) => {

    return (
        <Button
            disabled={$isDisabled}
            $fontSize={$fontSize}
            $isSquare={$isSquare}
            $width={$width}
            $color={$color}
            onClick={(e) => {
                e.stopPropagation();
                $onClick();
            }}>
            {
                children
            }
        </Button>
    );
}

const AnimLoader = keyframes`
    from{
        transform: scale(1);
    }
    to{
        transform: scale(1.2);
    }
`


interface IButtonProps {
    $fontSize?: string;
    $isSquare?: boolean;
    $width: string;
    $color: string;
}

const Button = styled.button<IButtonProps>`
    ${Wrapper}

    position: relative;
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

    &:disabled{
        transform: scale(0.95);
        background-color: ${palette.lightestGray};
        cursor: default;
        
    }
`

export default SquareButton;