import styled from 'styled-components'
import ModalBackground from '../Other/ModalBackground';
import CircleButton from '../../Buttons/CircleButton';
import { useAppSelector } from '../../../hooks/redux';
import InfoItem from './InfoItem';
import { idText } from 'typescript';
import { IArea, IChangeInfo } from '../../../models/IArea';
import { useEffect, useState } from 'react';
import InfoArea from './InfoArea';
import { getAreaBackground, getAreaColor, getItemBackground, getRareColor } from '../../../styles/backgrounds';
import Avatar from '../../Avatar/Avatar';

interface IInfoModal {
    area: IArea;
    itemId: string;
    closeModal: Function;
    whatInfo: string;
    
    changeWhatInfo: (item: IChangeInfo) => void;
}

function InfoModal({area, closeModal, whatInfo, changeWhatInfo, itemId}:IInfoModal) {

    const {areaItems, areas} = useAppSelector(state => state.userReducer);

    const item = areaItems.find(i => i.id === itemId)!;
    console.log(areaItems.find(i => i.id === itemId), itemId)

    useEffect(() => {

    }, [item])

    return ( 
        <>
        <ModalBackground />
        {
            whatInfo === 'area'
            ? <Info color={getAreaBackground(area.color)}>
            
            <CircleButton symbol='✕' click={() => closeModal()} />
            <Section>
                <Avatar 
                    $image={area.avatar}
                    width={'10vw'} 
                    height={'10vw'} />
                <Title>
                    "{area.title}"
                </Title>
                <ColorText color={getAreaColor(area.color)}>
                    {
                        area.color === 'green'
                            ? 'Зеленная зона'
                            : area.color === 'yellow'
                            ? 'Желтая зона'
                            : 'Красная зона'
                    
                    }
                </ColorText>
                <Description>
                    {
                        area.description
                    }
                    
                </Description>
            </Section>
            
            <Section>
                <Title>
                    Местность
                </Title>
                <UpdateText>
                    Обновляется каждые {area.timeToRespawnAreaItems} минут
                </UpdateText>
                <List>
                    {
                        area.areaItems.map(i => 
                            <InfoItem 
                                id={i.id}
                                countMax={i.countMax}
                                countMin={i.countMin}
                                changeWhatInfo={() => changeWhatInfo({
                                    whatInfo: 'item',
                                    itemId: i.id
                                })} />)
                    }
                    
                </List>
            </Section>

            <Section>
                <Title>
                    Враги
                </Title>
                <UpdateText>
                    Обновляются каждые {area.timeToRespawnAreaEnemies} минут
                </UpdateText>
            </Section>
            
        </Info>
            : <Info color={getItemBackground(item.rare)}>
                <CircleButton symbol='✕' click={() => closeModal()} />
                
                <Section>
                    <Avatar 
                        $image={item.avatar}
                        width={'80px'} 
                        height={'80px'} />
                    <Title>
                        "{item.title}"
                    </Title>
                    <ColorText color={getRareColor(item.rare)}>
                    {
                        item.rare === 'common' 
                        ? "Обычное"
                        : item.rare === 'uncommon'
                        ? "Необычное"
                        : item.rare === 'rare'
                        ? "Редкое"
                        : item.rare === 'mythical'
                        ? "Мифическое"
                        : "Легендарное"
                    
                    }
                    </ColorText>
                    <Cost>
                        {item.cost}$
                    </Cost>
                    <Description>
                        {item.description}
                    </Description>
                </Section>

                <Section>
                    <Title>
                        Где найти
                    </Title>
                    <List>
                        {
                            areas.filter(a => a.areaItems.findIndex(i => i.id === itemId) !== -1)
                                .map(a => 
                                    <InfoArea 
                                        key={a.id} 
                                        areaId={a.id}
                                        countMax={a.areaItems.find(i => i.id === itemId)!.countMax}
                                        countMin={a.areaItems.find(i => i.id === itemId)!.countMin}
                                        changeWhatInfo={() => changeWhatInfo({
                                            whatInfo: 'area',
                                            area: a
                                        })} />)
                        }
                    </List>
                </Section>

                <Section>
                    <Title> 
                        Используется
                    </Title>
                </Section>
            </Info>
        }
        </>
     );
}

const Cost = styled.p`
    color: black;
    width: min-content;
    background-color: #dddddd;
    border-radius: 5px;
    padding: 5px;
    margin: 0;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

interface IColorText {
    color: string;
}

const ColorText = styled.p<IColorText>`
    font-size: 16px;
    margin: 0;
    color: ${props => props.color};
`

const UpdateText = styled.p`
    font-size: 16px;
    margin: 0;
`

const Section = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 10px;

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

const Description = styled.p`
    font-size: 18px;
    margin: 0;
`

const Title = styled.p`
    font-size: 30px;
    margin: 0;
`

interface IInfoProps{
    color: string;
}

const Info = styled.div<IInfoProps>`
    z-index: 9999;
    position: absolute;
    width: 70vw;
    height: 80vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: white;
    box-shadow: 0 0 10px #00000050;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    gap: 20px;

    background: ${p => p.color};
`

export default InfoModal;