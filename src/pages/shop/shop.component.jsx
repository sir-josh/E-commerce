import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { selectCollectionsItems } from "../../redux/shop/shop.selectors";

import CollecionPreview from '../../components/collection-preview/collection-preview.component';

const ShopPage = ({ collections }) => (
    <div className="shop-page">
        {
            collections.map(({ id, ...otherCollectionsProps})=>(
                <CollecionPreview key={id} {...otherCollectionsProps} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsItems
})

export default connect(mapStateToProps)(ShopPage);