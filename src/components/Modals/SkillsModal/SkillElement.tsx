import { useState } from 'react';
import styled from 'styled-components'

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
                <Name>
                    {
                        $title
                    }
                </Name>
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
    display: flex;
    gap: 10px;
    height: 100%;
`

const Button = styled.div`
    height: 40px;
    width: 40px;
    color: white;
    background-color: #578a5b;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
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
    gap: 20px;
`

const Name = styled.p`
    font-size: 20px;
`

interface ILevelProps{
    $selectedCount: number;
}

const Level = styled.div<ILevelProps>`
    position: relative;
    height: 100%;
    width: 50px;
    object-fit: contain;
    color: #000000;
    border-right: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;

    ${
        p => p.$selectedCount 
        && `&::after{
            content: '+${ p.$selectedCount }';
            position: absolute;
            top: -10%;
            right: -30%;
            font-size: 15px;
            font-weight: bold;
            padding: 5px;
            border-radius: 50%;
            color: black;
            background-color: #589b5d;
            box-shadow: 0 0 5px black;
        }`
    }
`

const Skill = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 50px;
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