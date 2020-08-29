import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HFsreEkDeqC7VEdN40jWXKJccgqAukAtS7LoGJt8hagvQeKwZ4oWEBPYz3rKOepObINdZ5Cpj2c3UsKQZmp9zV100yPABHiYx';

    const onToken = token =>{
        console.log(token);
        alert('Payment Successfull');
    }

    return (
        <StripeCheckout 
            label = 'Pay Now'
            name = 'CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image = 'https://sendeyo.com/up/d/f3eb2117da'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton;