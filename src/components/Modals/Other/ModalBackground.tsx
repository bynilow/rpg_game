import styled, { keyframes } from 'styled-components'

interface IModalBackground{
    $isEnableAnims?: boolean
    $closeAnim?: boolean;
}

function ModalBackground({$isEnableAnims = true, $closeAnim = false}: IModalBackground) {
    return ( 
        <Background 
            key={$closeAnim ? 'close' : 'none'}
            $isEnableAnims={$isEnableAnims}
            $closeAnim={$closeAnim}>

        </Background>
     );
}

const StartAnim = keyframes`
    0%{
        background-color: rgba(0,0,0,0);
        backdrop-filter: blur(0px);
    }
    100%{
        background-color: #0000006f;
        backdrop-filter: blur(5px);
    }
`

interface IBackgroundProps {
    $isEnableAnims: boolean
    $closeAnim: boolean;
}

const Background = styled.div<IBackgroundProps>`
    position: fixed;
    z-index: 9999;
    
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;

    background-color: #0000006f;
    backdrop-filter: blur(5px);

    animation: ${ p => p.$isEnableAnims ? StartAnim : null} 0.5s ease;
    animation-direction: ${ p => p.$closeAnim ? 'reverse' : 'normal'};
`

export default ModalBackground;