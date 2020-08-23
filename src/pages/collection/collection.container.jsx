import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SpinnerLoader from '../../components/spinner-loader/spinner-loader.component';

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    SpinnerLoader
)(CollectionPage);

export default CollectionPageContainer;