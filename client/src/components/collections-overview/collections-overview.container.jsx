import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors'
import WidthSpinner from '../width-spinner/width-spinner.component'
import CollectionOverview from './collection-overview.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WidthSpinner
)(CollectionOverview)


export default CollectionOverviewContainer