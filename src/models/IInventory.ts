import { IFullItem } from "./IAreaItem";

export interface IItemInventory{
    item: IFullItem;
    isEquipped?: boolean;
    count: number;
}

export interface IInventory{
    items: IItemInventory[];
}