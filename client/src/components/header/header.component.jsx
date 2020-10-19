import React from 'react'
import {connect} from 'react-redux'

import './header.styles.scss'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {signoutStart} from '../../redux/user/user.actions'
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv} from './header.styles'

const Header = ({currentUser,hidden, signoutStart}) =>{
    return (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/'>
                CONTENT
            </OptionLink>
            {
                currentUser?
                <OptionDiv onClick={signoutStart}>SIGN OUT</OptionDiv>
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden? null:
            <CartDropdown />
        }
        
    </HeaderContainer>
    )
}

const mapStateToProps = ({user:{currentUser}, cart:{hidden}}) => ({
    currentUser,
    hidden
})

const mapDispatchToProps = dispatch =>({
    signoutStart: () => dispatch(signoutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)