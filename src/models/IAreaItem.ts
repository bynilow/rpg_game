import { IArmor, ITool, IWeapon } from "./IEquipment";

export interface IAreaItem {
    id: string;
    countMin: number;
    countMax: number;
}

export type IRare = 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary'


export const rareList = ['common', 'uncommon', 'rare', 'mythical', 'legendary'];

export interface IFullItem {
    id: string;
    rare: IRare;
    idInArea: string;
    title: string;
    avatar: string;
    description: string;
    timeToMining: number;
    type: string;
    subType?: string;
    dateReceiving: string;
    cost: number;
    baseCountXP: number;
    weight: number;
    itemsToCraft?: ICraftItem[]; 
    armorStats?: IArmor;
    toolStats?: ITool;
    weaponStats?: IWeapon;
}

export interface IFullItemWithCount extends IFullItem{
    count: number;
}

export interface ICraftItem {
    id: string;
    count: number;
}

///types - food, ore, tree