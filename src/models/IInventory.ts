import { IFullItem } from "./IAreaItem";

export interface IItemInventory{
    item: IFullItem;
    count: number;
}

export interface IInventory{
    items: IItemInventory[];
}