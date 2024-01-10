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
    dateReceiving: string;
    cost: number;
    baseCountXP: number;
    weight: number;
}

export interface IFullItemWithCount extends IFullItem{
    count: number;
}

export interface ICraftItem {
    id: string;
    itemsNeed: {
        id: string;
        count: number;
    }[];
}

///types - food, ore, tree