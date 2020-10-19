import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import {selectIfCollectioLoaded} from '../../redux/shop/shop.selectors'
import WidthSpinner from '../../components/width-spinner/width-spinner.component'
import Collection from './collection.component'

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIfCollectioLoaded(state)
})

const CollectionContainer = compose(
    connect(mapStateToProps),
    WidthSpinner
)(Collection)


export default CollectionContainer