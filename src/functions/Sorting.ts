import { rareList } from "../models/IAreaItem";
import { IItemInventory } from "../models/IInventory";

type ISortFilterInventory = (
    inventory: IItemInventory[], 
    inputText: string,
    selectedMaterial: string,
    selectedRare: string,
    selectedSort: string,
    isReversed: boolean) => IItemInventory[]


export const sortFilterInventory: ISortFilterInventory = (
    inventory, 
    inputText,
    selectedMaterial,
    selectedRare, 
    selectedSort,
    isReversed ) => {
    let inventoryFilterMaterial = inventory.filter(i => !i.isEquipped);
        let inventoryFilterRare = inventory.filter(i => !i.isEquipped);
        let inventorySorted = inventory.filter(i => !i.isEquipped);

        if (selectedMaterial !== 'all') {
            inventoryFilterMaterial = inventory.filter(i => i.item.type === selectedMaterial);
        }
        if (selectedRare !== 'all') {
            inventoryFilterRare = inventory.filter(i => i.item.rare === selectedRare);
        }

        let filteredInventory = inventoryFilterMaterial.filter(i => inventoryFilterRare.includes(i));

        switch (selectedSort) {
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

        return isReversed ? inventoryTexted.reverse() : inventoryTexted;
}