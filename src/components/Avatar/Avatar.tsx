import styled from 'styled-components'

interface IAvatar{
    $image: string;
    width: string;
    height: string;
    $isMovingOther?: boolean;
    $isMiningOther?: boolean;
    $onClicked?: Function;
}

function Avatar({
    $image, 
    width = '90px', 
    height = '90px', 
    $isMovingOther, 
    $isMiningOther, 
    $onClicked = () => null} : IAvatar) {
    
    console.log($image)
    
    return ( 
        <Block 
            $image={$image}
            width={width}
            height={height}
            $isMovingOther={$isMovingOther}
            $isMiningOther={$isMiningOther}>
            {
                $isMovingOther || $isMiningOther
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
    box-sizing: border-box;

    &:hover{
        transform: scale(1.5);
        background-color: #00000084;
    }
`

const Block = styled.div<IAvatar>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: ${p => p.width};
    height: ${p => p.height};

    background-image: url(${p => require(p.$image)});
    background-size: cover;
    border-radius: 50%;

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