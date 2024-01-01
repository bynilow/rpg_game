export interface IAreaItem {
    id: string;
    countMin: number;
    countMax: number;
}

type Rare = 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary';

export const rareList = ['common', 'uncommon', 'rare', 'mythical', 'legendary'];

export interface IFullItem {
    id: string;
    idInArea: string;
    title: string;
    avatar: string;
    description: string;
    timeToMining: number;
    type: string;
    rare: Rare;
    dateReceiving: string;
    cost: number;
    
}
///types - food, ore, tree