import styled from 'styled-components';
import SquareButton from '../../Buttons/SquareButton';
import Title from '../../Title/Title';
import { useEffect, useState } from 'react';
import { palette } from '../../../styles/palette';

interface ISkillElementProps {
    id: string;
    $title: string;
    $description: string;
    $type: string;
    $level: number;
    $baseCount: number;
    $currentScores: number;
    $givesScores: number;
    $availablePoint: number;
    $onClickAddLevel: Function;
    $onClickRemoveLevel: Function;
    $onHoverSkillElement: Function;

}

function SkillElement({ 
    id,
    $title,
    $description,
    $baseCount,
    $currentScores,
    $givesScores,
    $type,
    $availablePoint,
    $onClickAddLevel,
    $onClickRemoveLevel,
    $level,
    $onHoverSkillElement}: ISkillElementProps) {

    const [selectedLevels, setSelectedLevels] = useState(0); 
    const [isOpened, setIsOpened] = useState(false);

    const onClickAddLevel = () => {
        setSelectedLevels(pv => pv + 1);
        $onClickAddLevel();
    }

    const onClickRemoveLevel = () => {
        setSelectedLevels(pv => pv - 1);
        $onClickRemoveLevel();
    }

    const currentScores = ($baseCount + $givesScores * $level-1).toFixed(1);
    const [nextScores, setNextScores] = useState(($givesScores * selectedLevels + Number(currentScores)).toFixed(1));

    useEffect(() => {
        setNextScores(($givesScores * selectedLevels + Number(currentScores)).toFixed(1));
    }, [selectedLevels])

    return (  
        <Skill onClick={() => setIsOpened(pv => !pv)}>
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
                <ButtonsBlock>
                    {
                        selectedLevels
                            ? <SquareButton
                                $width='auto'
                                $onClick={() => onClickRemoveLevel()}>
                                ❮
                            </SquareButton>
                            : null
                    }
                    {
                        $availablePoint
                            ? <SquareButton
                                $width='auto'
                                $onClick={() => onClickAddLevel()}>
                                ❯
                            </SquareButton>
                            : null
                    }
                </ButtonsBlock>
            </SkillInfoBlock>
            <Description $isOpened={isOpened}>
                <Char>
                    
                    {
                        $type === ''
                            ? <CurrentScores>
                                {currentScores} + <GivesScores>{$givesScores} {selectedLevels ? '= '+nextScores : ''}</GivesScores> 
                            </CurrentScores>
                        : $type === 'x'
                            ? <CurrentScores>
                                x{currentScores} + <GivesScores>x{$givesScores} {selectedLevels ? '= x'+nextScores : ''} </GivesScores>
                            </CurrentScores>
                        : $type === '%'
                            ? <CurrentScores>
                                {currentScores}% + <GivesScores>{$givesScores}% {selectedLevels ? '= '+nextScores+'%' : ''} </GivesScores>
                                </CurrentScores>
                        : $type === 's'
                            ? <CurrentScores>
                                {currentScores}s - <GivesScores>{$givesScores}s {selectedLevels ? '= '+nextScores+'s' : ''} </GivesScores>
                            </CurrentScores>
                            : <CurrentScores>
                                {currentScores}kg + <GivesScores>{$givesScores}kg = {selectedLevels ? '= '+nextScores+'kg' : ''} </GivesScores>
                            </CurrentScores>
                    }
                </Char>
                {$description}
            </Description>
            
        </Skill>
    );
}

const GivesScores = styled.span`
    font-size: 2rem;
    color: ${palette.greenColor};
    font-weight: bold;
`

const CurrentScores = styled.p`
    font-size: 1.5rem;
    color: black;
`

const Char = styled.p`

`

interface IDescriptionProps{
    $isOpened: boolean;
}

const Description = styled.div<IDescriptionProps>`
    width: 100%;
    max-height: ${p => p.$isOpened ? '500px': '0px'};
    visibility: ${p => p.$isOpened ? 'visible' : 'hidden'};
    color: ${palette.darkGray};
    transition: 0.3s;
`

const ButtonsBlock = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    margin-right: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
`

const SkillInfoBlock = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    width: 100%;
    gap: 15px;
`

interface ILevelProps{
    $selectedCount: number;
}

const Level = styled.div<ILevelProps>`
    position: relative;
    height: auto;
    object-fit: contain;
    color: #000000;
    width: 5%;
    aspect-ratio: 1/1;
    padding-right: 4px;
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
    flex-direction: column;
    justify-content: space-between;
    gap: 0;
    align-items: start;
    width: 100%;
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