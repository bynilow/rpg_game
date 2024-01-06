import styled from 'styled-components'
import { scrollBarX } from '../../styles/scrollbars';

interface ISection {
    children: React.ReactNode;
    $isBlocked?: boolean;
    $isBoxShadow?: boolean;
    $isBackgroundTransparent?: boolean;
}

function Section({
    children, 
    $isBlocked, 
    $isBoxShadow, 
    $isBackgroundTransparent = true}: ISection) {

    return ( 
        <Block 
            $isBlocked={$isBlocked}
            $isBoxShadow={$isBoxShadow}
            $isBackgroundTransparent={$isBackgroundTransparent}>
            {
                children
            }
        </Block>
     );
}

interface IBlockProps {
    $update?: number;
    $isBlocked?: boolean;
    $isBoxShadow?: boolean;
    $isBackgroundTransparent?: boolean;
}

const Block = styled.div<IBlockProps>`
    max-height: fit-content;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    gap: 20px;
    border-radius: 5px;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    background-color: ${
        p => p.$isBackgroundTransparent
            ? ''
            : 'white'
    };
    transition: max-height 3s ease-in-out;

    ${
        p => p.$isBoxShadow
        ? 'box-shadow: 0 0 5px black;'
        : null
    }
  
    ${p => p.$isBlocked
        ? `&::before{
            position: absolute;
            z-index: 99;
            border-radius: 5px;
            top: 0;
            bottom: 0;
            left: 0;
            content: '';
            width: 100%;
            background: #00000071;
        };`
        : null
    }

    ${
        scrollBarX
    }  
`

            // height: ${100 + p.$update * 100}px;


export default Section;