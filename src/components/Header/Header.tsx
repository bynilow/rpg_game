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
    border-radius: 10px;
    box-sizing: border-box;
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
    box-sizing: border-box;
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;

    box-sizing: border-box;
    
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Header;