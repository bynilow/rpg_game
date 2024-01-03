import styled from 'styled-components'

interface IAvatar{
    $image: string;
    width: string;
    height: string;
    $isDoSomething?: boolean;
    $isMovingOther?: boolean;
    $isMiningOther?: boolean;
    $onClicked?: Function;
    $isCircle?: boolean;
}

function Avatar({
    $image, 
    width = '90px', 
    height = '90px', 
    $isDoSomething,
    $isMovingOther, 
    $isMiningOther, 
    $onClicked = () => null,
    $isCircle} : IAvatar) {

    return ( 
        <Block 
            $image={$image}
            width={width}
            height={height}
            $isMovingOther={$isMovingOther}
            $isMiningOther={$isMiningOther}
            $isCircle={$isCircle}>
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
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    padding: 30px;
    width: 50%;
    height: 50%;
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

///${ p => `url( ${require(p.$image)} )` }

const Block = styled.div<IAvatar>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    min-width: ${p => p.width};
    min-height: ${p => p.height};
    max-width: ${p => p.width};
    max-height: ${p => p.height};

    background-image: ${ p => `url( ${ require('../../'+p.$image) } )` };
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