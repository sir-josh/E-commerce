import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { selectCollectionsItems } from "../../redux/shop/shop.selectors";

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const CollectionsOverview = ({collections}) => (
    <div className="collections-overview">
        {
            collections.map(({ id, ...otherCollectionsProps})=>(
                <CollectionPreview key={id} {...otherCollectionsProps} />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsItems
})

export default connect(mapStateToProps)(CollectionsOverview);
