import { IFullItem } from "../models/IAreaItem";
import { IItemInventory } from "../models/IInventory";

interface IGetCountCanCraft {
    item: IFullItem;
    inventory: IItemInventory[];
}

export const getCountCanCraft = ({ item, inventory }: IGetCountCanCraft) => {
    if (!item.itemsToCraft?.length) return 0

    return Math.min(...(item.itemsToCraft!.map(i =>
        (Math.floor((inventory.find(pi => pi.item.id === i.id)?.count || 0) / i.count)))))

};