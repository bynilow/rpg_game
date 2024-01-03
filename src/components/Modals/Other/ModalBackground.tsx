import styled, { keyframes } from 'styled-components'

interface IModalBackground{
    $enableStartAnim?: boolean
}

function ModalBackground({$enableStartAnim = false}: IModalBackground) {
    return ( 
        <Background $startAnim={$enableStartAnim}> </Background>
     );
}

const StartAnim = keyframes`
    0%{
        background-color: rgba(0,0,0,0);
        backdrop-filter: blur(5px);
    }
    100%{
        background-color: #000000a6;
        backdrop-filter: blur(5px);
    }
`

interface IBackgroundProps {
    $startAnim: boolean
}

const Background = styled.div<IBackgroundProps>`
    position: absolute;
    z-index: 99;
    
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;

    background-color: #0000006f;
    backdrop-filter: blur(5px);

    animation: ${ p => p.$startAnim ? StartAnim : null} 3s ease;
    animation-fill-mode: forwards;

    


`

export default ModalBackground;