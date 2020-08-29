import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SpinnerLoader from '../../components/spinner-loader/spinner-loader.component';

import CollectionOverview from './collections-overview.component';
import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors";


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching,
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    SpinnerLoader
)(CollectionOverview);

export default CollectionsOverviewContainer;