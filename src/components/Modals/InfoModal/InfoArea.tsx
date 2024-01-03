import { useState } from 'react';
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/redux';
import { IArea, IChangeInfo } from '../../../models/IArea';
import { getAreaBackground, getHoveredAreaBackground } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';

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
            $hoveredColor={getHoveredAreaBackground(area.color)} 
            onClick={() => changeWhatInfo()}>
            <Avatar 
                $image={area.avatar}
                width={'80px'} 
                height={'80px'} />
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
    justify-content: space-between;
    height: 100%;
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

interface IAreaProps {
    color: string;
    $hoveredColor: string;
}

const Area = styled.div<IAreaProps>`
    
    width: 100%;
    height: 90px;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    transition: .1s;

    background: ${p => p.color};

    &:hover{
        background: ${p => p.$hoveredColor};
        transform: scale(0.97);
    }

`

export default InfoArea;