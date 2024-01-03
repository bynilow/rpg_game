import styled from 'styled-components'
import Container from '../Container/Container';

interface IHeader{
    openInventory: Function;
}

function Header({openInventory}: IHeader) {
    return ( 
        <Block>
            <Container>
                <ContainerInner>
                <GameName>
                    GAME
                </GameName>
                <ButtonsBlock>
                    <Button onClick={() => openInventory()}>
                        Инвентарь
                    </Button>
                    <Button>
                        Помощь
                    </Button>
                </ButtonsBlock>
                </ContainerInner>
            </Container>
        </Block>
     );
}

const Button = styled.div`
    user-select: none;
    cursor: pointer;
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .1s;
    background-color: #ffffff;
    box-shadow: 0 0 5px black;
    border-radius: 10px;
    &:hover{
        transform: scale(0.95);
        background-color: #cecece;
    }
`

const ButtonsBlock = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    gap: 10px;
    padding: 5px;
`

const ContainerInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

`

const GameName = styled.p`
    margin: 0;
    font-size: 20px;
    font-weight: bold;

`

const Block = styled.div`
    top: 0;
    left: 0;
    margin-bottom: 20px;
    width: 100vw;
    min-height: 50px;
    
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Header;