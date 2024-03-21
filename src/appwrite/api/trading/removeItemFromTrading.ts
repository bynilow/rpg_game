import { ID } from "appwrite";
import { databases } from "../../config";
import { tradingItemsCollection } from "../../databaseConfig";


export const removeItemFromTrading = async (documentItemId: string) => {
    try {
        await databases.deleteDocument(
            tradingItemsCollection.databaseId,
            tradingItemsCollection.collectionId,
            documentItemId
        );

    } catch (e) {
        console.log(e)
    }
}