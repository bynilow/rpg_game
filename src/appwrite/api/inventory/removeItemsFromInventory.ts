import { ID } from "appwrite";
import { databases } from "../../config";
import { inventoryCollection } from "../../databaseConfig";
import { getExistsItem } from "./getExistsItem";

type RemoveItemT = {
    id: string;
    count: number;
}

export const removeItemsFromInventory = async (items: RemoveItemT[]) => {
    try {
        items.forEach(async item => {
            const itemExists = await getExistsItem(item.id);

            if (itemExists.item_count > item.count) {
                await databases.updateDocument(
                    inventoryCollection.databaseId,
                    inventoryCollection.collectionId,
                    itemExists.$id,
                    {
                        item_count: itemExists.item_count - item.count
                    }
                );
            } else {
                await databases.deleteDocument(
                    inventoryCollection.databaseId,
                    inventoryCollection.collectionId,
                    itemExists.$id
                );
            }
        })
        
    } catch(e) {
        console.log(e)
    }
}