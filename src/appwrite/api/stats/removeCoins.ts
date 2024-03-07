import { databases } from "../../config";
import { statsCollection } from "../../databaseConfig";
import { getUserStats } from "./getUserStats";

export const removeCoins = async (coins: number) => {
    try {
        const stats = await getUserStats();
        await databases.updateDocument(
            statsCollection.databaseId,
            statsCollection.collectionId,
            stats.$id,
            {
                coins: stats.coins - coins
            }
        );
        
    } catch(e) {
        console.log(e)
    }
}