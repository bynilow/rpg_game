import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IActionTexts, IEnemy } from '../../../models/IEnemy';
import { scrollBarX } from '../../../styles/scrollbars';
import Avatar from '../../Avatar/Avatar';
import Container from '../../Container/Container';
import EndCombatModal from '../../Modals/WinCombatModal/EndCombatModal';
import CombatText from './CombatText';
import { addItemsToInventory, addXP, setDeadEnemy, setPlayer } from '../../../store/reducers/ActionCreators';
import { IFullItemWithCount } from '../../../models/IAreaItem';
import { IPlayer } from '../../../models/IPlayer';
import Section from '../../Section/Section';

interface ICombatPage {
    $enemyId: string;
    $enemyIdInArea: string;
    $level: number;
    $currentLocationId: string;
    $finishBattle: (isWin: boolean) => void;
}

function CombatPage({ $enemyId, $finishBattle, $currentLocationId, $enemyIdInArea, $level }: ICombatPage) {

    const {
        enemies,
        areaItems,
        player,
        playerSkillsLevel,
        playerCurrentStats } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const foundedEnemy = enemies.find(e => e.id === $enemyId)!;

    const [enemy, setEnemy] = useState<IEnemy>({
        ...foundedEnemy,
        baseCountXP: foundedEnemy.baseCountXP * $level,
        damage: foundedEnemy.damage * $level / 3,
        maxHealth: foundedEnemy.maxHealth * $level / 2
    });

    const [enemyHealth, setEnemyHealth] = useState(enemy.maxHealth);

    const [playerData, setPlayerData] = useState(player);
    const [playerHealth, setPlayerHealth] = useState(playerCurrentStats.baseHealth);
    const [playerCurrentTimeAttack, setPlayerCurrentTimeAttack] = useState(playerCurrentStats.attackSpeed);


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

    const [enemyTime, setEnemyTime] = useState<number>(enemy.attackSpeed + 5);

    const getChance = (chance: number) => {
        const randomNumber = Math.round(Math.random() * 100);
        if (randomNumber <= chance) return true
        else return false
    }

    const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * max + min);

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
            hurtName: playerData.title,
            text,
            date: new Date().toLocaleTimeString()
        };

        setCombatHistory(h => [...h, history].sort((a, b) => a.date > b.date ? -1 : 1));
    }

    const onClickAttack = () => {
        if (playerCurrentStats.attackSpeed === playerCurrentTimeAttack) {
            attackSomeone(false);

            const playerTimerAttack = setInterval(() => {
                setPlayerCurrentTimeAttack(p => p - 0.1);
            }, 100);

            setTimeout(() => {
                clearInterval(playerTimerAttack);
                setPlayerCurrentTimeAttack(playerCurrentStats.attackSpeed);
            }, playerCurrentStats.attackSpeed * 1000);
        }
    }

    const attackSomeone = (enemyAttack: boolean) => {

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
                : playerCurrentStats.critChance);

        let isMissed = getChance(
            enemyAttack
                ? enemy.missChance
                : playerCurrentStats.missPercentChance);

        let isOpponentDodged = getChance(
            enemyAttack
                ? playerCurrentStats.dodgePercentChance
                : enemy.dodgeChance);

        let isOpponentBlocked = getChance(
            enemyAttack
                ? playerCurrentStats.blockingChancePercent
                : enemy.blockingChance);

        let damage =
            enemyAttack
                ? enemy.damage
                : playerCurrentStats.baseDamage

        let critDamage =
            enemyAttack
                ? Number((enemy.damage * enemy.critDamageMultiplier).toFixed(1))
                : Number((playerCurrentStats.baseDamage * playerCurrentStats.critDamageMultiplier).toFixed(1))

        let blockedCritDamage = Number(
            (damage / (enemyAttack ? playerCurrentStats.blockingMultiplier : enemy.blockingMultiplier))
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

        console.log(textDamage)

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
        const items: IFullItemWithCount[] = [];
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
        dispatch(addXP(enemy.baseCountXP));
        dispatch(setDeadEnemy({ levelId: $currentLocationId, enemyIdInArea: $enemyIdInArea }));

        setReceivedItems(items);
        setIsWin(true);
        setIsModalEndOpened(true);
    }

    const loseCombat = () => {
        setIsWin(false);
        setIsModalEndOpened(true);
    }

    const onClickedFinishBattle = () => {
        setIsBattleEnded(true);
        setTimeout(() => {
            $finishBattle(isWin)
        }, 2000)
        
    }

    if (playerHealth < 0 && !isBattleEnded) {
        loseCombat();
    }


    useEffect(() => {
        const timeToEnemySay = ((Math.random() * 100000) + 50000);
        console.log(timeToEnemySay / 1000)
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
        }, 4000)

        return () => {
            clearInterval(enemyTimerAttackInterval);
            clearInterval(enemyAttackInterval);
            clearInterval(enemySayInterval);
        }

    }, [isWin])



    return (
        <>
            {
                isBattleEnded
                    ? <EndBattleBlock />
                    : null
            }
            <Background />
            <Page>
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
                <Container>
                    <ContainerInner>
                        <Section
                            $isBoxShadow
                            $isBackgroundTransparent={false}>
                            <Title>
                                {
                                    playerData.title
                                }
                            </Title>
                            <BlockLine>
                                <HealthLine max={playerCurrentStats.baseHealth} value={playerHealth} />
                                <BlockText>
                                    {playerHealth.toFixed(1)}/{playerCurrentStats.baseHealth}
                                </BlockText>
                            </BlockLine>
                            <BlockLine>
                                <AttackLine max={playerCurrentStats.attackSpeed} value={playerCurrentTimeAttack} />
                                <BlockText>
                                    {
                                        playerCurrentTimeAttack.toFixed(1)
                                    }s
                                </BlockText>
                            </BlockLine>
                            <ButtonsBlock>
                                <ButtonAttack onClick={() => onClickAttack()}>
                                    Удар
                                </ButtonAttack>
                                <ButtonLeave>
                                    Сбежать
                                </ButtonLeave>
                            </ButtonsBlock>
                            <ButtonInventory>
                                Инвентарь
                            </ButtonInventory>
                        </Section>

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
                    </ContainerInner>
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
    transform: scale(1.5);
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
`

const StartAnim = keyframes`
    0%{
        background: #000000;
        top: 0;
    }
    60%{
        background: #000000c1;
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
    background: #000000a0;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    animation: ${StartAnim} 4s ease;
    animation-fill-mode: forwards;
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
    position: absolute;
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

const ButtonInventory = styled(Button)`
    background: #5491ad;
`

const ButtonAttack = styled(Button)`
    background: #54ad54;
`

const ButtonLeave = styled(Button)`
    background: #a85151;
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
    min-height: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    
`

const ContainerInner = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px;

    display: flex;
    gap: 30px;
    justify-content: space-between;
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
    font-size: 20px;
    margin: 0;
    transition: .1s;
`

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`

export default CombatPage;