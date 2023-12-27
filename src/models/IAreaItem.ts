export interface IAreaItem {
    id: string;
    countMin: number;
    countMax: number;
}

export interface IAreaFullItem {
    id: string;
    idInArea: string;
    title: string;
    avatar: string;
    description: string;
    timeToMining: number;
    type: string;
    rare: string;
    
}
///types - food, ore, tree