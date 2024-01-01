import { useState } from 'react';
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { getItemBackground, getItemHoveredBackground } from '../../../styles/backgrounds';

interface IInfoItem {
    id: string
    countMin: number;
    countMax: number;
    changeWhatInfo: Function;
}

function InfoItem({id, countMin, countMax, changeWhatInfo}:IInfoItem) {

    const {areaItems} = useAppSelector(state => state.userReducer);

    const item = areaItems.find(i => i.id === id)!;

    return ( 
        <Item 
        color={getItemBackground(item.rare)}
        hoveredColor={getItemHoveredBackground(item.rare)} 
        onClick={() => changeWhatInfo()}>
            <Avatar alt='' src={require('../../../'+item.avatar)} />
            <Info>
                <Title>
                    {
                        item.title
                    }
                </Title>
                <Count>
                    {
                        countMax !== countMin
                            ? `Количество: ${countMin} - ${countMax}`
                            : `Количество: ${countMax}`
                    }
                </Count>
            </Info>
        </Item>
     );
}

const Info = styled.div`
    display: flex;
    flex-direction: column;
    transition: .1s;
`

const Count = styled.p`
    margin: 0;
`

const Title = styled.p`
    font-size: 20px;
    margin: 0;
    transition: .1s;
`

const Avatar = styled.img`
    width: 80px;
    height: 80px;

    transition: .3s;
    box-sizing: border-box;
`

interface IItemProps {
    color: string;
    hoveredColor: string;
}

const Item = styled.div<IItemProps>`
    
    width: 100%;
    height: 100px;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    transition: .1s;

    background: ${p => p.color};

    box-sizing: border-box;

    &:hover ${Info} {
        padding: 0 10px;
    }

    &:hover{
        background: ${p => p.hoveredColor}
    }

`

export default InfoItem;