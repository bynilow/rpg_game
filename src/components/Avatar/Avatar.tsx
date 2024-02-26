import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components'
import {LazyLoadImage} from 'react-lazy-load-image-component'

interface IAvatar{
    $image: string;
    width: string;
    height?: string;
    $isBlocked?: boolean;
    $isDoSomething?: boolean;
    $onClicked?: Function;
    $isCircle?: boolean;
    children?: React.ReactNode;
}

function Avatar({
    $image, 
    width = '90px', 
    height,
    $isBlocked,
    $isDoSomething,
    $onClicked = () => null,
    $isCircle,
    children} : IAvatar) {

    const [isImageLoaded, setIsImageLoaded] = useState(true);

    useEffect(() => {
        // setTimeout(() => {
        //     setIsImageLoaded(false);
        //     const img = new Image();
        //     img.onload = () => {
        //         setIsImageLoaded(true);
        //     };
        //     img.src = require('../../' + $image);
        // }, 300)
    },[])

    return ( 
        <AvatarContainer 
            $image={$image}
            width={width}
            height={height}
            $isBlocked={$isBlocked}
            $isCircle={$isCircle}>
            <Image src={require('../../'+$image)} alt='' />
            {children}
            {
                $isDoSomething
                    ? <StopAction onClick={() => $onClicked()}>
                        ✕
                    </StopAction>
                    : null
            }
        </AvatarContainer>
     );
}

const Image = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
`

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

const AvatarContainer = styled.div<IAvatar>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    ${
        p => p.height 
            ? `height: ${p.height};` 
            : `width: ${p.width};`   
    }

    aspect-ratio: 1/1;
    /* background-color: red; */
    border-radius: ${p => p.$isCircle ? '50%' : '0'};

    ${p => p.$isBlocked
        ? `height: 50px;`
        : null
    }

    transition: 0.3s;

    &:hover{
        transform: scale(1);
    }
`

export default Avatar;