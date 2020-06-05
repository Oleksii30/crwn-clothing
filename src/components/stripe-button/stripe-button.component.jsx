import React from 'react'
import StripeChackout from 'react-stripe-checkout'


const StripeChackoutButton = ({price}) => {

    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51GqO4eK6ZQNYTSagH5BLqttz6FtMr94anpwfatLTT5KaZp6cIuMpjsWZklkEGyBkoM0AHKazaDAJIgrd5123mo7c00jYjTV4R6'
    const onToken = ()=>{
        console.log('Payment successful')
        alert('Payment successful')
    }

    return(
        <StripeChackout 
            label='Pay Now'
            name ='CRWN Clothing ltd'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description = {`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )

}

export default StripeChackoutButton