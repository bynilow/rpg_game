import { FC } from 'react';
import styled, { keyframes } from 'styled-components'
import { palette } from '../../styles/palette';

interface ILoader {

}

const Loader: FC<ILoader> = ({}) => {

    return (  
        <Block>
            <LoaderBlock />
        </Block>
    );
}

const AnimLoader = keyframes`
    0%{
        transform: scale(1) rotate(0deg);
    }
    20%{
        transform: scale(1.3) rotate(15deg);
    }
    80%{
        transform: scale(1) rotate(-370deg);
    }
    100%{
        transform: scale(1) rotate(-360deg);
    }
`

const LoaderBlock = styled.div`
    width: 10%;
    aspect-ratio: 1/1;
    border-radius: 15px;
    background-color: ${palette.accentColor};
    border: 1px solid ${palette.lightestGray};
    animation: ${AnimLoader} 2.5s ease infinite;

`

const Block = styled.div`
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000055;
`

export default Loader;