import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { rareList } from '../../../models/IAreaItem';
import { scrollBarX } from '../../../styles/scrollbars';
import CircleButton from '../../Buttons/CircleButton';
import Modal from '../Modal';
import ModalBackground from '../Other/ModalBackground';
import InventoryItem from './InventoryItem';
import InventoryEmptyItem from './InventoryEmptyItem';
import Title from '../../Title/Title';
import Dropdown from '../../SearchBar/Dropdown';
import ReverseButton from '../../SearchBar/ReverseButton';
import Input from '../../SearchBar/Input';

interface IInventoryModal {
    closeModal: Function;
}

function InventoryModal({closeModal}:IInventoryModal) {

    const {inventory, playerSkills} = useAppSelector(state => state.userReducer)

    const [inputText, setInputText] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('all');
    const [selectedRare, setSelectedRare] = useState('all');
    const [selectedSort, setSelectedSort] = useState('title');
    const [isReversed, setIsReversed] = useState(false);

    const [sortedInventory, setSortedInventory] = useState(inventory);
    
    const sortFilterInventory = () => {
        let inventoryFilterMaterial = inventory.filter(i => !i.isEquipped);
        let inventoryFilterRare = inventory.filter(i => !i.isEquipped);
        let inventorySorted = inventory.filter(i => !i.isEquipped);

        if(selectedMaterial !== 'all'){
            inventoryFilterMaterial = inventory.filter(i => i.item.type === selectedMaterial);
        }
        if(selectedRare !== 'all'){
            inventoryFilterRare = inventory.filter(i => i.item.rare === selectedRare);
        }

        let filteredInventory = inventoryFilterMaterial.filter(i => inventoryFilterRare.includes(i));
        
        switch (selectedSort){
            case 'title':
                inventorySorted = filteredInventory.sort((a, b) => 
                    a.item.title.localeCompare(b.item.title));
                break;
            case 'date':
                inventorySorted = filteredInventory.sort((a, b) => 
                    a.item.dateReceiving.localeCompare(b.item.dateReceiving)).reverse();
                break;
            case 'rare':
                inventorySorted = filteredInventory.sort((a, b) =>
                    rareList.indexOf(a.item.rare) - rareList.indexOf(b.item.rare));
                break;
            case 'cost':
                inventorySorted = filteredInventory.sort((a, b) =>
                    a.item.cost - b.item.cost).reverse();
                break;
            case 'count':
                inventorySorted = filteredInventory.sort((a, b) =>
                    a.count - b.count).reverse();
                break;
            default:
                break;
        }

        let inventoryTexted = inventorySorted.filter(i => 
            i.item.title.toLocaleLowerCase().includes(inputText.toLowerCase()));

        setSortedInventory(isReversed ? inventoryTexted.reverse() : inventoryTexted);
    }
    
    useEffect(() => {
        sortFilterInventory();
    }, [selectedMaterial, selectedRare, selectedSort, isReversed, inputText, inventory])
    return (
        <>
            <Modal 
                $flexDirection={'column'} 
                $justifyContent='baseline'
                $size='large'
                $isCloseButton
                $closeButtonFunction={() => closeModal()}>
                <InfoBlock>
                    <Title
                        $size='1.3em'>
                            Инвентарь
                    </Title>
                    <CapacityText>
                        {
                            `${inventory.reduce((a, v) => a + v.item.weight * v.count, 0).toFixed(1)} / ${playerSkills['capacity']['currentScores']}kg`
                        }
                    </CapacityText>
                </InfoBlock>
                <Bar>
                    <Input $onChange={(e: string) => setInputText(e)} />

                    <Dropdown 
                        $selectedTypes={[
                            {id: 'all', title: 'Все'},
                            {id: 'tree', title: 'Деревья'},
                            {id: 'ore', title: 'Руды'},
                            {id: 'materials', title: 'Материалы'},
                            {id: 'equipment', title: 'Снаряжение'} ]}
                        $setSelected={(id: string) => setSelectedMaterial(id)} />

                    <Dropdown
                        $isRare
                        $selectedTypes={[
                            {id: 'all', title: 'Все'},
                            {id: 'common', title: 'Обычное'},
                            {id: 'uncommon', title: 'Необычное'},
                            {id: 'rare', title: 'Редкое'},
                            {id: 'mythical', title: 'Мифическое'},
                            {id: 'legendary', title: 'Легендарное'} ]}
                        $setSelected={(id: string) => setSelectedRare(id)} />

                    <Dropdown
                        $selectedTypes={[
                            { id: 'title', title: 'По названию' },
                            { id: 'date', title: 'По дате' },
                            { id: 'rare', title: 'По редкости' },
                            { id: 'cost', title: 'По цене' },
                            { id: 'count', title: 'По количеству' }] }
                        $setSelected={(id: string) => setSelectedSort(id)} />

                    <ReverseButton 
                        $setReversed={() => setIsReversed(!isReversed)} />
                </Bar>
                {
                    inventory.length
                        ? <ItemsList>

                            {
                                sortedInventory.map(i => 
                                    <InventoryItem 
                                        key={i.item.id}
                                        item={i.item} 
                                        count={i.count} />)
                            }
                            <InventoryEmptyItem />
                            <InventoryEmptyItem />
                            
                        </ItemsList>
                        : <Title $size='1.5em'>Инвентарь пуст...</Title>
                }
            </Modal>
        </>

    );
}

const CapacityText = styled.p`
    color: gray;
`

const InfoBlock = styled.div`
    display: flex;
    align-items: end;
    gap: 1em;
`

const Bar = styled.div`
    z-index: 999;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    ${
        scrollBarX
    }

    @media (max-width: 376px) {
        max-height: 25%;
        overflow-y: auto;
    }
    @media (max-width: 426px) {
        justify-content: center;
    }
`

const ItemsList = styled.div`
    display: flex;
    gap: 1.3rem;
    padding: 1.2rem;
    width: 100%;
    height: 70%;
    justify-content: baseline;
    flex-wrap: wrap;
    overflow-y: scroll;
    overflow-x: hidden;

    ${
        scrollBarX
    }
`

export default InventoryModal;