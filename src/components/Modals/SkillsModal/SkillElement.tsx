import styled from 'styled-components';
import SquareButton from '../../Buttons/SquareButton';
import Title from '../../Title/Title';
import { useState } from 'react';

interface ISkillElementProps {
    id: string;
    $title: string;
    $description: string;
    $type: 'score' | 'multiplier' | 'percent';
    $level: number;
    $availablePoint: number;
    $onClickAddLevel: Function;
    $onClickRemoveLevel: Function;
    $onHoverSkillElement: Function;
}

function SkillElement({ 
    id,
    $title,
    $description,
    $type,
    $availablePoint,
    $onClickAddLevel,
    $onClickRemoveLevel,
    $level,
    $onHoverSkillElement}: ISkillElementProps) {

    const [selectedLevels, setSelectedLevels] = useState(0); 

    const onClickAddLevel = () => {
        setSelectedLevels(pv => pv + 1);
        $onClickAddLevel();
    }

    const onClickRemoveLevel = () => {
        setSelectedLevels(pv => pv - 1);
        $onClickRemoveLevel();
    }

    return (  
        <Skill onMouseEnter={() => $onHoverSkillElement()} >
            <SkillInfoBlock>
                <Level $selectedCount={selectedLevels}>
                    {
                        $level
                    }
                </Level>
                <Title $size='1rem'>
                    {
                        $title
                    }
                </Title>
            </SkillInfoBlock>
            <ButtonsBlock>
                {
                    selectedLevels
                    ? <SquareButton 
                        $width='4rem'
                        $onClick={() => onClickRemoveLevel()}>
                        ❮
                    </SquareButton>
                    : null
                }
                {
                    $availablePoint
                    ? <SquareButton 
                        $width='4rem'
                        $onClick={() => onClickAddLevel()}>
                        ❯
                    </SquareButton>
                    : null
                }
            </ButtonsBlock>
        </Skill>
    );
}

const ButtonsBlock = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
`

const SkillInfoBlock = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    width: 70%;
    gap: 1.3em;
`

interface ILevelProps{
    $selectedCount: number;
}

const Level = styled.div<ILevelProps>`
    position: relative;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: contain;
    color: #000000;
    border-right: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;

    ${
        p => p.$selectedCount 
        && `&::after{
            content: '+${ p.$selectedCount }';
            position: absolute;
            top: -10%;
            right: -30%;
            font-size: 1rem;
            line-height: 0;
            font-weight: bold;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-width: 2rem;
            min-height: 2rem;
            border-radius: 50%;
            color: #ffffff;
            background-color: #589b5d;
        }`
    }
`

const Skill = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 5rem;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 5px black;
    background-color: white;
    cursor: pointer;
    transition: 0.1s;

    &:hover{
        transform: scale(1.01);
    }

`

export default SkillElement;