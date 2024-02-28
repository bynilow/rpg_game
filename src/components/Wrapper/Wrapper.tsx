import { css } from 'styled-components';

interface IWrapperProps{
    $color?: string;
    $borderRadius?: string;
}

const Wrapper = css<IWrapperProps>`
    background-color: white;
    border: 2px solid ${p => p.$color || 'black'};
    border-radius: ${p => p.$borderRadius || '10px'};
`

export default Wrapper;