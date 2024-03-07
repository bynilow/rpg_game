import { Query } from "appwrite";
import { databases } from "../../config";
import { skillsCollection } from "../../databaseConfig";

export const getSkill = async (skillId: string) => {
    const skills = await databases.listDocuments(
        skillsCollection.databaseId,
        skillsCollection.collectionId,
        [
            Query.equal('user_id', JSON.parse(sessionStorage.user).$id),
            Query.equal('skill_id', skillId)
        ]
    )

    return skills.documents[0]
}