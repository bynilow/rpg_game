import styled, { keyframes } from 'styled-components'
import ModalBackground from '../Other/ModalBackground';
import CircleButton from '../../Buttons/CircleButton';
import { useAppSelector } from '../../../hooks/redux';
import { idText } from 'typescript';
import { IArea, IChangeInfo } from '../../../models/IArea';
import { useEffect, useState } from 'react';
import { getAreaBackground, getAreaColor, getItemBackground, getRareColor } from '../../../styles/backgrounds';
import WinCombatItem from './WinCombatItem';

interface IWinCombatModal {
    items: {
        id: string;
        count: number;
    }[]
}

function WinCombatModal({items}: IWinCombatModal) {

    return (
        <>
            <ModalBackground enableStartAnim={true} />
            <WinCombat>
                <TextBlock>
                    <Title>
                        Победа!
                    </Title>
                    <ItemsText>
                        Полученные предметы:
                    </ItemsText>
                </TextBlock>
                <List>
                    {
                        items.map(i => <WinCombatItem 
                            key={i.id}
                            count={i.count} 
                            id={i.id} />)
                    }
                </List>
                <Button>
                    ✔
                </Button>
            </WinCombat>

        </>
    );
}

const TextBlock = styled.div`
    text-align: center;
`

const EmptyItem = styled.div`
    width: 170px;
    height: 250px;
`

const Button = styled.div`
    font-size: 30px;
    color: white;
    border-radius: 50%;
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 20px;
    box-sizing: border-box;
    background: #308d30;
    transition: .1s;
    user-select: none;
    position: fixed;
    bottom: 10%;
    cursor: pointer;

    &:hover{
        transform: scale(0.95);
    }
`

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    height: 100%;
    padding: 20px;
    overflow-y: auto;

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

const ItemsText = styled.p`
    font-size: 20px;
    margin: 0;
`

const Title = styled.p`
    font-size: 30px;
    margin: 0;
`

const startAnim = keyframes`
    0%{
        transform: scale(0) rotate(-60deg);
    }
    70%{
        transform: scale(1.05) rotate(5deg);
    }
    100%{
        transform: scale(1) rotate(0deg);
    }
`

const WinCombat = styled.div`
    z-index: 9999;
    position: absolute;
    width: 70vw;
    height: 80vh;
    padding: 20px;
    box-sizing: border-box;
    top: 10%;
    background-color: white;
    box-shadow: 0 0 10px #00000050;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    background: white;

    animation: ${startAnim} 1s ease;
    animation-fill-mode: forwards;

    
`

export default WinCombatModal;