import { Models, Query } from "appwrite";
import { databases } from "../../config";
import { tradingItemsCollection } from "../../databaseConfig";
import { Items } from "../../../data/ItemsData";
import { IFullItemWithCount } from "../../../models/IAreaItem";

export const getTradeItems = async (tradeId: string) => {
    const items = await databases.listDocuments(
        tradingItemsCollection.databaseId,
        tradingItemsCollection.collectionId,
        [
            Query.equal('trade_id', tradeId)
        ]
    )

    return items.documents.map(item => ({
        ...Items.find(i => i.id === item.item_id),
        ...item
    })) as Models.Document[] & IFullItemWithCount[];
}
