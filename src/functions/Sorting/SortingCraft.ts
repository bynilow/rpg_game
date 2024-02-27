import { IFullItem, rareList } from "../../models/IAreaItem";
import { IItemInventory } from "../../models/IInventory";
import { getCountCanCraft } from "../GetCountCanCraft";

interface ISortFilterCraftItems {
    items: IFullItem[];
    selectedMaterial: string;
    selectedRare: string;
    selectedSort: string;
    onlyReadyToCraft: boolean;
    inputText: string;
    isReversed: boolean;
    inventory: IItemInventory[];
}

export const sortFilterCraftItems = ({
    items, 
    selectedMaterial, 
    selectedRare,
    selectedSort,
    onlyReadyToCraft,
    inputText,
    isReversed,
    inventory}: ISortFilterCraftItems) => {

        debugger;

    const itemsWithCraft = items.filter(item => item.itemsToCraft?.length);
    
    let itemsFilterMaterial:IFullItem[] = itemsWithCraft;
    let itemsFilterRare:IFullItem[] = itemsWithCraft;
    let itemsSorted:IFullItem[] = itemsWithCraft;

    if (selectedMaterial !== 'all') {
        itemsFilterMaterial = itemsWithCraft.filter(item => item.type === selectedMaterial);
    }
    if (selectedRare !== 'all') {
        itemsFilterRare = itemsWithCraft.filter(item => item.rare === selectedRare);
    }

    switch (selectedMaterial){
        case 'all':
            itemsFilterMaterial = itemsWithCraft.filter(item => item.itemsToCraft?.length);
            break;
        case 'helmet':
            itemsFilterMaterial = itemsWithCraft.filter(item => item.subType === 'helmet');
            break;
        case 'chest':
            itemsFilterMaterial = itemsWithCraft.filter(item => item.subType === 'chest');
            break;
        case 'foot':
            itemsFilterMaterial = itemsWithCraft.filter(item => item.subType === 'foot');
            break;
        case 'weapon':
            itemsFilterMaterial = itemsWithCraft.filter(item => item.type === 'weapon');
            break;
        case 'axe':
            itemsFilterMaterial = itemsWithCraft.filter(item => item.subType === 'axe');
            break;
        case 'pickaxe':
            itemsFilterMaterial = itemsWithCraft.filter(item => item.subType === 'pickaxe');
            break;
    }

    let filteredItems = itemsFilterMaterial.filter(item => itemsFilterRare.includes(item));

    switch (selectedSort) {
        case 'title':
            itemsSorted = filteredItems.sort((a, b) =>
                a.title.localeCompare(b.title));
            break;
        case 'rare':
            itemsSorted = filteredItems.sort((a, b) =>
                rareList.indexOf(a.rare) - rareList.indexOf(b.rare));
            break;
        case 'cost':
            itemsSorted = filteredItems.sort((a, b) =>
                a.cost - b.cost).reverse();
            break;
        case 'time':
            itemsSorted = filteredItems.sort((a, b) =>
                a.timeToMining - b.timeToMining).reverse();
            break;
        default:
            break;
    }

    const checkedCraftItem = onlyReadyToCraft ? itemsSorted.filter(item => getCountCanCraft({item, inventory})) : itemsSorted;

    let inventoryTexted = checkedCraftItem.filter(item =>
        item.title.toLocaleLowerCase().includes(inputText.toLowerCase()));

    console.log(inventoryTexted)

    return isReversed ? inventoryTexted.reverse() : inventoryTexted
};