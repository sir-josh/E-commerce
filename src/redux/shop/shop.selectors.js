import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}

const selectCollections = state => state.shop;

export const selectCollectionsItems = createSelector(
    [selectCollections],
    shop => shop.collections
);

// NB: collectionUrlID(A string paramter value gotten from the url) is in string format, we want to use "COLLECTION_ID_MAP" obj to convert 
// the string value to an equivalent collection id (that is from the collection list) which is in interger format
export const selectACollectionFromCollections = collectionUrlID => createSelector(
    [selectCollectionsItems],
    collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlID])
);