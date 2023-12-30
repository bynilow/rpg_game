import styled from 'styled-components'

function ModalBackground() {
    return ( 
        <Background> </Background>
     );
}

const Background = styled.div`
    position: absolute;
    z-index: 99;
    
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;

    background-color: #0000006f;
    backdrop-filter: blur(5px);
`

export default ModalBackground;