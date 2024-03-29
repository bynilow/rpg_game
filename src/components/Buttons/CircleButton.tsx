import styled from 'styled-components'

interface CircleButtonProps {
    symbol: string;
    click?: Function;
}

function CircleButton({symbol, click}:CircleButtonProps) {
    return ( 
        <Button onClick={click ? () => click() : () => null}>
            {
                symbol
            }
        </Button>
     );
}

const Button = styled.div`
  position: absolute;
  z-index: 9;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  font-size: 1.3rem;
  background: #e9e9e9;
  border-radius: 50%;
  color: black;
  padding: 10px;
  margin: 10px;
  line-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.1s;
  cursor: pointer;
  user-select: none;
  
  &:hover{
    transform: scale(0.95);
    background: #c9c9c9;
  }
`

export default CircleButton;