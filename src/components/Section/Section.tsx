import styled from 'styled-components'
import { scrollBarX } from '../../styles/scrollbars';
import { palette } from '../../styles/palette';

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
    width: 100%;
    min-width: 300px;
    max-height: 100%;
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
            : palette.backgroundColor
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