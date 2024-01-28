import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IActionTexts, IEnemy } from '../../../models/IEnemy';
import { scrollBarX } from '../../../styles/scrollbars';
import Avatar from '../../Avatar/Avatar';
import EndCombatModal from '../../Modals/WinCombatModal/EndCombatModal';
import CombatText from './CombatText';
import { addItemsToInventory, addXP, setDeadEnemy, setHealthPoints, setPlayer } from '../../../store/reducers/ActionCreators';
import { IFullItemWithCount } from '../../../models/IAreaItem';
import { IPlayer } from '../../../models/IPlayer';
import Section from '../../Section/Section';
import { getChance, getRandomNumber } from '../../../functions/Random';
import { getStats } from '../../../functions/Stats';

interface ICombatPage {
    $enemyId: string;
    $enemyIdInArea: string;
    $level: number;
    $finishBattle: (isWin: boolean) => void;
}

function CombatPage({ $enemyId, $finishBattle, $enemyIdInArea, $level }: ICombatPage) {
    const {
        enemies,
        areaItems,
        player,
        playerSkills,
        currentLocation } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const foundedEnemy = enemies.find(e => e.id === $enemyId)!;

    const [enemy, setEnemy] = useState<IEnemy>({
        ...foundedEnemy,
        baseCountXP: foundedEnemy.baseCountXP * $level,
        damage: foundedEnemy.damage * $level / 2,
        maxHealth: foundedEnemy.maxHealth * $level / 2
    });

    const [enemyHealth, setEnemyHealth] = useState(enemy.maxHealth);

    const [playerStats, setPlayerStats] = useState(getStats(playerSkills, player));

    const [playerHealth, setPlayerHealth] = useState(player.health);
    const [playerCurrentTimeAttack, setPlayerCurrentTimeAttack] = useState(playerStats.attackSpeed < 0 ? 0.1 : playerStats.attackSpeed);


    interface ICombatHistory {
        isEnemyAttack: boolean;
        isMissed: boolean;
        isCrit: boolean;
        isSay: boolean;
        isDodged: boolean;
        isBlocked: boolean;
        avatar: string;
        text: string;
        damage: number;
        characterName: string;
        hurtName: string;
        date: string;
    }

    const [isStartingAnimLost, setIsStartingAnimLost] = useState(false);
    const [combatHistory, setCombatHistory] = useState<ICombatHistory[]>([]);

    const [enemyTime, setEnemyTime] = useState<number>(enemy.attackSpeed);



    const enemyAttack = () => {
        setEnemyTime(enemy.attackSpeed);
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

    const attackSomeone = (enemyAttack: boolean) => {

        const playerCurrentDamage = playerStats.baseDamage;

        const avatar =
            enemyAttack
                ? enemy.avatar
                : player.avatar

        const title =
            enemyAttack
                ? enemy.title
                : player.title

        let textDamage =
            enemyAttack
                ? enemy.actionText.combatText[getRandomNumber(0, enemy.actionText.combatText.length - 1)]
                : player.actionText.combatText[getRandomNumber(0, player.actionText.combatText.length - 1)]

        let isCrit = getChance(
            enemyAttack
                ? enemy.critChance
                : playerStats.critChance);

        let isMissed = getChance(
            enemyAttack
                ? enemy.missChance
                : playerStats.missPercentChance);

        let isOpponentDodged = getChance(
            enemyAttack
                ? playerStats.dodgePercentChance
                : enemy.dodgeChance);

        let isOpponentBlocked = getChance(
            enemyAttack
                ? playerStats.blockingChancePercent
                : enemy.blockingChance);

        let damage =
            enemyAttack
                ? enemy.damage
                : playerCurrentDamage

        let critDamage =
            enemyAttack
                ? Number((enemy.damage * enemy.critDamageMultiplier).toFixed(1))
                : Number((playerCurrentDamage * playerStats.critDamageMultiplier).toFixed(1))

        let blockedCritDamage = Number(
            (damage / (enemyAttack ? playerStats.blockingMultiplier : enemy.blockingMultiplier))
                .toFixed(1));

        if (isCrit) {
            isMissed = false;
            isOpponentDodged = false;

            textDamage =
                enemyAttack
                    ? enemy.actionText.critDamageText
                    : player.actionText.critDamageText

            damage = critDamage;

            if (isOpponentBlocked) {
                textDamage =
                    enemyAttack
                        ? enemy.actionText.successBlockingCritText
                        : player.actionText.successBlockingCritText

                damage = blockedCritDamage;
            }
        }
        if (isMissed) {
            isOpponentDodged = false;
            isOpponentBlocked = false;

            textDamage =
                enemyAttack
                    ? enemy.actionText.missText
                    : player.actionText.missText

            damage = 0
        }
        if (isOpponentDodged) {
            isOpponentBlocked = false;

            textDamage =
                enemyAttack
                    ? player.actionText.dodgeText
                    : enemy.actionText.dodgeText;
            damage = 0;
        }
        if (isOpponentBlocked) {
            textDamage =
                enemyAttack
                    ? enemy.actionText.successBlockingText
                    : player.actionText.successBlockingText
            damage = blockedCritDamage;
        }

        const history: ICombatHistory = {
            isEnemyAttack: enemyAttack,
            isSay: false,
            isMissed,
            isCrit,
            isBlocked: isOpponentBlocked,
            isDodged: isOpponentDodged,
            avatar: avatar,
            characterName: title,
            damage,
            hurtName: enemyAttack ? player.title : enemy.title,
            text: textDamage,
            date: new Date().toLocaleTimeString()
        };

        setCombatHistory(h => [...h, history].sort((a, b) => a.date > b.date ? -1 : 1));

        if (enemyAttack) {
            setPlayerHealth(p => p - damage);
        }
        else {
            setEnemyHealth(h => h - damage);
        }

        if (!enemyAttack && enemyHealth - damage < 0) {
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
        const possibleItems = enemy.possibleLoot;
        const experienceCount = Number((
            enemy.baseCountXP
            * playerStats.experienceMultiplier
            + (enemy.level / 2)).toFixed(0));
        const experienceItem: IFullItemWithCount = {
            ...areaItems.find(i => i.id === 'experience')!,
            count: experienceCount
        }
        const items: IFullItemWithCount[] = [];
        items.push(experienceItem);
        possibleItems.forEach(i => {
            if (getChance(i.dropChance)) {
                const foundedItem = areaItems.find(ai => ai.id === i.id)!;
                let count = 0;
                if (i.id === 'coin') {
                    count = getRandomNumber(i.countMin + $level, i.countMax + $level * 1.5);
                }
                else {
                    count = getRandomNumber(i.countMin, i.countMax);
                }
                items.push({ ...foundedItem, count })
            }
        })
        dispatch(addItemsToInventory(items));
        dispatch(addXP(experienceCount));
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
        }, enemy.attackSpeed * 1000)

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

                    <CharacterBlock>
                        <Section
                            $isBoxShadow
                            $isBackgroundTransparent={false}>
                            <Title>
                                {
                                    player.title
                                }
                            </Title>
                            <BlockLine>
                                <HealthLine max={playerCurrentMaxHealth} value={playerHealth} />
                                <BlockText>
                                    {playerHealth.toFixed(1)}/{playerCurrentMaxHealth}
                                </BlockText>
                            </BlockLine>
                            <BlockLine>
                                <AttackLine max={playerStats.attackSpeed} value={playerCurrentTimeAttack} />
                                <BlockText>
                                    {
                                        playerCurrentTimeAttack.toFixed(1)
                                    }s
                                </BlockText>
                            </BlockLine>
                            <ButtonAttack onClick={() => onClickAttack()}>
                                    Удар
                                </ButtonAttack>
                        </Section>
                    </CharacterBlock>

                    <HistoryBattle>
                        <Section
                            $isBoxShadow
                            $isBackgroundTransparent={false}>
                            <Title>
                                Ход сражения
                            </Title>
                            <List>

                                {
                                    combatHistory.map((c, ind) => <CombatText
                                        key={ind}
                                        isEnemyAttack={c.isEnemyAttack}
                                        isMissed={c.isMissed}
                                        isSay={c.isSay}
                                        isCrit={c.isCrit}
                                        isDodged={c.isDodged}
                                        isBlocked={c.isBlocked}
                                        avatar={c.avatar}
                                        text={c.text}
                                        damage={c.damage}
                                        hurtName={c.hurtName}
                                        date={c.date}
                                        characterName={c.characterName} />)
                                }
                            </List>
                        </Section>
                    </HistoryBattle>
                    <CharacterBlock>
                        <Section
                            $isBoxShadow
                            $isBackgroundTransparent={false}>

                            <Avatar
                                $image={enemy.avatar}
                                width={'200px'}
                                height={'200px'} />
                            <Title>
                                {
                                    enemy.title
                                }
                            </Title>
                            <EnemyLevel>
                                Уровень: {$level}
                            </EnemyLevel>
                            <BlockLine>
                                <HealthLine max={enemy.maxHealth} value={enemyHealth} />
                                <BlockText>
                                    {
                                        enemyHealth.toFixed(1)
                                    }
                                    /
                                    {
                                        enemy.maxHealth
                                    }
                                </BlockText>
                            </BlockLine>
                            <BlockLine>
                                <AttackLine max={enemy.attackSpeed} value={enemyTime} />
                                <BlockText>
                                    {
                                        enemyTime.toFixed(1)
                                    }s
                                </BlockText>
                            </BlockLine>
                        </Section>
                    </CharacterBlock>

                </Container>
            </Page>
        </>
    );
}



const EndBattleAnim = keyframes`
  0%{
    transform: scale(0);
  }
  100%{
    transform: scale(1.7);
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
  width: 100vw;
  height: 100vw;
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

const EnemyLevel = styled.p`
    margin: 0;
    font-size: 16px;
    color: #9b9b9b;
`

const Button = styled.div`
    flex: 1;
    background: gray;
    max-height: 45px;
    text-align: center;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    transition: .1s;

    &:hover{
        transform: scale(0.95);
    }
`

const ButtonAttack = styled(Button)`
    background: #54ad54;
`

const ButtonsBlock = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
`

const BlockText = styled.p`
    margin: 0;
    margin-right: 10px;
    text-align: right;
    width: 30%;
`

const BlockLine = styled.div`
    box-shadow: 0 0 5px black;
    min-height: 1.3em;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
`

const AttackLine = styled.progress`
    width: 100%;
    height: 25px;
    border-radius: 5px;
    -webkit-appearance: none;
   appearance: none;

   transition: 0.1s;

   &::-webkit-progress-value {
    background-color: #aaaaaa;

    border-radius: 5px;
    transition: 0.2s;
   }
   &::-webkit-progress-bar {
    background-color: #757575;
    border-radius: 5px;
   }
`

const HealthLine = styled.progress`
    width: 100%;
    height: 35px;
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

const Title = styled.p`
    font-size: 1.3em;
    margin: 0;
    transition: .1s;
`

const CharacterBlock = styled.div`
    flex: 1;
    max-height: 50%;
`

const HistoryBattle = styled.div`
    flex: 1;
    max-height: 100%;

    @media (max-width: 1025px) {
        order: 3;
        max-height: 40%;
    }

    @media (max-width: 426px) {
        max-height: 30%;
    }
`

const Container = styled.div`
    width: 90%;
    max-height: 100%;
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

    ${scrollBarX}
`

export default CombatPage;