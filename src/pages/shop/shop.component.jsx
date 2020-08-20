import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends Component {
    unSubcribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;

        const collectionRef = firestore.collection('collections');

        this.unSubcribeFromSnapshot = collectionRef.onSnapshot( async snapshot => {
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
           updateCollections(collectionsMap);
        });
    }

    render(){
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);