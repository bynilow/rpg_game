import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Enemies } from '../../../data/Enemies';
import { getAttackData } from '../../../functions/Combat/GetAttackData';
import { getWinLoot } from '../../../functions/Combat/GetWinLoot';
import { getRandomNumber } from '../../../functions/Random';
import { getStats } from '../../../functions/Stats';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ICombatHistory } from '../../../models/ICombat';
import { IEnemy } from '../../../models/IEnemy';
import { addItemsToInventory, addXP, setDeadEnemy, setHealthPoints } from '../../../store/reducers/ActionCreators';
import EndCombatModal from '../../Modals/WinCombatModal/EndCombatModal';
import CharacterSection from './Sections/CharacterSection';
import EnemySection from './Sections/EnemySection';
import HistorySection from './Sections/HistorySection';

interface ICombatPage {
    $enemyId: string;
    $enemyIdInArea: string;
    $level: number;
    $finishBattle: (isWin: boolean) => void;
}

function CombatPage({ $enemyId, $finishBattle, $enemyIdInArea, $level }: ICombatPage) {

    const { currentLocation } = useAppSelector(state => state.areaReducer);
    const { player, playerSkills, buffs } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const foundedEnemy = Enemies.find(e => e.id === $enemyId)!;

    const [enemy, setEnemy] = useState<IEnemy>({
        ...foundedEnemy,
        baseCountXP: foundedEnemy.baseCountXP * $level,
        stats:{
            ...foundedEnemy.stats,
            damage: foundedEnemy.stats.damage * $level / 2,
            baseHealth: foundedEnemy.stats.baseHealth * $level / 2
        }
    });


    const [enemyHealth, setEnemyHealth] = useState(enemy.stats.baseHealth);

    const [playerStats, setPlayerStats] = useState(getStats(playerSkills, player, buffs));

    const [playerHealth, setPlayerHealth] = useState(player.health);
    const [playerCurrentTimeAttack, setPlayerCurrentTimeAttack] = useState(playerStats.attackSpeed < 0 ? 0.1 : playerStats.attackSpeed);

    const [isStartingAnimLost, setIsStartingAnimLost] = useState(false);
    const [combatHistory, setCombatHistory] = useState<ICombatHistory[]>([]);

    const [enemyTime, setEnemyTime] = useState<number>(enemy.stats.attackSpeed);



    const enemyAttack = () => {
        setEnemyTime(enemy.stats.attackSpeed);
        attackSomeone(true);
    }

    const enemySaySomething = () => {
        const text = enemy.actionText
            .communicationText[getRandomNumber(0, enemy.actionText.communicationText.length - 1)];

        const history: ICombatHistory = {
            isEnemyAttack: true,
            isMissed: false,
            isCrit: false,
            isSay: true,
            isBlocked: false,
            isDodged: false,
            avatar: enemy.avatar,
            characterName: enemy.title,
            damage: 0,
            hurtName: player.title,
            text,
            date: new Date().toLocaleTimeString()
        };

        setCombatHistory(h => [...h, history].sort((a, b) => a.date > b.date ? -1 : 1));
    }

    const onClickAttack = () => {
        if (playerStats.attackSpeed === playerCurrentTimeAttack) {
            attackSomeone(false);

            const playerTimerAttack = setInterval(() => {
                setPlayerCurrentTimeAttack(p => p - 0.1);
            }, 100);

            setTimeout(() => {
                clearInterval(playerTimerAttack);
                setPlayerCurrentTimeAttack(playerStats.attackSpeed);
            }, playerStats.attackSpeed * 1000);
        }
    }

    const attackSomeone = (isEnemyAttack: boolean) => {
        const attackData = getAttackData({
            isEnemyAttack,
            enemy,
            player,
            playerStats
        });

        const history: ICombatHistory = {
            isEnemyAttack: isEnemyAttack,
            isSay: false,
            isMissed: attackData.isMissed,
            isCrit: attackData.isCrit,
            isBlocked: attackData.isOpponentBlocked,
            isDodged: attackData.isOpponentDodged,
            avatar: attackData.avatar,
            characterName: attackData.title,
            damage: attackData.damage,
            hurtName: attackData.hurtCharacter,
            text: attackData.textDamage,
            date: attackData.date
        };

        setCombatHistory(h => [...h, history].sort((a, b) => a.date > b.date ? -1 : 1).splice(0,29));

        if (isEnemyAttack) {
            setPlayerHealth(p => p - attackData.damage);
        }
        else {
            setEnemyHealth(h => h - attackData.damage);
        }

        if (!isEnemyAttack && enemyHealth - attackData.damage < 0) {
            winCombat();
        }
    }
    
    interface IItems {
        id: string;
        count: number;
    }

    const [receivedItems, setReceivedItems] = useState<IItems[]>([]);
    const [isBattleEnded, setIsBattleEnded] = useState(false);
    const [isModalEndOpened, setIsModalEndOpened] = useState(false);
    const [isWin, setIsWin] = useState(false);

    const winCombat = () => {
        const items = getWinLoot({
            baseEnemyCountXP: enemy.baseCountXP,
            enemyLevel: $level,
            playerExpMultiplier: playerStats.experienceMultiplier,
            possibleLoot: enemy.possibleLoot
        });

        dispatch(addItemsToInventory(items));
        dispatch(addXP(items[0].count)); /// first item - is received experience
        dispatch(setHealthPoints(playerHealth));
        dispatch(setDeadEnemy({ levelId: currentLocation.id, enemyIdInArea: $enemyIdInArea }));

        setReceivedItems(items);
        setIsWin(true);
        setIsModalEndOpened(true);

        var highestTimeoutId = setTimeout(";");
        for (var i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
    }

    const loseCombat = () => {
        setIsModalEndOpened(true);
        var highestTimeoutId = setTimeout(";");
        for (var i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
        setIsWin(false);
        dispatch(setHealthPoints(0));
    }

    const onClickedFinishBattle = () => {
        setIsBattleEnded(true);
        setTimeout(() => {
            $finishBattle(isWin)
        }, 2000)

    }

    if (playerHealth <= 0 && !isBattleEnded && !isModalEndOpened) {
        loseCombat();
    }


    useEffect(() => {
        const timeToEnemySay = ((Math.random() * 100000) + 50000);
        const enemyTimerAttackInterval = setInterval(() => {
            if (enemyHealth < 0 || playerHealth < 0) {
                clearInterval(enemyTimerAttackInterval);
            }
            else {
                setEnemyTime(t => t - 0.1);
            }

        }, 100)

        const enemyAttackInterval = setInterval(() => {
            if (enemyHealth < 0 || playerHealth < 0) {
                clearInterval(enemyAttackInterval);
            }
            else {
                enemyAttack();
            }
        }, enemy.stats.attackSpeed * 1000)

        const enemySayInterval = setInterval(() => {
            enemySaySomething();

        }, timeToEnemySay)

        setTimeout(() => {
            setIsStartingAnimLost(true);
        }, 4100)

        return () => {
            clearInterval(enemyTimerAttackInterval);
            clearInterval(enemyAttackInterval);
            clearInterval(enemySayInterval);
        }

    }, [])

    const playerCurrentMaxHealth = playerSkills.baseHealth.currentScores * playerSkills.maxHealthMultiplier.currentScores;

    return (
        <>
            {
                isBattleEnded
                    ? <EndBattleBlock />
                    : null
            }
            <Background />
            <Page>
                <Container>
                    {
                        !isStartingAnimLost
                            ? <StartScreen>
                                <StartText>
                                    Сражение
                                </StartText>
                                <StartNameEnemy>
                                    {enemy.title}
                                </StartNameEnemy>
                            </StartScreen>
                            : null
                    }
                    {
                        isModalEndOpened
                            ? <EndCombatModal
                                $items={isWin ? receivedItems : null}
                                $isWin={isWin}
                                $finishBattle={() => onClickedFinishBattle()} />
                            : null
                    }

                    <CharacterSection 
                        $health={playerHealth}
                        $maxHealth={playerCurrentMaxHealth}
                        $title={player.title}
                        $attackSpeed={playerStats.attackSpeed}
                        $currentTimeAttack={playerCurrentTimeAttack}
                        $onClickAttack={() => onClickAttack()} />

                    <HistorySection 
                        $combatHistory={combatHistory} />

                    <EnemySection 
                        $avatar={enemy.avatar}
                        $title={enemy.title}
                        $level={$level}
                        $health={enemyHealth}
                        $maxHealth={enemy.stats.baseHealth}
                        $attackSpeed={enemy.stats.attackSpeed}
                        $currentTimeAttack={enemyTime} />
                    
                    <Empty />          
                </Container>
            </Page>
        </>
    );
}

const Empty = styled.div`
    height: 1rem;
    width: 100%;
    order: 4;
`

const EndBattleAnim = keyframes`
  0%{
    transform: scale(0);
  }
  100%{
    transform: scale(3);
  }
`

const EndBattleBlock = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99999;
  width: 100vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: black;

  animation: ${EndBattleAnim} 2s ease forwards;

  &::after{
    content: '';
    position: absolute;
    z-index: 99999;
    transform: scale(10);
    width: 100vw;
    height: 100vh;
    bottom: 0;
    top: 0;
    left: 0;
    margin: auto;
    
    background: rgba(0,0,0,0);
  }

  @media (max-width: 1025px) {
    width: 100vh;
    height: 100vh;
  }
  @media (max-width: 426px) {
    left: -50%;
    right: 50%;
  }
`

const StartAnim = keyframes`
    0%{
        background: #000000;
    }
    100%{
        background: rgba(0,0,0,0);
    }
`

const StartAnimText = keyframes`
    0%{
        transform: translateX(-120vw);
    }
    100%{
        transform: translateX(120vw);
    }
`

const StartAnimNameEnemy = keyframes`
    0%{
        transform: translateX(120vw);
    }
    100%{
        transform: translateX(-120vw);
    }
`

const StartScreen = styled.div`
    position: absolute;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #0000009f;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    animation: ${StartAnim} 4s cubic-bezier(0,-0.02,1,.24);
    animation-fill-mode: forwards;

    /* #e7b13d */
`

const StartText = styled.p`
    font-size: 3rem;
    font-weight: bold;
    user-select: none;

    animation: ${StartAnimText} 4s cubic-bezier(0,.89,1,.1);
    animation-fill-mode: forwards;
`

const StartNameEnemy = styled.p`
    font-size: 5rem;
    user-select: none;

    animation: ${StartAnimNameEnemy} 4s cubic-bezier(0,.89,1,.1);
    animation-fill-mode: forwards;
`

const Background = styled.div`
    position: fixed;
    width: 110vw;
    height: 110vh;
    top: -5%;
    left: -5%;
    z-index: -1;
    background-image: url(${require('../../../icons/backgrounds/combat.png')});
    filter: blur(5px);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    

    &::after{
        content: '';
        position: absolute;
        z-index: -1;
        top: 10%;
        left: 0%;
        width: 110vw;
        height: 100vh;
        background: linear-gradient(180deg, rgba(255,255,255,0) 70%, #000000b0 100%);
    }
`



const Container = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 3rem;
    margin-bottom: 5rem;

`

const Page = styled.div`
    padding: 1rem;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;

    overflow-y: auto;
`

export default CombatPage;