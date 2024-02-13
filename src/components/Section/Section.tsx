import styled from 'styled-components'
import { scrollBarX } from '../../styles/scrollbars';

interface ISection {
    children: React.ReactNode;
    $isBlocked?: boolean;
    $isBoxShadow?: boolean;
    $isBackgroundTransparent?: boolean;
    $gap?: string;
    $haveScroll?: boolean;
}

function Section({
    children, 
    $isBlocked, 
    $isBoxShadow, 
    $isBackgroundTransparent = true,
    $gap = '1.3rem',
    $haveScroll = false}: ISection) {

    return ( 
        <Block 
            $isBlocked={$isBlocked}
            $isBoxShadow={$isBoxShadow}
            $isBackgroundTransparent={$isBackgroundTransparent}
            $gap={$gap}
            $haveScroll={$haveScroll}>
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
    $haveScroll: boolean;
}

const Block = styled.div<IBlockProps>`
    height: 100%;
    width: 100%;
    min-width: 300px;
    
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    gap: ${ p => p.$gap };
    border-radius: 15px;
    padding: 1rem;    
    position: relative;
    background-color: ${
        p => p.$isBackgroundTransparent
            ? ''
            : 'white'
    };

    ${
        p => p.$isBoxShadow
        ? 'box-shadow: 0 0 5px black;'
        : null
    }

    ${
        p => p.$haveScroll && 
            `
                overflow-x: hidden;
                overflow-y: auto;
                ${scrollBarX}
            `
    }
    
`

export default Section;