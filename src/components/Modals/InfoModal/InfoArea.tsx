import { useState } from 'react';
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/redux';
import { IArea, IChangeInfo } from '../../../models/IArea';
import { getAreaBackground, getHoveredAreaBackground } from '../../../styles/backgrounds';

interface IInfoArea {
    areaId: string;
    countMin: number;
    countMax: number;
    changeWhatInfo: Function;
}

function InfoArea({areaId, countMin, countMax, changeWhatInfo}:IInfoArea) {

    const {areas} = useAppSelector(state => state.userReducer);

    const area = areas.find(i => i.id === areaId)!;

    return ( 
        <Area 
            color={getAreaBackground(area.color)}
            hoveredColor={getHoveredAreaBackground(area.color)} 
            onClick={() => changeWhatInfo()}>
            <Avatar alt='' src={require('../../../'+area.avatar)} />
            <Info>
                <Title>
                    {
                        area.title
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
        </Area>
     );
}

const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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

interface IAreaProps {
    color: string;
    hoveredColor: string;
}

const Area = styled.div<IAreaProps>`
    
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

export default InfoArea;