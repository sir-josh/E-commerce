import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import SpinnerLoader from '../../components/spinner-loader/spinner-loader.component';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import { updateCollections } from "../../redux/shop/shop.actions";

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionOverviewWithSpinnerLoader = SpinnerLoader(CollectionOverview);
const CollectionPageWithSpinnerLoader = SpinnerLoader(CollectionPage);

class ShopPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true
        }
    }
    unSubcribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;

        const collectionRef = firestore.collection('collections');

        this.unSubcribeFromSnapshot = collectionRef.onSnapshot( async snapshot => {
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
           updateCollections(collectionsMap);
           this.setState({ isLoading: false });
        });
    }

    render(){
        const { match } = this.props;
        const { isLoading } = this.state;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinnerLoader isLoading={isLoading} {...props} /> } />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinnerLoader isLoading={isLoading} {...props} /> } />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);