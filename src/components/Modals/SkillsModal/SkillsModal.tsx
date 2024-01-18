import styled from 'styled-components'
import Modal from '../Modal';
import CircleButton from '../../Buttons/CircleButton';
import Section from '../../Section/Section';
import SkillElement from './SkillElement';
import { scrollBarX } from '../../../styles/scrollbars';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect, useState } from 'react';
import { addSkills, decrementSkillPoints } from '../../../store/reducers/ActionCreators';

interface ISkillsModalProps {
    $closeModal: Function;
}

function SkillsModal({$closeModal}: ISkillsModalProps) {

    const {playerSkills, player} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    interface ISkillInfo {
        id: string;
        title: string;
        description: string;
        branch: 'strength' | 'agility' | 'intelligence';
        type: 'score' | 'multiplier' | 'percent';
        count: number;
        selectedLevel: number;
    }

    const baseSkills: ISkillInfo[] = [
        {
            id: 'damageMultiplier',
            title: 'Множитель урона',
            description: 'Навык, который увеличивает силу причиняемого урона персонажем. Чем выше уровень навыка, тем больше урона он может нанести своим врагам, что делает его более смертоносным и эффективным в сражениях.',
            branch: 'strength',
            type: 'multiplier',
            count: 0.15,
            selectedLevel: 0
        },
        {
            id: 'critDamageMultiplier',
            title: 'Множитель критического урона',
            description: 'Навык повышает силу нанесения критического урона, который превышает обычный урон. Чем выше уровень навыка, тем больше урона наносится при критическом ударе.',
            branch: 'strength',
            type: 'multiplier',
            count: 0.2,
            selectedLevel: 0
        },
        {
            id: 'critChance',
            title: 'Шанс критического урона',
            description: 'Навык определяет вероятность нанесения критического урона во время сражений. Чем выше уровень навыка, тем больше шансов на успешное нанесение критического удара.',
            branch: 'strength',
            type: 'percent',
            count: 0.5,
            selectedLevel: 0
        },
        {
            id: 'oreSpeedMining',
            title: 'Скорость добычи руды',
            description: 'Навык увеличивает скорость добычи руды, что позволяет персонажу быстрее собирать полезные ископаемые.',
            branch: 'strength',
            type: 'score',
            count: 0.01,
            selectedLevel: 0
        },
        {
            id: 'oreDoubleLootPercentChance',
            title: 'Шанс дополнительного количества руды',
            description: 'Навык увеличивает шансы на получение дополнительных порций руды при её добыче. За каждые 100% навыка игрок гарантированно получает на 1 руду больше.',
            branch: 'strength',
            type: 'percent',
            count: 3,
            selectedLevel: 0
        },
        {
            id: 'treeSpeedMining',
            title: 'Скорость добычи деревьев',
            description: 'Навык позволяет персонажу быстрее добывать древесину.',
            branch: 'strength',
            type: 'score',
            count: 0.01,
            selectedLevel: 0
        },
        {
            id: 'treeDoubleLootPercentChance',
            title: 'Шанс дополнительного количества дерева',
            description: 'Навык повышает вероятность получения дополнительных порций дерева при его добыче. За каждые 100% навыка игрок гарантированно получает на 1 дерево больше.',
            branch: 'strength',
            type: 'percent',
            count: 3,
            selectedLevel: 0
        },
        {
            id: 'capacity',
            title: 'Грузоподъемность',
            description: 'Навык определяет максимально переносимый вес персонажа. Чем выше уровень навыка, тем больше веса персонаж сможет поднять и нести. Это позволяет ему собирать больше ресурсов, переносить более сильные оружия и броню, а также быть более мобильным.',
            branch: 'strength',
            type: 'score',
            count: 20,
            selectedLevel: 0
        },
        {
            id: 'blockingChancePercent',
            title: 'Шанс блокирования',
            description: 'Навык, определяющий вероятность успешной блокировки атаки противника. Чем выше уровень этого навыка, тем больше вероятность успешной блокировки и снижения получаемого урона.',
            branch: 'agility',
            type: 'percent',
            count: 0.25,
            selectedLevel: 0
        },
        {
            id: 'blockingMultiplier',
            title: 'Множитель блокирования',
            description: 'Навык увеличивает эффективность блокирования, позволяя блокировать большую долю урона от атак противника. Уровень этого навыка влияет на снижение получаемого урона при успешной блокировке.',
            branch: 'agility',
            type: 'multiplier',
            count: 0.05,
            selectedLevel: 0
        },
        {
            id: 'dodgePercentChance',
            title: 'Шанс уклонения',
            description: 'Навык определяет вероятность успешного уклонения от атак противника. Чем выше уровень этого навыка, тем больше шанс уклониться от атаки и избежать получения урона.',
            branch: 'agility',
            type: 'percent',
            count: 0.1,
            selectedLevel: 0
        },
        {
            id: 'missPercentChance',
            title: 'Шанс промаха',
            description: 'Навык, определяющий вероятность промаха при совершении атаки. Чем выше уровень этого навыка, тем меньше шанс промахнуться.',
            branch: 'agility',
            type: 'percent',
            count: 0.1,
            selectedLevel: 0
        },
        {
            id: 'movementSpeed',
            title: 'Скорость передвижения',
            description: 'Навык влияет на скорость передвижения по локациям. Чем выше уровень этого навыка, тем быстрее персонаж может перемещаться.',
            branch: 'agility',
            type: 'score',
            count: 0.1,
            selectedLevel: 0
        },
        {
            id: 'attackSpeed',
            title: 'Скорость атаки',
            description: 'Навык, определяющий скорость выполнения атак персонажа. Чем выше уровень этого навыка, тем быстрее персонаж может совершать свои атаки.',
            branch: 'agility',
            type: 'score',
            count: 0.1,
            selectedLevel: 0
        },
        {
            id: 'maxHealthMultiplier',
            title: 'Множитель максимального количества ОЗ',
            description: 'Навык увеличивает максимальное количество очков здоровья персонажа.',
            branch: 'agility',
            type: 'multiplier',
            count: 0.3,
            selectedLevel: 0
        },
        {
            id: 'healthRegenerationMultiplier',
            title: 'Множитель регенерации ОЗ',
            description: 'Навык, определяющий скорость восстановления очков здоровья персонажа. Чем выше уровень этого навыка, тем быстрее персонаж может восстанавливать свои ОЗ.',
            branch: 'agility',
            type: 'multiplier',
            count: 0.5,
            selectedLevel: 0
        },
        {
            id: 'experienceMultiplier',
            title: 'Множитель получаемого опыта',
            description: 'Навык увеличивает количество опыта, получаемого за все действия. Благодаря данному навыку, игрок сможет быстрее повышать свой уровень и развивать свои навыки и способности.',
            branch: 'intelligence',
            type: 'multiplier',
            count: 0.15,
            selectedLevel: 0
        },
        {
            id: 'craftSpeed',
            title: 'Скорость создания предметов',
            description: 'Навык позволяет игроку ускорить процесс создания предметов. Скорость создания предметов становится более эффективной.',
            branch: 'intelligence',
            type: 'score',
            count: 0.1,
            selectedLevel: 0
        },
        {
            id: 'craftDoubleLootPercentChance',
            title: 'Шанс дополнительного количества предметов',
            description: 'Навык повышает вероятность получения дополнительного предмета при его крафте. За каждые 100% навыка игрок гарантированно получает на 1 предмет больше.',
            branch: 'intelligence',
            type: 'percent',
            count: 3,
            selectedLevel: 0
        },
        {
            id: 'buyPricePercent',
            title: 'Скидка при покупке',
            description: 'Навык позволяет игроку получать существенные скидки на покупку предметов у торговцев. Благодаря этому навыку, игрок может экономить игровую валюту и приобретать нужные предметы по более низким ценам.',
            branch: 'intelligence',
            type: 'percent',
            count: 0.5,
            selectedLevel: 0
        },
        {
            id: 'sellPricePercent',
            title: 'Наценка при продаже',
            description: 'Навык повышает ценность продаваемых предметов. Благодаря наценке, игрок может получать больше игровой валюты за проданные вещи или ресурсы, что способствует быстрому накоплению богатства.',
            branch: 'intelligence',
            type: 'percent',
            count: 1,
            selectedLevel: 0
        },
    ]

    const [skills, setSkills] = useState(baseSkills)

    const [infoSkill, setInfoSkill] = useState<ISkillInfo>(skills[0]);
    const [countPoints, setCountPoints] = useState(player.skillPoints);
    const [nextSkillLevelText, setNextSkillLevelText] = useState('');
    const [nextSkillLevelSpanText, setNextSkillLevelSpanText] = useState('');

    const onChangePoints = (point: number, idSkill: string, type: 'score' | 'multiplier' | 'percent' ) => {
        if(countPoints - point >= 0){
            let foundIndex = skills.findIndex(s => s.id === idSkill);
            let foundSkill = skills.find(s => s.id === idSkill)!;
            setInfoSkill(foundSkill);

            skills[foundIndex].selectedLevel = foundSkill.selectedLevel + point;

            setCountPoints(p => p - point);
            console.log(playerSkills[infoSkill.id])

            changeTexts();
    
        }
    }

    const onHoverSkillElement = (idSkill: string, type: 'score' | 'multiplier' | 'percent') => {
        const foundSkill = skills.find(s => s.id === idSkill)!; 
        setInfoSkill(foundSkill); 
    }

    const onClickCancelSkillsUp = () => {
        setSkills(skills.map(s => ({...s, selectedLevel: 0})));
        setCountPoints(player.skillPoints);
    }

    const onClickConfirmSkillsUp = () => {
        const skillsToAdd = skills.filter(s => s.selectedLevel);
        dispatch(addSkills(skillsToAdd.map(s => 
            ({countLevels: s.selectedLevel,
            countSkills: s.selectedLevel * playerSkills[s.id]['countScores'],
            id: s.id,
            type: s.type}))));
        setSkills(baseSkills);
        dispatch(decrementSkillPoints(player.skillPoints - countPoints));
        setCountPoints(player.skillPoints - (player.skillPoints - countPoints));
    }

    const changeTexts = () => {
        const currentScores = playerSkills[infoSkill.id]['currentScores'];
        const baseScore = playerSkills[infoSkill.id]['countScores'];

        switch (infoSkill.type) {
            case 'multiplier':
                setNextSkillLevelText(`Множитель: x${currentScores}`);
                setNextSkillLevelSpanText(` + x${(baseScore * (infoSkill.selectedLevel)).toFixed(2)} = x${(currentScores + baseScore * (infoSkill.selectedLevel)).toFixed(2)}`);
                break;
            case 'percent':
                setNextSkillLevelText(`Процент: ${currentScores}%`);
                if(infoSkill.id === 'missPercentChance'){
                    setNextSkillLevelSpanText(` - ${(baseScore * (infoSkill.selectedLevel)).toFixed(2)}% = ${(currentScores - baseScore * (infoSkill.selectedLevel)).toFixed(2)}%`)
                }
                else{
                    setNextSkillLevelSpanText(` + ${(baseScore * (infoSkill.selectedLevel)).toFixed(2)}% = ${(currentScores + baseScore * (infoSkill.selectedLevel)).toFixed(2)}%`);
                }
                break;
            case 'score':
                if(infoSkill.id === 'attackSpeed' ||
                infoSkill.id === 'movementSpeed' || 
                infoSkill.id === 'oreSpeedMining' || 
                infoSkill.id === 'treeSpeedMining' ||
                infoSkill.id === 'craftSpeed'){
                    setNextSkillLevelText(`Скорость: ${currentScores}s`);
                    setNextSkillLevelSpanText(` - ${(baseScore * (infoSkill.selectedLevel)).toFixed(2)}s = ${(currentScores - baseScore * (infoSkill.selectedLevel)).toFixed(2)}s`)
                }
                else if(infoSkill.id === 'capacity'){
                    setNextSkillLevelText(`Вес: ${currentScores}`);
                    setNextSkillLevelSpanText(` + ${(baseScore * (infoSkill.selectedLevel)).toFixed(2)} = ${(currentScores + baseScore * (infoSkill.selectedLevel)).toFixed(2)}`);
                }
                else{
                    setNextSkillLevelText(`Очки: ${currentScores}`);
                    setNextSkillLevelSpanText(` + ${(baseScore * (infoSkill.selectedLevel)).toFixed(2)} = ${(currentScores + baseScore * (infoSkill.selectedLevel)).toFixed(2)}`);
                }
                break;
        }               
    }

    useEffect(() => {
        changeTexts();
    },[infoSkill, PointsCount])
 
    

    return (  
        <Modal 
            $flexDirection='column'
            $isCloseButton
            $closeButtonFunction={() => $closeModal()}
            $gap='10px'
            $justifyContent='baseline' >
            <SkillsTitle>
                Навыки
            </SkillsTitle>
            <PointsCount>
                {
                    countPoints
                    ? `${countPoints} очков навыков!`
                    : 'Нет доступных очков навыков.'
                }
            </PointsCount>
            <SkillsBlock>
                <SkillsList>

                    <NameBranch>
                        Сила:
                    </NameBranch>
                    {
                        skills.map(s => 
                            s.branch === 'strength'
                            ? <SkillElement 
                                key={s.id}
                                id={s.id}
                                $title={s.title}
                                $level={playerSkills[s.id]['level']}
                                $description={s.description}
                                $count={s.count}
                                $type={s.type}
                                $availablePoint={countPoints}
                                $points={skills.find(sf => sf.id === s.id)!.selectedLevel}
                                $onChangePoints={(point: number) => onChangePoints(point, s.id, s.type)}
                                $onHoverSkillElement={() => onHoverSkillElement(s.id, s.type)} />
                            : null)
                    }

                    <NameBranch>
                        Ловкость:
                    </NameBranch>
                    {
                        skills.map(s =>
                            s.branch === 'agility'
                                ? <SkillElement
                                    key={s.id}
                                    id={s.id}
                                    $title={s.title}
                                    $level={playerSkills[s.id]['level']}
                                    $description={s.description}
                                    $count={s.count}
                                    $type={s.type}
                                    $availablePoint={countPoints}
                                    $points={skills.find(sf => sf.id === s.id)!.selectedLevel}
                                    $onChangePoints={(point: number) => onChangePoints(point, s.id, s.type)}
                                    $onHoverSkillElement={() => onHoverSkillElement(s.id, s.type)} />
                                : null)
                    }

                    <NameBranch>
                        Интеллект:
                    </NameBranch>
                    {
                        skills.map(s =>
                            s.branch === 'intelligence'
                                ? <SkillElement
                                    key={s.id}
                                    id={s.id}
                                    $title={s.title}
                                    $level={playerSkills[s.id]['level']}
                                    $description={s.description}
                                    $count={s.count}
                                    $type={s.type}
                                    $availablePoint={countPoints}
                                    $points={skills.find(sf => sf.id === s.id)!.selectedLevel}
                                    $onChangePoints={(point: number) => onChangePoints(point, s.id, s.type)}
                                    $onHoverSkillElement={() => onHoverSkillElement(s.id, s.type)} />
                                : null)
                    }

                </SkillsList>
                <Section $isBoxShadow $gap='15px'>
                    <DescriptionTitle>
                        Описание
                    </DescriptionTitle>
                    <SkillName>
                        {
                            infoSkill.title
                        }
                    </SkillName>
                    <SkillLevel>
                        УР: { playerSkills[infoSkill.id]['level'] } 
                        {
                            infoSkill.selectedLevel
                                ? <NextSkillLevelSpan>
                                    {' + '+infoSkill.selectedLevel}
                                </NextSkillLevelSpan>
                                : null
                        }

                    </SkillLevel>
                    <NextSkillLevel>
                        {nextSkillLevelText}
                        <NextSkillLevelSpan>
                            {
                                infoSkill.selectedLevel
                                    ? nextSkillLevelSpanText
                                    : null
                            }
                        </NextSkillLevelSpan>

                    </NextSkillLevel>
                    <Description>
                        {
                            infoSkill.description
                        }
                    </Description>
                    
                </Section>
            </SkillsBlock>
            {
                skills.findIndex(s => s.selectedLevel) !== -1
                    ? <ButtonsBlock>
                    <ButtonConfirm onClick={() => onClickConfirmSkillsUp()}>
                        ✔
                    </ButtonConfirm>
                    <ButtonCancel onClick={() => onClickCancelSkillsUp()}>
                        ✕
                    </ButtonCancel>
                </ButtonsBlock>
                    : null
            }
        </Modal>
    );
}

const NameBranch = styled.p`
    font-size: 20px;
`

const PointsCount = styled.p`
    font-size: 20px;
`

const ButtonsBlock = styled.div`
    display: flex;
    gap: 10px;
`

const ButtonCancel = styled.div`
    height: 50px;
    width: 50px;
    color: white;
    background-color: #9b4545;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    user-select: none;
    cursor: pointer;
    
    transition: 0.1s;

    &:hover{
        transform: scale(0.9);
    }
`

const ButtonConfirm = styled.div`
    height: 50px;
    width: 50px;
    color: white;
    background-color: #578a5b;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    user-select: none;
    cursor: pointer;
    
    transition: 0.1s;

    &:hover{
        transform: scale(0.9);
    }
`

const NextSkillLevelSpan = styled.span`
    color: #508d50;
    font-weight: bold;
`

const SkillLevel = styled.p`
    
`

const SkillName = styled.p`
    font-size: 25px;
`

const NextSkillLevel = styled.p`
    
`

const Description = styled.p`
    
`

const SkillsBlock = styled.div`
    display: flex;
    gap: 10px;
    max-height: 70%;
    width: 100%;    
`

const DescriptionTitle = styled.p`
    font-size: 20px;
`

const SkillsTitle = styled.p`
    font-size: 30px;
`

const SkillsList = styled.div`
    width: 100%;
    padding: 10px;
    height: auto;
    flex: 2;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: baseline;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;

    ${
        scrollBarX
    }
    
`

export default SkillsModal;