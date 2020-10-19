import React, {useEffect} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import './App.css';
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import CheckoutPage from './pages/checkout/checkoutpage.component'
import SigninAndSignup from './pages/signin-and-signup/signin-and-signup.component'
import {checkUserSession} from './redux/user/user.actions'
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from './redux/user/user.selectors'


const App = ({currentUser, checkUserSession}) => {
  
  useEffect(()=>{
    checkUserSession()
  },[checkUserSession])
  
 return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />        
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' 
            render = {() =>  currentUser? 
                            (<Redirect to='/'/>)
                            :(<SigninAndSignup />)}/>
      </Switch>
    </div>
  );   
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser

})

const mapDispatchToProps = dispatch =>({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
