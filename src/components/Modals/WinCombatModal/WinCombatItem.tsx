import { useState } from 'react';
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { getItemBackground, getItemHoveredBackground } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';
import Title from '../../Title/Title';

interface IWinCombatItem {
    id: string
    count: number;
}

function WinCombatItem({id, count}:IWinCombatItem) {

    const {areaItems} = useAppSelector(state => state.userReducer);

    const item = areaItems.find(i => i.id === id)!;

    return ( 
        <Item 
            color={getItemBackground(item.rare)}
            $hoveredColor={getItemHoveredBackground(item.rare)}>
            <Avatar 
                $image={item.avatar}
                width={'100px'} />
            <Info>
                <Title $size='1.5rem'>
                    {
                        item.title
                    } 
                </Title>
                <Count>
                    Количество: {count}
                </Count>
            </Info>
        </Item>
     );
}

const Info = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: .1s;
`

const Count = styled.p`
    margin: 0;
`

interface IItemProps {
    color: string;
    $hoveredColor: string;
}

const Item = styled.div<IItemProps>`
    
    width: 12rem;
    height: 16rem;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    transition: .1s;

    background: ${p => p.color};

    &:hover ${Info} {
        padding: 0 10px;
    }

    &:hover{
        background: ${p => p.$hoveredColor};
    }

`

export default WinCombatItem;