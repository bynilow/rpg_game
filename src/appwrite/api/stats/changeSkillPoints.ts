import { databases } from "../../config";
import { statsCollection } from "../../databaseConfig";
import { getUserStats } from "./getUserStats";


export const addSkillPoints = async (points: number) => {
    try {
        const stats = await getUserStats();
        await databases.updateDocument(
            statsCollection.databaseId,
            statsCollection.collectionId,
            stats.$id,
            {
                skill_points: stats.skill_points + points
            }
        );
        
    } catch(e) {
        console.log(e)
    }
}

export const removeSkillPoints = async (points: number) => {
    try {
        const stats = await getUserStats();
        await databases.updateDocument(
            statsCollection.databaseId,
            statsCollection.collectionId,
            stats.$id,
            {
                skill_points: stats.skill_points - points
            }
        );
        
    } catch(e) {
        console.log(e)
    }
}