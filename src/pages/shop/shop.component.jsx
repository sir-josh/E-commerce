import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpinnerLoader from '../../components/spinner-loader/spinner-loader.component';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

const CollectionOverviewWithSpinnerLoader = SpinnerLoader(CollectionOverview);
const CollectionPageWithSpinnerLoader = SpinnerLoader(CollectionPage);

class ShopPage extends Component {
    componentDidMount() {
        const { fetchCollectionsFromBackend } = this.props;
        fetchCollectionsFromBackend();
    }

    render() {
        const { match, isFetching, isCollectionsLoaded } = this.props;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinnerLoader isLoading={isFetching} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinnerLoader isLoading={!isCollectionsLoaded} {...props} />} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsCollectionsFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsFromBackend: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);