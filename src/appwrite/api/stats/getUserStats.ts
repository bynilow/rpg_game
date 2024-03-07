import { Query } from "appwrite";
import { databases } from "../../config";
import { statsCollection } from "../../databaseConfig";

export const getUserStats = async () => {
    const stats = await databases.listDocuments(
        statsCollection.databaseId,
        statsCollection.collectionId,
        [
            Query.equal('user_id', JSON.parse(sessionStorage.user).$id),
        ]
    )

    return stats.documents[0]
}