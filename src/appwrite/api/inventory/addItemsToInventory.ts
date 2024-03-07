import { ID } from "appwrite";
import { databases } from "../../config";
import { inventoryCollection } from "../../databaseConfig";
import { getExistsItem } from "./getExistsItem";

type AddItemT = {
    id: string;
    count: number;
}

export const addItemsToInventory = async (items: AddItemT[]) => {
    try {
        items.forEach(async item => {
            const itemExists = await getExistsItem(item.id);

            if (itemExists) {
                await databases.updateDocument(
                    inventoryCollection.databaseId,
                    inventoryCollection.collectionId,
                    itemExists.$id,
                    {
                        item_count: itemExists.item_count + item.count
                    }
                );
            } else {
                await databases.createDocument(
                    inventoryCollection.databaseId,
                    inventoryCollection.collectionId,
                    ID.unique(),
                    {
                        user_id: JSON.parse(sessionStorage.user).$id,
                        item_id: item.id,
                        item_count: item.count,
                        is_equipped: false
                    }
                );
            }
        })
        
    } catch(e) {
        console.log(e)
    }
}