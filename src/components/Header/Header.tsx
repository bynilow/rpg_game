import styled from 'styled-components'
import Container from '../Container/Container';
import { useAppSelector } from '../../hooks/redux';
import Avatar from '../Avatar/Avatar';

interface IHeader{
    openInventory: Function;
}

function Header({openInventory}: IHeader) {

    const {coins, player} = useAppSelector(state => state.userReducer);

    const needXP = (2.25)**(player.level - 1) + 10;
    console.log(needXP)

    return ( 
        <Block>
            <Container>
                <ContainerInner>
                <GameName>
                    GAME
                </GameName>
                    <ButtonsBlock>
                        <LineBlock>
                            <LineText>
                                УР: {player.level}
                            </LineText>
                            <LevelLine max={needXP} value={player.currentXP} />
                            <LineText>
                                {
                                    needXP >= 1_000
                                        ? needXP.toString().length >= 1_000_000
                                            ? `${(needXP/1000000).toFixed(1)}m / ${(player.currentXP/1000000).toFixed(1)}m`
                                            : `${(needXP/1000).toFixed(1)}k / ${(player.currentXP/1000).toFixed(1)}k`
                                        : `${needXP.toFixed(1)} / ${player.currentXP.toFixed(1)}`
                                }
                            </LineText>
                        </LineBlock>
                        <LineBlock>
                            <EnergyLine max={100} value={35} />
                            <LineText>
                                {
                                    player.maxHealth.toString().length >= 4
                                        ? `${(7255/1000).toFixed(1)}k / ${(1566/1000).toFixed(1)}k`
                                        : `${122} / ${45}`
                                }
                            </LineText>
                        </LineBlock>
                        <LineBlock>
                            <HealthLine max={player.maxHealth} value={player.health} />
                            <LineText>
                                {
                                    player.maxHealth.toString().length >= 4
                                        ? `${(player.maxHealth/1000).toFixed(1)}k / ${(player.health/1000).toFixed(1)}k`
                                        : `${player.maxHealth} / ${player.health.toFixed(0)}`
                                }
                            </LineText>
                        </LineBlock>
                        <Coins>
                        <CoinsText>
                            {coins}
                        </CoinsText>
                        <Avatar $image={'icons/items/other/coin.png'} width={'35px'} height={'35px'} />
                    </Coins>
                    <Button onClick={() => openInventory()}>
                        Инвентарь
                    </Button>
                    <Button>
                        Крафт
                    </Button>
                    <Button>
                        Персонаж
                    </Button>
                </ButtonsBlock>
                </ContainerInner>
            </Container>
        </Block>
     );
}

const LevelLine = styled.progress`
    width: 50px;
    height: 50%;
    border-radius: 5px;
    -webkit-appearance: none;
    appearance: none;

   transition: 0.1s;

   &::-webkit-progress-value {
    background-color: #FF9933;

    border-radius: 5px;
    transition: 0.2s;
   }
   &::-webkit-progress-bar {
    background-color: #c2762a;

    border-radius: 5px;
   }
`

const EnergyLine = styled.progress`
    width: 50px;
    height: 50%;
    border-radius: 5px;
    -webkit-appearance: none;
    appearance: none;

   transition: 0.1s;

   &::-webkit-progress-value {
    background-color: #FF9933;

    border-radius: 5px;
    transition: 0.2s;
   }
   &::-webkit-progress-bar {
    background-color: #c2762a;

    border-radius: 5px;
   }
`

const LineBlock = styled.div`
    height: 100%;
    padding: 0 10px;
    transition: .1s;
    background-color: #ffffff;
    box-shadow: 0 0 5px black;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    justify-content: right;
    align-items: center;
`

const LineText = styled.p`

`

const HealthLine = styled.progress`
    width: 100px;
    height: 50%;
    border-radius: 5px;
    -webkit-appearance: none;
    appearance: none;

   transition: 0.1s;

   &::-webkit-progress-value {
    background-color: #ce4646;

    border-radius: 5px;
    transition: 0.2s;
   }
   &::-webkit-progress-bar {
    background-color: #8a3939;

    border-radius: 5px;
   }
`

const CoinsText = styled.p`
    
`

const Coins = styled.div`
    min-width: 60px;
    height: 100%;
    padding: 0 10px;
    transition: .1s;
    background-color: #ffffff;
    box-shadow: 0 0 5px black;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    justify-content: right;
    align-items: center;
`

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