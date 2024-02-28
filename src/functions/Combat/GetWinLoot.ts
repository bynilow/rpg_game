import { Items } from "../../data/ItemsData";
import { IFullItem, IFullItemWithCount } from "../../models/IAreaItem";
import { IEnemyLoot } from "../../models/IEnemy";
import { getChance, getRandomNumber } from "../Random";

interface IGetWinLoot {
    possibleLoot: IEnemyLoot[];
    baseEnemyCountXP: number;
    playerExpMultiplier: number;
    enemyLevel: number;
}

export const getWinLoot = ({
    possibleLoot, baseEnemyCountXP, playerExpMultiplier, enemyLevel }: IGetWinLoot) => {

    const experienceCount = Number((
        baseEnemyCountXP
        * playerExpMultiplier
        + (enemyLevel / 2)).toFixed(0)
    );

    const experienceItem: IFullItemWithCount = {
        ...Items.find(i => i.id === 'experience')!,
        count: experienceCount
    };

    const items: IFullItemWithCount[] = [];
    items.push(experienceItem);

    possibleLoot.forEach(loot => {
        if (getChance(loot.dropChance)) {
            const foundedItem = Items.find(item => item.id === loot.id)!;
            let count = 0;
            if (loot.id === 'coin') {
                count = getRandomNumber(loot.countMin + enemyLevel, loot.countMax + enemyLevel * 1.5);
            }
            else {
                count = getRandomNumber(loot.countMin, loot.countMax);
            }
            items.push({ ...foundedItem, count })
        }
    });

    return items
};