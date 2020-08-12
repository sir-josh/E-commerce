import { createSelector } from "reselect";

const selectCollections = state => state.shop;

export const selectCollectionsItems = createSelector(
    [selectCollections],
    shop => shop.collections
);
