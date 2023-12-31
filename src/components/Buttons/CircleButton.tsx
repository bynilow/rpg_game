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
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  font-size: 20px;
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
  box-sizing: border-box;

  &:hover{
    transform: scale(0.95);
    background: #c9c9c9;
  }
`

export default CircleButton;