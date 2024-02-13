import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components'

interface IAvatar{
    $image: string;
    width: string;
    height: string;
    $minWidth?: string;
    $minHeight?: string;
    $isDoSomething?: boolean;
    $isMovingOther?: boolean;
    $isMiningOther?: boolean;
    $onClicked?: Function;
    $isCircle?: boolean;
    children?: React.ReactNode;
}

function Avatar({
    $image, 
    width = '90px', 
    height = '90px',
    $minHeight,
    $minWidth, 
    $isDoSomething,
    $isMovingOther, 
    $isMiningOther, 
    $onClicked = () => null,
    $isCircle,
    children} : IAvatar) {

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setIsImageLoaded(true);
        };
        img.src = require('../../' + $image);
    },[$image])

    return ( 
        <Block 
            $image={$image}
            width={width}
            height={height}
            $minWidth={$minWidth}
            $minHeight={$minHeight}
            $isMovingOther={$isMovingOther}
            $isMiningOther={$isMiningOther}
            $isCircle={$isCircle}
            $isLoaded={isImageLoaded} >
            {children}
            {
                $isDoSomething
                    ? <StopAction onClick={() => $onClicked()}>
                        ✕
                    </StopAction>
                    : null
            }
        </Block>
     );
}

const StopAction = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    height: 70%;
    width: 70%;
    font-size: 3rem;
    z-index: 99;
    line-height: 0;
    color: white;
    background-color: #00000050;
    border-radius: 50%;
    transition: 0.1s;

    &:hover{
        transform: scale(1.5);
        background-color: #00000084;
    }
`

// /${ p => `url( ${require(p.$image)} )` }

const SkeletonAnim = keyframes`
    0%{
        background-color: #e2e2e2;
    }
    50%{
        background-color: #a3a3a3;
    }
    100%{
        background-color: #e2e2e2;
    }
`

interface IBlockProps {
    $isLoaded: boolean;
}

const Block = styled.div<IAvatar & IBlockProps>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: ${p => p.width};
    height: ${p => p.height};

    ${
        p => p.$minWidth ? `min-width: ${p.$minWidth};` : null
    }

    ${
        p => p.$minHeight ? `min-height: ${p.$minHeight};` : null
    }

    /* animation: ${p => !p.$isLoaded ? SkeletonAnim : ''} 5s linear infinite; */

    ${
        p => !p.$isLoaded
            && css`&::after{
                content: '';
                z-index: 9;
                position: absolute;
                width: ${p.width};
                height: ${p.height};
                top: 0;
                left: 0;
                background: gray;
                border-radius: 50%;
                transform: scale(0.9);
                animation: ${SkeletonAnim} 5s linear infinite;
            };`
    }


    background-image: ${p => p.$isLoaded && `url( ${require('../../' + p.$image)} )`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: ${p => p.$isCircle ? '50%' : '0'};

    ${p => p.$isMovingOther || p.$isMiningOther
        ? `width: 50px;
        height: 50px;`
        : null
    }

    transition: 0.3s;

    &:hover{
        transform: scale(1);
    }
`

export default Avatar;