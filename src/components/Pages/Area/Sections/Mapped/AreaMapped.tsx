import { FC } from 'react';
import styled from 'styled-components'

interface IAreaMappedProps {
    children: React.ReactNode | React.ReactNode[];
    $isBlocked: boolean;
    $backgroundColor: string;
    $hoveredColor: string;
}

const AreaMapped: FC<IAreaMappedProps> = ({children, $isBlocked, $backgroundColor, $hoveredColor}) => {

    return (  
        <AreaThing 
            $backgroundColor={$backgroundColor}
            $hoveredColor={$hoveredColor}
            $isBlocked={$isBlocked}>
            {children}
        </AreaThing>
    );
}

interface IAreaBlockProps {
    $backgroundColor: string;
    $hoveredColor: string;
    $isBlocked: boolean;
}

export const AreaThing = styled.div<IAreaBlockProps>`
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.56);
    background: ${p => p.$backgroundColor};
    padding: 5px;
    border-radius: 10px 10px 5px 5px;
    width: 100%;
    height: 4.5rem;
    min-height: 4.5rem;
    display: flex;
    gap: 1.3rem;
    align-items: center;
    position: relative;

    transition: 0.1s;

    cursor: ${p => p.$isBlocked ? 'default' : 'pointer'};


    &::after{
        position: absolute;
        content: '';
        z-index: 999;
        border-radius: 10px 10px 0 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${p => p.$isBlocked ? '#00000081' : 'rgba(0,0,0,0)'};
        pointer-events: ${p => p.$isBlocked ? 'all' : 'none'};
        transition: 0.2s;
    };

    &:hover{
        ${p => p.$isBlocked
            ? null 
            : `background-color: ${p.$hoveredColor};
                transform: perspective(900px) translateY(-5px) rotateX(5deg) scale(1.05);`
        }
        
    }
`

export default AreaMapped;