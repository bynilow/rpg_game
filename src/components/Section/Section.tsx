import styled from 'styled-components'
import { scrollBarX } from '../../styles/scrollbars';

interface ISection {
    children: React.ReactNode;
    $isBlocked?: boolean;
    $isBoxShadow?: boolean;
    $isBackgroundTransparent?: boolean;
    $gap?: string;
}

function Section({
    children, 
    $isBlocked, 
    $isBoxShadow, 
    $isBackgroundTransparent = true,
    $gap = '1.3em'}: ISection) {

    return ( 
        <Block 
            $isBlocked={$isBlocked}
            $isBoxShadow={$isBoxShadow}
            $isBackgroundTransparent={$isBackgroundTransparent}
            $gap={$gap}>
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
    $gap: string;
}

const Block = styled.div<IBlockProps>`
    min-height: 50%;
    height: fit-content;
    max-height: 100%;
    width: 100%;
    min-width: 300px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    gap: ${ p => p.$gap };
    border-radius: 5px;
    padding: 1rem;
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
            position: fixed;
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