import { ReactNode } from 'react';
import styled from 'styled-components'

interface ITitleProps {
    children?: ReactNode;
    $size?: string;
}

function Title({children, $size='1em'}: ITitleProps) {

    return (  
        <TitleComponent
            $size={$size}>
                {
                    children
                }
        </TitleComponent>
    );
}

interface ITitleComponentProps {
    $size: string;

}

const TitleComponent = styled.p<ITitleComponentProps>`
    font-size: ${p => p.$size};
`

export default Title;