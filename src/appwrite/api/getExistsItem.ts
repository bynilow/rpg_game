import { Query } from "appwrite";
import { inventoryCollection } from "../databaseConfig";
import { databases } from "../config";

export const getExistsItem = async (itemId: string) => {
    const item = await databases.listDocuments(
        inventoryCollection.databaseId,
        inventoryCollection.collectionId,
        [
            Query.equal('item_id', itemId),
            Query.equal('user_id', JSON.parse(sessionStorage.user).$id),
        ]
    )

    return item.documents[0]
}