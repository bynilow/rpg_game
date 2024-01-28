import { useState } from 'react';
import styled from 'styled-components'
import Title from '../../Title/Title';

interface ISkillElementProps {
    id: string;
    $title: string;
    $description: string;
    $type: 'score' | 'multiplier' | 'percent';
    $count: number;
    $level: number;
    $availablePoint: number;
    $onChangePoints: Function;
    $points: number;
    $onHoverSkillElement: Function;
}

function SkillElement({ 
    id,
    $title,
    $description,
    $type,
    $count,
    $availablePoint,
    $onChangePoints,
    $level,
    $points,
    $onHoverSkillElement}: ISkillElementProps) {


    return (  
        <Skill onMouseEnter={() => $onHoverSkillElement()} >
            <SkillInfoBlock>
                <Level $selectedCount={$points}>
                    {
                        $level
                    }
                </Level>
                <Title $size='1.5rem'>
                    {
                        $title
                    }
                </Title>
            </SkillInfoBlock>
            <ButtonsBlock>
                {
                    $points
                    ? <Button onClick={() => $onChangePoints(-1)}>
                        ❮
                    </Button>
                    : null
                }
                {
                    $availablePoint
                    ? <Button onClick={() => $onChangePoints(+1)}>
                        ❯
                    </Button>
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
    margin: 5px;
    display: flex;
    gap: 10px;
    height: 100%;

    
`

const Button = styled.div`
    height: 2.5rem;
    width: 2.5rem;
    color: white;
    background-color: #578a5b;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    user-select: none;
    cursor: pointer;
    
    transition: 0.1s;

    &:hover{
        transform: scale(0.9);
    }
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
    min-width: 3rem;
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
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 5px black;
    cursor: pointer;
    transition: 0.1s;

    &:hover{
        transform: scale(1.01);
    }
`

export default SkillElement;