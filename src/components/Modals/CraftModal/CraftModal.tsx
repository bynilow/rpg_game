import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/redux';
import { rareList } from '../../../models/IAreaItem';
import { scrollBarX } from '../../../styles/scrollbars';
import CircleButton from '../../Buttons/CircleButton';
import Modal from '../Modal';
import ModalBackground from '../Other/ModalBackground';
import CraftItem from './CraftItem';

interface ICraftModal {
    closeModal: Function;
}

function CraftModal({ closeModal }: ICraftModal) {

    const { craftItems, areaItems, playerSkills, inventory } = useAppSelector(state => state.userReducer)

    const [inputText, setInputText] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('all');
    const [selectedRare, setSelectedRare] = useState('all');
    const [selectedSort, setSelectedSort] = useState('title');
    const [isReversed, setIsReversed] = useState(false);

    // const [sortedInventory, setSortedInventory] = useState(inventory);

    const sortFilterInventory = () => {
        // let inventoryFilterMaterial = inventory;
        // let inventoryFilterRare = inventory;
        // let inventorySorted = inventory;

        // if (selectedMaterial !== 'all') {
        //     inventoryFilterMaterial = inventory.filter(i => i.item.type === selectedMaterial);
        // }
        // if (selectedRare !== 'all') {
        //     inventoryFilterRare = inventory.filter(i => i.item.rare === selectedRare);
        // }

        // let filteredInventory = inventoryFilterMaterial.filter(i => inventoryFilterRare.includes(i));

        // switch (selectedSort) {
        //     case 'title':
        //         inventorySorted = filteredInventory.sort((a, b) =>
        //             a.item.title.localeCompare(b.item.title));
        //         break;
        //     case 'date':
        //         inventorySorted = filteredInventory.sort((a, b) =>
        //             a.item.dateReceiving.localeCompare(b.item.dateReceiving)).reverse();
        //         break;
        //     case 'rare':
        //         inventorySorted = filteredInventory.sort((a, b) =>
        //             rareList.indexOf(a.item.rare) - rareList.indexOf(b.item.rare));
        //         break;
        //     case 'cost':
        //         inventorySorted = filteredInventory.sort((a, b) =>
        //             a.item.cost - b.item.cost).reverse();
        //         break;
        //     case 'count':
        //         inventorySorted = filteredInventory.sort((a, b) =>
        //             a.count - b.count).reverse();
        //         break;
        //     default:
        //         break;
        // }

        // let inventoryTexted = inventorySorted.filter(i =>
        //     i.item.title.toLocaleLowerCase().includes(inputText.toLowerCase()));

        // setSortedInventory(isReversed ? inventoryTexted.reverse() : inventoryTexted);
    }

    const [isClickedSelectCount, setIsClickedSelectCount] = useState('');

    const onClickSelectCount = (id: string) => {

    }

    useEffect(() => {
        sortFilterInventory();
    }, [selectedMaterial, selectedRare, selectedSort, isReversed, inputText])

    return (
        <>
            <Modal
                $flexDirection={'row'}
                $gap='20px'
                $size='large'
                $justifyContent='baseline'
                $isCloseButton
                $closeButtonFunction={() => closeModal()}>
                <CraftTypesPlace>
                    <CraftType />
                    <CraftType />
                    <CraftType />
                </CraftTypesPlace>

                <Divider />

                <CraftPlace>
                    <CraftTitle>Создание</CraftTitle>
                    <Bar>
                        <InputName
                            type='text'
                            placeholder='Название'
                            maxLength={30}
                            value={inputText}
                            onChange={e => setInputText(e.currentTarget.value)} />

                        <SelectDropdown>
                            <DropdownButton>
                                {
                                    selectedMaterial === 'all'
                                        ? 'Все'
                                        : selectedMaterial === 'melee'
                                            ? 'Оружие'
                                            : selectedMaterial === 'armor'
                                                ? 'Броня'
                                                : selectedMaterial === 'materials'
                                                    ? 'Материалы'
                                                    : 'Другое'
                                }
                            </DropdownButton>
                            <DropdownOptions>
                                <DropdownOption
                                    isSelected={selectedMaterial === 'all'}
                                    onClick={() => setSelectedMaterial('all')}>
                                    Все
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedMaterial === 'melee'}
                                    onClick={() => setSelectedMaterial('melee')}>
                                    Оружие
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedMaterial === 'armor'}
                                    onClick={() => setSelectedMaterial('armor')}>
                                    Броня
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedMaterial === 'materials'}
                                    onClick={() => setSelectedMaterial('materials')}>
                                    Материалы
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedMaterial === 'other'}
                                    onClick={() => setSelectedMaterial('other')}>
                                    Другое
                                </DropdownOption>

                            </DropdownOptions>
                        </SelectDropdown>

                        <SelectDropdown>
                            <DropdownButton>
                                <RareIcon
                                    color={
                                        selectedRare === 'all'
                                            ? 'white'
                                            : selectedRare === 'common'
                                                ? '#a4a4ab'
                                                : selectedRare === 'uncommon'
                                                    ? '#59c87f'
                                                    : selectedRare === 'rare'
                                                        ? '#4d69cd'
                                                        : selectedRare === 'mythical'
                                                            ? '#d42be6'
                                                            : '#caab05'
                                    } />
                                {
                                    selectedRare === 'all'
                                        ? 'Все'
                                        : selectedRare === 'common'
                                            ? 'Обычное'
                                            : selectedRare === 'uncommon'
                                                ? 'Необычное'
                                                : selectedRare === 'rare'
                                                    ? 'Редкое'
                                                    : selectedRare === 'mythical'
                                                        ? 'Мифическое'
                                                        : 'Легендарное'
                                }
                            </DropdownButton>
                            <DropdownOptions>
                                <DropdownOption
                                    isSelected={selectedRare === 'all'}
                                    onClick={() => setSelectedRare('all')}>
                                    <RareIcon color="white" /> Все
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedRare === 'common'}
                                    onClick={() => setSelectedRare('common')}>
                                    <RareIcon color="#a4a4ab" /> Обычное
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedRare === 'uncommon'}
                                    onClick={() => setSelectedRare('uncommon')}>
                                    <RareIcon color="#59c87f" /> Необычное
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedRare === 'rare'}
                                    onClick={() => setSelectedRare('rare')}>
                                    <RareIcon color="#4d69cd" /> Редкое
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedRare === 'mythical'}
                                    onClick={() => setSelectedRare('mythical')}>
                                    <RareIcon color="#d42be6" /> Мифическое
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedRare === 'legendary'}
                                    onClick={() => setSelectedRare('legendary')}>
                                    <RareIcon color="#caab05" /> Легендарное
                                </DropdownOption>
                            </DropdownOptions>
                        </SelectDropdown>

                        <SelectDropdown>
                            <DropdownButton>
                                {
                                    selectedSort === 'title'
                                        ? 'По названию'
                                        : selectedSort === 'rare'
                                            ? 'По редкости'
                                            : selectedSort === 'cost'
                                                ? 'По стоимости'
                                                : ''
                                }
                            </DropdownButton>
                            <DropdownOptions>
                                <DropdownOption
                                    isSelected={selectedSort === 'title'}
                                    onClick={() => setSelectedSort('title')}>
                                    По названию
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedSort === 'rare'}
                                    onClick={() => setSelectedSort('rare')}>
                                    По редкости
                                </DropdownOption>
                                <DropdownOption
                                    isSelected={selectedSort === 'cost'}
                                    onClick={() => setSelectedSort('cost')}>
                                    По стоимости
                                </DropdownOption>
                            </DropdownOptions>
                        </SelectDropdown>
                        <ReverseButton onClick={() => setIsReversed(!isReversed)}>
                            {
                                isReversed
                                    ? 'ᐯ'
                                    : 'ᐱ'
                            }
                        </ReverseButton>
                    </Bar>
                    <ItemsList key={craftItems.length}>
                        {
                            craftItems.map((i, ind) => 
                                <CraftItem 
                                    key={i.id 
                                        + playerSkills.craftSpeedMultiplier.currentScores 
                                        + playerSkills.craftDoubleLootPercentChance.currentScores}
                                    $fullItem={areaItems.find(ai => ai.id === i.id) || areaItems[0]}
                                    $itemToCraft={i}
                                    $craftingId={i.id}
                                    $index={ind}
                                    $playerCraftingSpeed={playerSkills.craftSpeedMultiplier.currentScores}
                                    $clearIsCraftingId={() => null}
                                    $craftItem={() => null}
                                    $setIsCraftingId={() => null}
                                    $onClickSelectCount={() => setIsClickedSelectCount(i.id)}
                                    $onClickCancelCount={() => setIsClickedSelectCount('')}
                                    $isClickedSelectCount={isClickedSelectCount === i.id}
                                    $countCanCraft={
                                        Math.min(...( i.itemsNeed.map(i => 
                                            ( Math.floor((inventory.find(pi => pi.item.id === i.id)?.count || 0 ) / i.count)) ) ))
                                        
                                    } />)
                        }

                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                        <EmptyItem />
                    </ItemsList>
                </CraftPlace>
            </Modal>
        </>

    );
}

const Divider = styled.div`
    height: 100%;
    border: 1px solid gray;
`

const CraftType = styled.div`
    width: 50px;
    height: 50px;
    background-color: gray;
    border-radius: 10px;
`

const CraftTypesPlace = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    gap: 20px;
`

const CraftPlace = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 20px;
`

const ReverseButton = styled.div`
    font-size: 16px;
    line-height: 0;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
`

const EmptyText = styled.p`
    font-size: 30px;
    margin: 20px;
`



interface IRareIconProps {
    color: string;
}
const RareIcon = styled.div<IRareIconProps>`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: ${p => p.color};
`

interface IDropdownOptionProps {
    isSelected: boolean;
}

const DropdownOption = styled.div<IDropdownOptionProps>`
    font-size: 16px;
    height: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px;
    cursor: pointer;
    transition: 0.1s;
    border-bottom: ${p => p.isSelected ? '1px solid black;' : 'none;'};

    &:hover{
        padding-left: 20px;
        background-color: #e2e2e2;
    }
    
`

const DropdownOptions = styled.div`
    display: none;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    overflow: hidden;
    box-shadow: 0 0 5px #0000005a;
    background-color: #ffffff;
    border: 1px solid black;
    
    border-radius: 5px;
    
    padding: 5px;
    width: 100%;
    top: 100%;    
`

const SelectDropdown = styled.div`
    position: relative;
    z-index: 999;
    width: 15vw;
    

    &:hover ${DropdownOptions} {
        display: flex;
    }
`
const DropdownButton = styled.button`
    position: relative;
    width: 100%;
    height: 40px;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
    background-color: white;
    transition: 0.3s;

    &::after{
        content: 'ᐯ';
        z-index: 9999;
        transform: scaleX(1.5) scale(0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 0;
        width: 10px;
        height: 10px;
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        margin: 10px;
    }
`




const InputName = styled.input`
    font-size: 16px;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 0 0 5px #0000005a;
`

const Bar = styled.div`
    display: flex;
    gap: 10px;
`

const EmptyItem = styled.div`
    width: 100px;
    height: 100px;
    margin: 10px;
`

const ItemsList = styled.div`
    display: flex;
    gap: 10px;
    padding: 20px;
    height: 70%;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: scroll;
    overflow-x: hidden;

    ${scrollBarX
    }
`

const CraftTitle = styled.p`
    font-size: 20px;
`

export default CraftModal;