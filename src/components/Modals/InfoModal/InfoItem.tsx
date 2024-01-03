import { useState } from 'react';
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks/redux';
import { IChangeInfo } from '../../../models/IArea';
import { getItemBackground, getItemHoveredBackground } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';

interface IInfoItem {
    id: string
    $countMin: number;
    $countMax: number;
    $dropChance?: number;
    $changeWhatInfo: Function;
}

function InfoItem({id, $countMin, $countMax, $changeWhatInfo, $dropChance}:IInfoItem) {

    const {areaItems} = useAppSelector(state => state.userReducer);

    const item = areaItems.find(i => i.id === id)!;

    return ( 
        <Item 
        color={getItemBackground(item.rare)}
        $hoveredColor={getItemHoveredBackground(item.rare)} 
        onClick={() => $changeWhatInfo()}>
            <Avatar 
                $image={item.avatar}
                width={'80px'} 
                height={'80px'}  />
            <Info>
                <Title>
                    {
                        item.title
                    }
                </Title>
                <About>
                    <AboutText>
                        {
                            $dropChance
                                ? `Шанс дропа: ${$dropChance}%`
                                : null
                        }
                    </AboutText>
                    <AboutText>
                        {
                            $countMax !== $countMin
                                ? `Количество: ${$countMin} - ${$countMax}`
                                : `Количество: ${$countMax}`
                        }
                    </AboutText>
                </About>
            </Info>
        </Item>
     );
}

const About = styled.div`
    display: flex;
    flex-direction: column;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    transition: .1s;
`

const AboutText = styled.p`
    margin: 0;
`

const Title = styled.p`
    font-size: 20px;
    margin: 0;
    transition: .1s;
`

interface IItemProps {
    color: string;
    $hoveredColor: string;
}

const Item = styled.div<IItemProps>`
    
    width: 100%;
    min-height: 70px;
    height: auto;
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

export default InfoItem;