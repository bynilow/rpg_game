import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IActionTexts, IEnemy } from '../../models/IEnemy';
import { scrollBarX } from '../../styles/scrollbars';
import Avatar from '../Avatar/Avatar';
import Container from '../Container/Container';
import EndCombatModal from '../Modals/WinCombatModal/EndCombatModal';
import CombatText from './CombatText';
import { addItemsToInventory, addXP, setDeadEnemy, setPlayer } from '../../store/reducers/ActionCreators';
import { IFullItemWithCount } from '../../models/IAreaItem';
import { IPlayer } from '../../models/IPlayer';

interface ICombatPage {
    $enemyId: string;
    $enemyIdInArea: string;
    $level: number;
    $currentLocationId: string;
    $finishBattle: (isWin: boolean) => void;
}

function CombatPage({ $enemyId, $finishBattle, $currentLocationId, $enemyIdInArea, $level }: ICombatPage) {

    const { enemies, areaItems, player } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [enemy, setEnemy] = useState(enemies.find(e => e.id === $enemyId)!);
    const [enemyHealth, setEnemyHealth] = useState(enemy.maxHealth);

    const [playerData, setPlayerData] = useState(player);

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

    const [combatHistory, setCombatHistory] = useState<ICombatHistory[]>([]);
    const [isBattleFinished, setIsBattleFinished] = useState(false);
    const [isWin, setIsWin] = useState(false);

    const [enemyTime, setEnemyTime] = useState<number>(enemy.attackSpeed);

    const getChance = (chance: number) => {
        const randomNumber = Math.round(Math.random()*100); 
        if (randomNumber <= chance) return true
        else return false
    }

    const getRandomNumber = (min:number, max:number) => Math.floor(Math.random() * max + min);

    const enemyAttack = () => {
        setEnemyTime(enemy.attackSpeed);
        attackSomeone(enemy, true);
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

            setCombatHistory(h => [...h, history].sort((a,b) => a.date > b.date ? -1 : 1));
    }

    const onClickAttack = () => {
        if (playerData.attackSpeed === playerData.currentAttackTime) {
            attackSomeone(playerData, false);

            const playerTimerAttack = setInterval(() => {
                setPlayerData(p => ({ ...p, currentAttackTime: p.currentAttackTime - 0.1 }))
            }, 100);

            setTimeout(() => {
                clearInterval(playerTimerAttack);
                setPlayerData(p => ({ ...p, currentAttackTime: p.attackSpeed }));
            }, playerData.attackSpeed*1000);
        }
    }

    const attackSomeone = (character: IPlayer | IEnemy, enemyAttack: boolean) => {

        let textDamage = character.actionText.combatText[getRandomNumber(0, character.actionText.combatText.length-1)];

        let isCrit = getChance(character.critChance);
        let isMissed = getChance(character.missChance);
        let isOpponentDodged = getChance(enemyAttack ? playerData.dodgeChance : enemy.dodgeChance);
        let isOpponentBlocked = getChance(enemyAttack ? playerData.blockingChance : enemy.blockingChance);

        let damage = character.damage;
        let critDamage = Number((character.damage * character.critDamageMultiplier).toFixed(1));
        let blockedCritDamage = Number(
            (character.damage / (enemyAttack ? playerData.blockingMultiplier : enemy.blockingMultiplier))
                .toFixed(1));

        if (isCrit) {
            isMissed = false;
            isOpponentDodged = false;

            textDamage = character.actionText.critDamageText;
            damage = critDamage;
            if (isOpponentBlocked) {
                textDamage = character.actionText.successBlockingCritText;
                damage = critDamage / character.blockingMultiplier;
            }
        }
        if (isMissed) {
            isOpponentDodged = false;
            isOpponentBlocked = false;

            textDamage = character.actionText.missText;
            damage = 0
        }
        if (isOpponentDodged) {
            isOpponentBlocked = false;

            textDamage = enemyAttack ? playerData.actionText.dodgeText : enemy.actionText.dodgeText;
            damage = 0;
        }
        if (isOpponentBlocked) {
            textDamage = character.actionText.successBlockingText;
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
            avatar: character.avatar,
            characterName: character.title,
            damage,
            hurtName: enemyAttack ? playerData.title : enemy.title,
            text: textDamage,
            date: new Date().toLocaleTimeString()
        };

        setCombatHistory(h => [...h, history].sort((a, b) => a.date > b.date ? -1 : 1));

        if(enemyAttack){
            setPlayerData(p => ({...p, health: p.health - damage}));
        }
        else{
            setEnemyHealth(h => h - damage);
        }

        if(!enemyAttack && enemyHealth-damage < 0){
            winCombat();
        }
        if(enemyAttack && playerData.health-damage < 0){
            loseCombat();
        }
    }

    interface IItems {
        id: string;
        count: number;
    }

    const [receivedItems, setReceivedItems] = useState<IItems[]>([])

    const winCombat = () => {
        const possibleItems = enemy.possibleLoot;
        const items:IFullItemWithCount[] = [];
        possibleItems.forEach(i => {
            if( getChance(i.dropChance) ){
                const foundedItem = areaItems.find(ai => ai.id === i.id)!;
                const count = getRandomNumber(i.countMin, i.countMax);
                items.push( {...foundedItem, count} )
            }
        })
        dispatch(setDeadEnemy({levelId: $currentLocationId, enemyIdInArea: $enemyIdInArea}));
        dispatch(addItemsToInventory(items));
        dispatch(setPlayer(playerData));
        dispatch(addXP(enemy.baseCountXP));
        setReceivedItems(items);
        setIsWin(true);
        setIsBattleFinished(true);
    }

    const loseCombat = () => {
        setIsWin(false);
        setIsBattleFinished(true);
    }


    useEffect(() => {
        const timeToEnemySay = ((Math.random()*100000)+50000);
        console.log(timeToEnemySay/1000)
        const enemyTimerAttackInterval = setInterval(() => {
            if(enemyHealth < 0 || playerData.health < 0){
                clearInterval(enemyTimerAttackInterval);
            }
            else{
                setEnemyTime(t => t - 0.1);
            }

        }, 100)

        const enemyAttackInterval = setInterval(() => {
            if(enemyHealth < 0 || playerData.health < 0){
                clearInterval(enemyAttackInterval);
            }
            else{
                enemyAttack();
            } 
        }, enemy.attackSpeed*1000)

        const enemySayInterval = setInterval(() => {
            enemySaySomething();
            
        }, timeToEnemySay)

        return () => {
            clearInterval(enemyTimerAttackInterval);
            clearInterval(enemyAttackInterval);
            clearInterval(enemySayInterval);
        }
    }, [isWin])



    return (
        <Page>
            {
                isBattleFinished
                ? <EndCombatModal 
                    $items={isWin ? receivedItems : null}
                    $isWin={isWin}
                    $finishBattle={(isWin:boolean) => $finishBattle(isWin)} />
                : null
            }
            <Container>
                <ContainerInner>
                    <Section>
                        <Title>
                            {
                                playerData.title
                            }
                        </Title>
                        <BlockLine>
                            <HealthLine max={playerData.maxHealth} value={playerData.health} />
                            <BlockText>
                                {playerData.health.toFixed(1)}/{playerData.maxHealth}
                            </BlockText>
                        </BlockLine>
                        <BlockLine>
                            <AttackLine max={playerData.attackSpeed} value={playerData.currentAttackTime} />
                            <BlockText>
                                {
                                    playerData.currentAttackTime.toFixed(1)
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

                <Section>
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

                    <Section>

                        <Avatar 
                            $image={enemy.avatar}
                            width={'200px'} 
                            height={'200px'}/>
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
    );
}

const EnemyLevel = styled.p`
    margin: 0;
    font-size: 16px;
    color: #9b9b9b;
`

const Button = styled.div`
    flex: 1;
    max-height: 25px;
    text-align: center;
    background: gray;
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
    height: 100%;
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

const Section = styled.div`
    flex: 1;
    padding: 20px;
    height: 85%;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px black;

    ${
        scrollBarX
    }
`

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`

export default CombatPage;