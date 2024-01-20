import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components'

interface IAreaBackgroundProps {
    $image: string;
}

function AreaBackground({$image}:IAreaBackgroundProps) {

    const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
    
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setIsBackgroundLoaded(true);
        };
        img.src = require('../../../' + $image);
    },[$image])

    return (
        <Background
            $isLoaded={isBackgroundLoaded}
            $image={require('../../../' + $image)}>
        </Background>
    );
}


interface IBackgroundProps {
    $image: string;
    $isLoaded: boolean;
  }

const SkeletonAnim = keyframes`
    0%{
        background-color: #90ca95;
    }
    50%{
        background-color: #5f7761;
    }
    100%{
        background-color: #90ca95;
    }
`

const Background = styled.div<IBackgroundProps>`
    z-index: -1;
    position: fixed;
    top: -80%;
    left: -15%;
    width: 130vw;
    height: 250vh;
    transition: 1s ease;
    background-image: ${p => `url( ${p.$image} )`};
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(5px);

    ${
        p => !p.$isLoaded
            && css`&::after{
                content: '';
                z-index: 9;
                position: absolute;
                width: 130vw;
                height: 250vh;
                top: 0;
                left: 0;
                background: gray;
                border-radius: 50%;
                transform: scale(0.9);
                animation: ${SkeletonAnim} 8s linear infinite;
            };`
    }
  
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(255,255,255);
      background: linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(0,0,0,1) 80%);
    }
`

export default AreaBackground;