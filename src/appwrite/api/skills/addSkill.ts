import { ID } from "appwrite";
import { databases } from "../../config";
import { skillsCollection, statsCollection } from "../../databaseConfig";
import { getSkill } from "./getSkill";


export const addSkill = async (skillId: string, count: number) => {
    try {
        const skill = await getSkill(skillId);
        if(skill){
            await databases.updateDocument(
                skillsCollection.databaseId,
                skillsCollection.collectionId,
                skill.$id,
                {
                    level: skill.level + count
                }
            );
        } else {
            await databases.createDocument(
                skillsCollection.databaseId,
                skillsCollection.collectionId,
                ID.unique(),
                {
                    user_id: JSON.parse(sessionStorage.user).$id,
                    level: count,
                    skill_id: skillId
                }
            )
        } 
    } catch(e) {
        console.log(e)
    }
}