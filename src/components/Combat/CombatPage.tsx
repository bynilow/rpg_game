import styled from 'styled-components'
import { useAppSelector } from '../../hooks/redux';
import { useEffect, useRef, useState } from 'react';
import Container from '../Container/Container';
import CombatText from './CombatText';
import { IActionTexts, IEnemy } from '../../models/IEnemy';

interface ICombatPage {
    enemyId: string;
}

function CombatPage({ enemyId }: ICombatPage) {

    const { enemies } = useAppSelector(state => state.userReducer);

    const [enemy, setEnemy] = useState(enemies.find(e => e.id === enemyId)!);
    const [enemyHealth, setEnemyHealth] = useState(enemy.maxHealth);

    interface IPlayer {
        title: string;
        avatar: string;
        maxHealth: number;
        health: number;
        attackSpeed: number;
        currentAttackTime: number;
        damage: number;
        critDamageMultiplier: number;
        critChance: number;
        dodgeChance: number;
        blockingChance: number;
        blockingMultiplier: number;
        missChance: number;
        actionText: IActionTexts;

    }

    const [player, setPlayer] = useState<IPlayer>({
        title: 'peesoos',
        avatar: '',
        maxHealth: 150,
        health: 150,
        attackSpeed: 3,
        currentAttackTime: 3,
        damage: 8,
        critDamageMultiplier: 1.5,
        critChance: 10,
        dodgeChance: 15,
        blockingChance: 15,
        blockingMultiplier: 1.5,
        missChance: 20,
        actionText: {
            combatText: [
                "Сжимает свой кулак и бьет #name прямо по лицу нанеся #damage урона."
            ],
            communicationText: [""],
            critDamageText: "Глубоко вдохнув и ударив кулаком по #name попал в глаз нанеся критические #damage урона!",
            missText: "Рассек воздух своим кулаком, не нанеся никакого урона.",
            dodgeText: "#name Применяет уловку и уклоняется от удара.",
            failedBlockingText: "Блок не удался, и удар #name наносит #damage! Это было больно...",
            successBlockingCritText: "Совершенное владение щитом оказывает эффект! #name блокирует критический урон и получает всего #damage урона!",
            successBlockingText: "Совершенное владение щитом оказывает эффект! #name получает всего #damage урона!"
        }
    });

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

    const [enemyTime, setEnemyTime] = useState<number>(enemy.attackSpeed);

    const getChance = (chance: number) => {
        const randomNumber = Math.round(Math.random()*100); 
        if (randomNumber <= chance) return true
        else return false
    }

    const getRandomNumber = (min:number, max:number) => Math.round(Math.random() * max + min);

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
            hurtName: player.title,
            text,
            date: new Date().toLocaleTimeString()
        };

            setCombatHistory(h => [...h, history].sort((a,b) => a.date > b.date ? -1 : 1));
    }

    const onClickAttack = () => {
        if (player.attackSpeed === player.currentAttackTime) {
            attackSomeone(player, false);

            const playerTimerAttack = setInterval(() => {
                setPlayer(p => ({ ...p, currentAttackTime: p.currentAttackTime - 0.1 }))
            }, 100);

            setTimeout(() => {
                clearInterval(playerTimerAttack);
                setPlayer(p => ({ ...p, currentAttackTime: p.attackSpeed }));
            }, player.attackSpeed*1000);
        }
    }

    const attackSomeone = (character: IPlayer | IEnemy, enemyAttack: boolean) => {

        let textDamage = character.actionText.combatText[getRandomNumber(0, character.actionText.combatText.length-1)];

        let isCrit = getChance(character.critChance);
        let isMissed = getChance(character.missChance);
        let isOpponentDodged = getChance(enemyAttack ? player.dodgeChance : enemy.dodgeChance);
        let isOpponentBlocked = getChance(enemyAttack ? player.blockingChance : enemy.blockingChance);

        let damage = character.damage;
        let critDamage = Number((character.damage * character.critDamageMultiplier).toFixed(1));
        let blockedCritDamage = Number(
            (character.damage / (enemyAttack ? player.blockingMultiplier : enemy.blockingMultiplier))
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

            textDamage = enemyAttack ? player.actionText.dodgeText : enemy.actionText.dodgeText;
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
            hurtName: enemyAttack ? player.title : enemy.title,
            text: textDamage,
            date: new Date().toLocaleTimeString()
        };

        setCombatHistory(h => [...h, history].sort((a, b) => a.date > b.date ? -1 : 1));

        if(enemyAttack){
            setPlayer(p => ({...p, health: p.health - damage}));
        }
        else{
            setEnemyHealth(enemyHealth - damage);
        }
    }


    useEffect(() => {
        const timeToEnemySay = ((Math.random()*100000)+50000);
        console.log(timeToEnemySay/1000)
        const enemyTimerAttackInterval = setInterval(() => {
            setEnemyTime(t => t - 0.1);

        }, 100)

        const enemyAttackInterval = setInterval(() => {
            enemyAttack();
            
        }, enemy.attackSpeed*1000)

        const enemySayInterval = setInterval(() => {
            enemySaySomething();
            
        }, timeToEnemySay)

        return () => {
            clearInterval(enemyTimerAttackInterval);
            clearInterval(enemyAttackInterval);
            clearInterval(enemySayInterval);
        }
    }, [])



    return (
        <Page>
            <Container>
                <ContainerInner>
                <Section>
                    <Title>
                        {
                            player.title
                        }
                    </Title>
                        <BlockLine>
                            <HealthLine max={player.maxHealth} value={player.health} />
                            <BlockText>
                                {player.health.toFixed(1)}/{player.maxHealth}
                            </BlockText>
                        </BlockLine>
                        <BlockLine>
                            <AttackLine max={player.attackSpeed} value={player.currentAttackTime} />
                            <BlockText>
                                {
                                    player.currentAttackTime.toFixed(1)
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

                        <Avatar image={enemy.avatar} />
                        <Title>
                            {
                                enemy.title
                            }
                        </Title>
                        <EnemyLevel>
                            Уровень: {enemy.level}
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
    width: 100%;
    text-align: center;
    background: gray;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
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
    box-sizing: border-box;
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

interface IAvatarProps {
    image: string;
}

const Avatar = styled.div<IAvatarProps>`
    z-index: 2;
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url(${p => require('../../' + p.image)});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    transition: 0.3s;

`

const Title = styled.p`
    font-size: 20px;
    margin: 0;
    transition: .1s;
`

const Section = styled.div`
    flex: 1;
    padding: 20px;
    height: 100%;
    max-height: min-content;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px black;

    &::-webkit-scrollbar{
        width: 5px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: #d4d4d4; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        margin: 10px;
        width: 20px;
        background-color: #858585;    
        border-radius: 10px;       
    }
`

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`

export default CombatPage;