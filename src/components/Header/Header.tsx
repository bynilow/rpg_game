import styled, { keyframes } from 'styled-components'
import Container from '../Container/Container';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Avatar from '../Avatar/Avatar';
import { useEffect, useState } from 'react';
import { getRandomNumber } from '../../functions/Random';
import { getStats } from '../../functions/Stats';
import { logoutUserAC, setHealthPoints } from '../../store/reducers/ActionCreators';
import SquareButton from '../Buttons/SquareButton';
import Wrapper from '../Wrapper/Wrapper';
import Title from '../Title/Title';
import { Avatars, Models } from 'appwrite';
import { palette } from '../../styles/palette';
import { account, client } from '../../appwrite/config';
import Dropdown from '../SearchBar/Dropdown';

interface IHeader {
    $openInventory: Function;
    $openSkills: Function;
    $openCraft: Function;
    $openCharacter: Function;
}

function Header({ $openInventory, $openSkills, $openCraft, $openCharacter }: IHeader) {

    const { player, playerSkills, buffs, userData } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const needXP = (player.level ** 2.7) + 10;

    useEffect(() => {
        const addHealth = setInterval(() => {
            const stats = getStats(playerSkills, player, buffs);
            if (player.health < stats.health) {
                dispatch(setHealthPoints(player.health + stats.healthRegenerationScore));
            }
            else {
                var highestTimeoutId = setTimeout(";");
                for (var i = 0; i < highestTimeoutId; i++) {
                    clearTimeout(i);
                };
                clearInterval(addHealth);
            }
        }, 1000);

        return () => {
            clearInterval(addHealth);
        }
    }, [player, playerSkills])

    const [avatar, setAvatar] = useState(new Avatars(client));

    return (
        <Block>
            <Container>
                <HeaderInner>
                    <UserInfo>
                        <UserAvatar src={avatar.getBrowser('aa').href} />
                        <UserName onClick={() => dispatch(logoutUserAC())}>
                            {userData.name}username
                        </UserName>
                    </UserInfo>
                    <ButtonsBlock>
                        <LineBlock>
                            <HealthLine max={getStats(playerSkills, player, buffs).health} value={player.health} />
                            <LineText>
                                {
                                    playerSkills.health.baseCount.toString().length >= 4
                                        ? `${(player.health / 1000).toFixed(1)}k / ${(getStats(playerSkills, player, buffs).health / 1000).toFixed(1)}k`
                                        : `${player.health.toFixed(0)} / ${getStats(playerSkills, player, buffs).health}`
                                }
                            </LineText>
                        </LineBlock>

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
                                            ? `${(player.currentXP / 1000000).toFixed(1)}m / ${(needXP / 1000000).toFixed(1)}m`
                                            : `${(player.currentXP / 1000).toFixed(1)}k / ${(needXP / 1000).toFixed(1)}k`
                                        : `${player.currentXP.toFixed(1)} / ${needXP.toFixed(1)}`
                                }
                            </LineText>
                        </LineBlock>

                        <Coins>
                            <CoinsText>
                                {player.coins}
                            </CoinsText>
                            <Avatar
                                $image={'icons/items/other/coin.png'}
                                width={'35px'} />
                        </Coins>

                        <SquareButton
                            $isSquare={false}
                            $fontSize='1rem'
                            $onClick={() => $openInventory()}>
                            Инвентарь
                        </SquareButton>

                        <SquareButton
                            $isSquare={false}
                            $fontSize='1rem'
                            $onClick={() => $openCraft()}>
                            Крафт
                        </SquareButton>

                        <SquareButton
                            $isSquare={false}
                            $fontSize='1rem'
                            $onClick={() => $openCharacter()}>
                            Персонаж
                        </SquareButton>
                    </ButtonsBlock>

                </HeaderInner>
            </Container>
        </Block>
    );
}

const UserInfo = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;

    height: 50%;
`

const UserAvatar = styled.img`
    width: 3rem;
    aspect-ratio: 1/1;
    object-fit: contain;
    border-radius: 50%;
`

const UserName = styled.p`
    color: black;
    font-size: 1.5rem;
`

const PointsTextAnim = keyframes`
    0%{
        transform: rotate(0deg) scale(1);
    }
    8%{
        transform: rotate(20deg) scale(1.1);
    }
    30%{
        transform: rotate(-380deg) scale(1);
    }
    40%{
        transform: rotate(-360deg);
    }
    100%{
        transform: rotate(-360deg);
    }
`

const PointsText = styled.p`
    position: absolute;
    z-index: 9;
    bottom: -50%;
    left: -5%;
    padding: 5px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 5px black;

    animation: ${PointsTextAnim} 7s ease infinite;
`

const LevelLine = styled.progress`
    min-width: 4rem;
    width: 100%;
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

   &::-moz-progress-value {
    background-color: #FF9933;
    border-radius: 5px;
    transition: 0.2s;
   }
   &::-moz-progress-bar {
    background-color: #c2762a;
    border-radius: 5px;
   }
`


const LineBlock = styled.div`
    ${Wrapper}
    
    position: relative;
    max-width: 100%;
    height: 2.5rem;
    padding: 0 10px;
    transition: .1s;
    display: flex;
    gap: 10px;
    justify-content: right;
    align-items: center;
    cursor: pointer;
    flex-grow: 2;

    &:hover{
        transform: scale(0.95);
    }
`

const LineText = styled.p`
    font-size: 1rem;
    white-space: nowrap;
`

const HealthLine = styled.progress`
    min-width: 5rem;
    width: 100%;
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
   &::-moz-progress-value {
    background-color: #ce4646;
    border-radius: 5px;
    transition: 0.2s;
   }
   &::-moz-progress-bar {
    background-color: #8a3939;
    border-radius: 5px;
   }
`

const CoinsText = styled.p`
    
`

const Coins = styled.div`
    ${Wrapper}

    max-width: 7rem;
    height: 2.5rem;
    padding: 0 10px;
    transition: .1s;
    background-color: #ffffff;
    display: flex;
    gap: 10px;
    justify-content: right;
    align-items: center;
`

const HeaderInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ButtonsBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;
    width: 70%;
`

const Block = styled.header`
    width: 100%;
    height: 4rem;
    position: relative;
    display: flex;
    justify-content: center;
`

export default Header;