import React from 'react';
import styled from 'styled-components'

interface IContainer{
    children?: React.ReactNode;
}

function Container({children}: IContainer) {
    return ( 
        <Block>
            {
                children
            }
        </Block>
     );
}

const Block = styled.div`
  width: 90%;
  height: 100%;
  transition: 1s;
`

export default Container;