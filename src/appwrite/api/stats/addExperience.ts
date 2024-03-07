import { BASE_COUNT_SKILL_POINTS, MULTIPLIER_NEED_EXPERIENCE } from "../../../const/const";
import { databases } from "../../config";
import { statsCollection } from "../../databaseConfig";
import { getUserStats } from "./getUserStats";


export const addExperience = async (experience: number) => {
    try {
        const stats = await getUserStats();

        let gainedXP = experience;
        let currentXP = stats.experience;
        let needXP = (stats.level ** MULTIPLIER_NEED_EXPERIENCE) + 10;
        let level = stats.level;
        let gainedSkillPoints = 0;

        while (gainedXP + currentXP >= needXP) {
            level += 1;
            gainedXP -= needXP;
            needXP = (level ** MULTIPLIER_NEED_EXPERIENCE) + 10;
            gainedSkillPoints += BASE_COUNT_SKILL_POINTS;
        }

        await databases.updateDocument(
            statsCollection.databaseId,
            statsCollection.collectionId,
            stats.$id,
            {
                experience: gainedXP,
                level,
                skill_points: stats.skill_points + gainedSkillPoints
            }
        );
        
    } catch(e) {
        console.log(e)
    }
}