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
            description: '',
            branch: 'strength',
            type: 'multiplier',
            count: 0.15,
            selectedLevel: 0
        },
        {
            id: 'critDamageMultiplier',
            title: 'Множитель критического урона',
            description: '',
            branch: 'strength',
            type: 'multiplier',
            count: 0.2,
            selectedLevel: 0
        },
        {
            id: 'critChance',
            title: 'Шанс критического урона',
            description: '',
            branch: 'strength',
            type: 'percent',
            count: 0.5,
            selectedLevel: 0
        },
        {
            id: 'oreSpeedMiningMultiplier',
            title: 'Множитель скорости добычи руды',
            description: '',
            branch: 'strength',
            type: 'multiplier',
            count: 0.01,
            selectedLevel: 0
        },
        {
            id: 'oreDoubleLootPercentChance',
            title: 'Шанс дополнительного количества руды',
            description: '',
            branch: 'strength',
            type: 'percent',
            count: 3,
            selectedLevel: 0
        },
        {
            id: 'treeSpeedMiningMultiplier',
            title: 'Множитель скорости добычи деревьев',
            description: '',
            branch: 'strength',
            type: 'multiplier',
            count: 0.01,
            selectedLevel: 0
        },
        {
            id: 'treeDoubleLootPercentChance',
            title: 'Шанс дополнительного количества дерева',
            description: '',
            branch: 'strength',
            type: 'percent',
            count: 3,
            selectedLevel: 0
        },
        {
            id: 'capacity',
            title: 'Грузоподъемность',
            description: '',
            branch: 'strength',
            type: 'score',
            count: 20,
            selectedLevel: 0
        },
        {
            id: 'blockingChancePercent',
            title: 'Шанс блокирования',
            description: '',
            branch: 'agility',
            type: 'percent',
            count: 0.25,
            selectedLevel: 0
        },
        {
            id: 'blockingMultiplier',
            title: 'Множитель блокирования',
            description: '',
            branch: 'agility',
            type: 'multiplier',
            count: 0.05,
            selectedLevel: 0
        },
        {
            id: 'dodgePercentChance',
            title: 'Шанс уклонения',
            description: '',
            branch: 'agility',
            type: 'percent',
            count: 0.1,
            selectedLevel: 0
        },
        {
            id: 'missPercentChance',
            title: 'Шанс промаха',
            description: '',
            branch: 'agility',
            type: 'percent',
            count: 0.1,
            selectedLevel: 0
        },
        {
            id: 'movementSpeed',
            title: 'Скорость передвижения',
            description: '',
            branch: 'agility',
            type: 'score',
            count: 0.1,
            selectedLevel: 0
        },
        {
            id: 'attackSpeed',
            title: 'Скорость атаки',
            description: '',
            branch: 'agility',
            type: 'score',
            count: 0.1,
            selectedLevel: 0
        },
        {
            id: 'maxHealthMultiplier',
            title: 'Множитель максимального количества ОЗ',
            description: '',
            branch: 'agility',
            type: 'multiplier',
            count: 0.3,
            selectedLevel: 0
        },
        {
            id: 'healthRegenerationMultiplier',
            title: 'Множитель регенерации ОЗ',
            description: '',
            branch: 'agility',
            type: 'multiplier',
            count: 0.5,
            selectedLevel: 0
        },
        {
            id: 'experienceMultiplier',
            title: 'Множитель получаемого опыта',
            description: '',
            branch: 'intelligence',
            type: 'multiplier',
            count: 0.15,
            selectedLevel: 0
        },
        {
            id: 'craftSpeedMultiplier',
            title: 'Множитель скорости создания предметов',
            description: '',
            branch: 'intelligence',
            type: 'multiplier',
            count: 0.01,
            selectedLevel: 0
        },
        {
            id: 'craftDoubleLootPercentChance',
            title: 'Шанс дополнительного количества предметов',
            description: '',
            branch: 'intelligence',
            type: 'percent',
            count: 3,
            selectedLevel: 0
        },
        {
            id: 'buyPricePercent',
            title: 'Скидка при покупке',
            description: '',
            branch: 'intelligence',
            type: 'percent',
            count: 0.5,
            selectedLevel: 0
        },
        {
            id: 'sellPricePercent',
            title: 'Наценка при продаже',
            description: '',
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
        setNextSkillLevelText(
            infoSkill.type === 'multiplier'
                ? `Множитель: x${playerSkills[infoSkill.id]['currentScores']} `
                : infoSkill.type === 'percent'
                    ? `Процент: ${playerSkills[infoSkill.id]['currentScores']}% `
                    : `Очки: ${playerSkills[infoSkill.id]['currentScores']}  `);

        setNextSkillLevelSpanText(
            infoSkill.type === 'multiplier'
                ? `+ x${(infoSkill.count * (infoSkill.selectedLevel)).toFixed(2)} = x${(playerSkills[infoSkill.id]['currentScores'] + infoSkill.count * (infoSkill.selectedLevel)).toFixed(2)}`
                : infoSkill.type === 'percent'
                    ? `+ ${(infoSkill.count * (infoSkill.selectedLevel)).toFixed(2)}% = ${(playerSkills[infoSkill.id]['currentScores'] + infoSkill.count * (infoSkill.selectedLevel)).toFixed(2)}%`
                    : `+ ${(infoSkill.count * (infoSkill.selectedLevel)).toFixed(2)} = ${(playerSkills[infoSkill.id]['currentScores'] + infoSkill.count * (infoSkill.selectedLevel)).toFixed(2)}`);
    }

    useEffect(() => {
        changeTexts();
    },[infoSkill, PointsCount])
 
    

    return (  
        <Modal 
            $flexDirection='column'
            $isCloseButton
            $closeButtonFunction={() => $closeModal()}
            $gap='10px' >
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