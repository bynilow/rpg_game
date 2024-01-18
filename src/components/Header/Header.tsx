import styled from 'styled-components'
import Container from '../Container/Container';
import { useAppSelector } from '../../hooks/redux';
import Avatar from '../Avatar/Avatar';
import { useEffect } from 'react';
import { getRandomNumber } from '../../functions/Random';

interface IHeader{
    $openInventory: Function;
    $openSkills: Function;
    $openCraft: Function;
    $openCharacter: Function;
}

function Header({$openInventory, $openSkills, $openCraft, $openCharacter}: IHeader) {

    const {player, playerSkills} = useAppSelector(state => state.userReducer);

    const needXP = (player.level ** 2.7) + 10;

    useEffect(() => {

    }, [player.currentXP])

    return ( 
        <Block>
            <Container>
                <ContainerInner>
                    <GameLogo>
                        {/* <Logo $rotate={getRandomNumber(-5,5)} /> */}
                        <LogoText>
                            GRINDFEST
                        </LogoText>
                    </GameLogo>
                    <ButtonsBlock>
                        <LineBlock onClick={() => $openSkills()}>
                            {
                                player.skillPoints
                                    ? <PointsText>
                                        +{player.skillPoints}
                                    </PointsText>
                                    : null
                            }
                            <LineText>
                                УР: {player.level}
                            </LineText>
                            <LevelLine max={needXP} value={player.currentXP} />
                            <LineText>
                                {
                                    needXP >= 1_000
                                        ? needXP.toString().length >= 1_000_000
                                            ? `${(needXP / 1000000).toFixed(1)}m / ${(player.currentXP / 1000000).toFixed(1)}m`
                                            : `${(needXP / 1000).toFixed(1)}k / ${(player.currentXP / 1000).toFixed(1)}k`
                                        : `${needXP.toFixed(1)} / ${player.currentXP.toFixed(1)}`
                                }
                            </LineText>
                        </LineBlock>
                        {/* <LineBlock>
                            <EnergyLine max={100} value={35} />
                            <LineText>
                                {
                                    player.maxHealth.toString().length >= 4
                                        ? `${(7255/1000).toFixed(1)}k / ${(1566/1000).toFixed(1)}k`
                                        : `${122} / ${45}`
                                }
                            </LineText>
                        </LineBlock> */}
                        <LineBlock>
                            <HealthLine max={playerSkills.baseHealth.baseCount} value={player.health} />
                            <LineText>
                                {
                                    playerSkills.baseHealth.baseCount.toString().length >= 4
                                        ? `${(playerSkills.baseHealth.baseCount / 1000).toFixed(1)}k / ${(player.health / 1000).toFixed(1)}k`
                                        : `${playerSkills.baseHealth.baseCount} / ${player.health.toFixed(0)}`
                                }
                            </LineText>
                        </LineBlock>
                        <Coins>
                            <CoinsText>
                                {player.coins}
                            </CoinsText>
                            <Avatar $image={'icons/items/other/coin.png'} width={'35px'} height={'35px'} />
                        </Coins>
                        <Button onClick={() => $openInventory()}>
                            Инвентарь
                        </Button>
                        <Button onClick={() => $openCraft()}>
                            Крафт
                        </Button>
                        <Button onClick={() => $openCharacter()}>
                            Персонаж
                        </Button>
                    </ButtonsBlock>
                </ContainerInner>
            </Container>
        </Block>
     );
}

interface ILogoProps {
    $rotate: number;
}

const Logo = styled.div<ILogoProps>`
    background-image: ${ `url( ${ require('../../icons/logos/logo.png') } )` };
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    width: 150px;
    height: 100%;
    cursor: pointer;

    transition: 0.3s;

    &:hover{
        transform: scale(1.7) rotate(${p => p.$rotate}deg);
    }
`

const LogoText = styled.p`

    background: #B94AF7;
    background: linear-gradient(to right, #B94AF7 0%, #FC5E5D 51%, #FABB01 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #000000;
    line-height: 0.8;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;

    transition: 0.3s;

    &:hover{
        transform: scale(1.4) rotate(-5deg);

    }
`

const GameLogo = styled.p`
    user-select: none;
    display: flex;
    gap: 10px;
    height: 100%;
    align-items: center;

`

const PointsText = styled.p`
    position: absolute;
    z-index: 9;
    bottom: -50%;
    left:-10%;
    padding: 5px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 5px black;

`

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
    position: relative;
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
    cursor: pointer;

    &:hover{
        transform: scale(0.95);
    }
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

const Block = styled.div`
    top: 0;
    left: 0;
    padding: 10px 0;
    margin-bottom: 20px;
    width: 100vw;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

`

export default Header;