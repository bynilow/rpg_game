import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addSkillsAC, decrementSkillPoints } from '../../../store/reducers/ActionCreators';
import { palette } from '../../../styles/palette';
import { scrollBarX } from '../../../styles/scrollbars';
import SquareButton from '../../Buttons/SquareButton';
import Section from '../../Section/Section';
import Title from '../../Title/Title';
import Modal from '../Modal';
import SkillElement from './SkillElement';

interface ISkillsModalProps {
    $closeModal: Function;
}

function SkillsModal({$closeModal}: ISkillsModalProps) {

    const {playerSkills, player} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [toggleClearSkills, setToggleClearSkills] = useState(false);
    const [availablePoints, setAvailablePoints] = useState(player.skillPoints);

    const onClickConfirm = () => {

    }

    const onClickCancel = () => {
        setToggleClearSkills(pv => !pv);
        setAvailablePoints(player.skillPoints);
    }

    return (  
        <Modal 
            $flexDirection='column'
            $isCloseButton
            $closeButtonFunction={() => $closeModal()}
            $size='large'
            $gap='10px'
            $justifyContent='baseline' >
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
                                $type={skill[1].type}
                                $availablePoint={availablePoints}
                                $onClickAddLevel={() => setAvailablePoints(pv => pv - 1)}
                                $onClickRemoveLevel={() => setAvailablePoints(pv => pv + 1)}
                                $onHoverSkillElement={() => {}} /> )
                    }

                </SkillsList>
                <Section 
                    $gap='15px'>
                    <Title $size='1.3rem'>
                        Описание
                    </Title>
                    {/* <SkillName>
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
                    </Description> */}
                    
                </Section>
            </SkillsBlock>
            {
                true
                    ? <ButtonsBlock>
                    <SquareButton 
                        $fontSize='3rem'
                        $color={palette.greenColor}
                        $onClick={() => onClickConfirm()}>
                        {palette.checkMark}
                    </SquareButton>
                    <SquareButton 
                        $fontSize='3rem'
                        $color={palette.redColor}
                        $onClick={() => onClickCancel()}>
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