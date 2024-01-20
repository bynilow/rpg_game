import { IArea } from './../models/IArea';

export const getAreaFromId = (areas: IArea[], id: string) => {
    return areas[areas.findIndex(i => i.id === id)];
}