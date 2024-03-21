import { ID, Models } from "appwrite";
import { databases } from "../../config";
import { tradingItemsCollection } from "../../databaseConfig";
import { IFullItemWithCount } from "../../../models/IAreaItem";

type AddItemT = {
    id: string;
    count: number;
}

export const addItemsToTrading = async (items: AddItemT[], tradeId: string) => {
    try {
        let documentItems: Models.Document[] & IFullItemWithCount[] = [];
        for (const item of items) {
            let createdItem =
                await databases.createDocument(
                    tradingItemsCollection.databaseId,
                    tradingItemsCollection.collectionId,
                    ID.unique(),
                    {
                        user_id: JSON.parse(sessionStorage.user).$id,
                        item_id: item.id,
                        count: item.count,
                        trade_id: tradeId
                    }
                );
            createdItem = { ...createdItem, item }
            documentItems.push(createdItem);
        }
        console.log(documentItems)
        return documentItems
    } catch (e) {
        console.log(e)
        return []
    }
}