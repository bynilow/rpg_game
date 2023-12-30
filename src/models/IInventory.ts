import { IAreaFullItem } from "./IAreaItem";

export interface IItemInventory{
    item: IAreaFullItem;
    count: number;
}

export interface IInventory{
    items: IItemInventory[];
}