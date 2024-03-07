import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStats } from '../../../functions/Stats';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addItemsToInventoryAC } from '../../../store/reducers/ActionCreators';
import { getItemBackground } from '../../../styles/backgrounds';
import { scrollBarX } from '../../../styles/scrollbars';
import Avatar from '../../Avatar/Avatar';
import Title from '../../Title/Title';
import Modal from '../Modal';
import SelectEquipmentModal from '../SelectEquipmentModal/SelectEquipmentModal';
import { Items } from '../../../data/ItemsData';

interface ICharacterModal {
    $closeModal: Function;
}

function CharacterModal({ $closeModal }: ICharacterModal) {

    const { playerSkills, player, inventory, buffs } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();

    const [whatEquipmentOpen, setWhatEquipmentOpen] = useState('');
    const [equipmentCount, setEquipmentCount] = useState({
        head: inventory.filter(i => i.item.subType === 'helmet').length,
        chest: inventory.filter(i => i.item.subType === 'chest').length,
        foot: inventory.filter(i => i.item.subType === 'foot').length,
        weapon: inventory.filter(i => i.item.type === 'weapon').length,
        axe: inventory.filter(i => i.item.subType === 'axe').length,
        pickaxe: inventory.filter(i => i.item.subType === 'pickaxe').length
    });

    const onClickAddItems = () => {
        dispatch(addItemsToInventoryAC([{
            ...Items.find(i => i.id === 'pickaxe_legendary')!,
            count: 1
        }]))
    }

    const [equippedItems, setEquippedItems] = useState({
        head: inventory.filter(i => i.item.subType === 'helmet').find(i => i.isEquipped),
        chest: inventory.filter(i => i.item.subType === 'chest').find(i => i.isEquipped),
        foot: inventory.filter(i => i.item.subType === 'foot').find(i => i.isEquipped),
        weapon: inventory.filter(i => i.item.type === 'weapon').find(i => i.isEquipped),
        axe: inventory.filter(i => i.item.subType === 'axe').find(i => i.isEquipped),
        pickaxe: inventory.filter(i => i.item.subType === 'pickaxe').find(i => i.isEquipped)
    })

    const [stats, setStats] = useState(getStats(playerSkills, player, buffs));

    useEffect(() => {
        setEquippedItems({
            head: inventory.filter(i => i.item.subType === 'helmet').find(i => i.isEquipped),
            chest: inventory.filter(i => i.item.subType === 'chest').find(i => i.isEquipped),
            foot: inventory.filter(i => i.item.subType === 'foot').find(i => i.isEquipped),
            weapon: inventory.filter(i => i.item.type === 'weapon').find(i => i.isEquipped),
            axe: inventory.filter(i => i.item.subType === 'axe').find(i => i.isEquipped),
            pickaxe: inventory.filter(i => i.item.subType === 'pickaxe').find(i => i.isEquipped)
        });
        setEquipmentCount({
            head: inventory.filter(i => i.item.subType === 'helmet').length,
            chest: inventory.filter(i => i.item.subType === 'chest').length,
            foot: inventory.filter(i => i.item.subType === 'foot').length,
            weapon: inventory.filter(i => i.item.type === 'weapon').length,
            axe: inventory.filter(i => i.item.subType === 'axe').length,
            pickaxe: inventory.filter(i => i.item.subType === 'pickaxe').length
        });
        setStats(getStats(playerSkills, player, buffs));
    }, [inventory])

    return (
        <>
            {
                whatEquipmentOpen
                    ? <SelectEquipmentModal
                        $type={whatEquipmentOpen}
                        $closeModal={() => setWhatEquipmentOpen('')} />
                    : null
            }
            <Modal
                $flexDirection='column'
                $isCloseButton
                $closeButtonFunction={() => $closeModal()}
                $gap='10px'
                $justifyContent='baseline'
                $size='large' >

                <CharacterInfo>
                    <EquipList>
                        <Title $size='2rem'>
                            {player.title}
                        </Title>
                        <Title $size='1.5rem'>
                            Броня:
                        </Title>

                        <EquipBlock>
                            Голова
                            <EquipSlot
                                onClick={() => setWhatEquipmentOpen('helmet')}
                                $equipmentCount={equipmentCount.head}
                                $background={equippedItems.head ? getItemBackground(equippedItems.head.item.rare) : 'white;'} >
                                <Avatar
                                    $image={equippedItems.head?.item.avatar || ''}
                                    width='100%' />
                            </EquipSlot>
                        </EquipBlock>
                        <EquipBlock>
                            Туловище
                            <EquipSlot
                                onClick={() => setWhatEquipmentOpen('chest')}
                                $equipmentCount={equipmentCount.chest}
                                $background={equippedItems.chest ? getItemBackground(equippedItems.chest.item.rare) : 'white;'}>
                                <Avatar
                                    $image={equippedItems.chest?.item.avatar || ''}
                                    width='100%' />
                            </EquipSlot>
                        </EquipBlock>
                        <EquipBlock >
                            Ноги
                            <EquipSlot
                                onClick={() => setWhatEquipmentOpen('foot')}
                                $equipmentCount={equipmentCount.foot}
                                $background={equippedItems.foot ? getItemBackground(equippedItems.foot.item.rare) : 'white;'}>
                                <Avatar
                                    $image={equippedItems.foot?.item.avatar || ''}
                                    width='100%' />
                            </EquipSlot>
                        </EquipBlock>

                        <Title $size='1.5rem'>
                            Инструменты и оружие:
                        </Title>

                        <EquipBlock>
                            Руки
                            <EquipSlot
                                onClick={() => setWhatEquipmentOpen('weapon')}
                                $equipmentCount={equipmentCount.weapon}
                                $background={equippedItems.weapon ? getItemBackground(equippedItems.weapon.item.rare) : 'white;'}>
                                <Avatar
                                    $image={equippedItems.weapon?.item.avatar || ''}
                                    width='100%' />
                            </EquipSlot>
                        </EquipBlock>
                        <EquipBlock>
                            Топор
                            <EquipSlot
                                onClick={() => setWhatEquipmentOpen('axe')}
                                $equipmentCount={equipmentCount.axe}
                                $background={equippedItems.axe ? getItemBackground(equippedItems.axe.item.rare) : 'white;'}>
                                <Avatar
                                    $image={equippedItems.axe?.item.avatar || ''}
                                    width='100%' />
                            </EquipSlot>
                        </EquipBlock>
                        <EquipBlock>
                            Кирка
                            <EquipSlot
                                onClick={() => setWhatEquipmentOpen('pickaxe')}
                                $equipmentCount={equipmentCount.pickaxe}
                                $background={equippedItems.pickaxe ? getItemBackground(equippedItems.pickaxe.item.rare) : 'white;'}>
                                <Avatar
                                    $image={equippedItems.pickaxe?.item.avatar || ''}
                                    width='100%' />
                            </EquipSlot>
                        </EquipBlock>
                    </EquipList>
                    <Characteristics>
                        <Title $size='2rem'>
                            Общие характеристики
                        </Title>
                        <CharList>
                            {
                                [...Object.entries(playerSkills)].map(skill => 
                                    <Char>
                                        {
                                            skill[1].type === ''
                                                ? skill[1].title +' '+ skill[1].currentScores
                                            : skill[1].type === 'x'
                                                ? skill[1].title +' x'+ skill[1].currentScores
                                            : skill[1].type === '%'
                                                ? skill[1].title +' '+ skill[1].currentScores + '%'
                                            : skill[1].type === 's'
                                                ? skill[1].title +' '+ skill[1].currentScores + 's'
                                                : skill[1].title +' '+ skill[1].currentScores + 'kg'
                                        }
                                    </Char>)
                            }
                        </CharList>
                    </Characteristics>
                </CharacterInfo>
            </Modal>
        </>

    );
}

const Char = styled.p`
    font-size: 1.3em;
`

const CharList = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
    gap: 1rem;

    ${scrollBarX}

    @media (max-width: 426px) {
        overflow-y: hidden;
        height: auto;
    }
`

const Characteristics = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    max-height: 100%;
    flex: 1;
`

const ExtraEquipText = styled.p`
    font-size: 1.3em;

`

interface IEquipSlotProps {
    $equipmentCount: number;
    $background: string;

}

const EquipSlot = styled.div<IEquipSlotProps>`
    width: 4rem;
    height: 4rem;
    border: 2px black solid;
    background: ${p => p.$background};
    background-size: 700%;
    border-radius: 10px;
    transition: 0.1s;
    cursor: pointer;
    position: relative;

    &:hover{
        transform: scale(0.9);
    }

    ${p => p.$equipmentCount
        ? `&::after{
                content: '${p.$equipmentCount}';
                position: absolute;
                z-index: 999;
                bottom: -10%;
                right: -10%;
                padding: 5px;
                background: white;
                width: 1.3rem;
                height: 1.3rem;
                text-align: center;
                line-height: 1;
                font-size: 1.3rem;
                border-radius: 5px;
                box-shadow: 0 0 5px black;
                

            }`
        : ``
    }
`

const EquipBlock = styled.div`
    position: relative;
    font-size: 1.5rem;
    line-height: 0;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
`

const EquipList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    flex: 0.5;
`

const CharacterInfo = styled.div`
    display: flex;
    gap: 1.3rem;
    max-height: 100%;
    overflow-y: auto;

    @media (max-width: 426px) {
        flex-direction: column;
    }
`


export default CharacterModal;