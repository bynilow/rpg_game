import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ISkillUp } from '../../../models/IPlayer';
import { addSkillsAC, decrementSkillPointsAC } from '../../../store/reducers/ActionCreators';
import { palette } from '../../../styles/palette';
import { scrollBarX } from '../../../styles/scrollbars';
import SquareButton from '../../Buttons/SquareButton';
import Section from '../../Section/Section';
import Title from '../../Title/Title';
import Modal from '../Modal';
import SkillElement from './SkillElement';
import FullScreenLoader from '../../Loader/Loader';
import Loader from '../../Loader/Loader';

interface ISkillsModalProps {
    $closeModal: Function;
}

function SkillsModal({$closeModal}: ISkillsModalProps) {

    const {playerSkills, player, isSkillsLoading} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [toggleClearSkills, setToggleClearSkills] = useState(false);
    const [availablePoints, setAvailablePoints] = useState(player.skillPoints);
    const [selectedSkills, setSelectedSkills] = useState<ISkillUp[]>([]);

    const onClickConfirm = async () => {
        if(!isSkillsLoading){
            const pointsUsed = player.skillPoints - availablePoints;
            dispatch(decrementSkillPointsAC(pointsUsed));
            dispatch(addSkillsAC(selectedSkills));
        }
    }

    const onClickCancel = () => {
        setToggleClearSkills(pv => !pv);
        setSelectedSkills([]);
        setAvailablePoints(player.skillPoints);
    }

    const onAddSkill = (skillId: string) => {
        setAvailablePoints(pv => pv - 1);
        let skills = selectedSkills;
        const foundSkillIndex = skills.findIndex(skill => skill.id === skillId);
        if(foundSkillIndex !== -1){
            skills[foundSkillIndex].countLevels += 1;
            setSelectedSkills(skills)
        } else {
            skills.push({id: skillId, countLevels: 1});
            setSelectedSkills(skills);
        }
        console.log(skills)
    }

    const onRemoveSkill = (skillId: string) => {
        setAvailablePoints(pv => pv + 1);
        let skills = selectedSkills;
        const foundSkillIndex = skills.findIndex(skill => skill.id === skillId)!;
        console.log(skills[foundSkillIndex].countLevels - 1)
        if(skills[foundSkillIndex].countLevels - 1 >= 1){
            skills[foundSkillIndex].countLevels -= 1;
            console.log('true', skills)
            setSelectedSkills(skills)
        } else {
            skills = skills.filter(skill => skill.id !== skillId);
            setSelectedSkills(skills);
        }
        console.log(skills)
    }

    useEffect(() => {
        onClickCancel();
    }, [player.skillPoints])

    return (  
        
        <Modal 
            $flexDirection='column'
            $isCloseButton
            $closeButtonFunction={() => $closeModal()}
            $size='large'
            $gap='10px'
            $justifyContent='baseline' >
            {
                isSkillsLoading &&
                    <Loader />
            }
            <Title $size='2rem'>
                Навыки
            </Title>
            <PointsCount>
                {
                    availablePoints
                        ? `${availablePoints} очков навыков!`
                        : 'Нет доступных очков навыков.'
                }
            </PointsCount>
            <SkillsBlock>
                <SkillsList key={+toggleClearSkills}>
                    
                    {
                        [...Object.entries(playerSkills)].map(skill =>
                            <SkillElement
                                key={skill[1].id}
                                id={skill[1].id}
                                $title={skill[1].title}
                                $level={skill[1].level}
                                $description={skill[1].description}
                                $baseCount={skill[1].baseCount}
                                $currentScores={skill[1].currentScores}
                                $givesScores={skill[1].givesScores}
                                $type={skill[1].type}
                                $availablePoint={availablePoints}
                                $onClickAddLevel={() => onAddSkill(skill[0])}
                                $onClickRemoveLevel={() => onRemoveSkill(skill[0])}
                                $onHoverSkillElement={() => {}} /> )
                    }

                </SkillsList>
            </SkillsBlock>
            {
                player.skillPoints !== availablePoints
                    ? <ButtonsBlock>
                        <SquareButton 
                            $isDisabled={isSkillsLoading}
                            $fontSize='3rem'
                            $color={palette.greenColor}
                            $onClick={() => onClickConfirm()} >
                            {palette.checkMark}
                        </SquareButton>
                        <SquareButton 
                            $isDisabled={isSkillsLoading}
                            $fontSize='3rem'
                            $color={palette.redColor}
                            $onClick={() => onClickCancel()} >
                            {palette.cancelMark}
                        </SquareButton>
                    </ButtonsBlock>
                    : null
            }
        </Modal>
    );
}

const NameBranch = styled.p`
    font-size: 2rem;
`

const PointsCount = styled.p`
    font-size: 1.3rem;
`

const ButtonsBlock = styled.div`
    display: flex;
    gap: 10px;
`

const NextSkillLevelSpan = styled.span`
    color: #508d50;
    font-weight: bold;
`

const SkillLevel = styled.p`
    font-size: 1rem;
`

const SkillName = styled.p`
    font-size: 1.5rem;
`

const NextSkillLevel = styled.p`
    font-size: 1rem;
`

const Description = styled.p`
    font-size: 1rem;

    @media (max-width: 426px) {
        display: none;
    }
`

const SkillsBlock = styled.div`
    display: flex;
    gap: 10px;
    max-height: 75%;
    width: 100%;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const DescriptionTitle = styled.p`
    font-size: 1.3rem;
`

const SkillsList = styled.div`
    position: relative;
    width: 100%;
    min-width: 50%;
    padding: 10px;
    height: auto;
    flex: 2;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: baseline;
    flex-direction: column;
    gap: 1.3rem;
    overflow-y: scroll;
    overflow-x: hidden;

    ${scrollBarX}
`

export default SkillsModal;