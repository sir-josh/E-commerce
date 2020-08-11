export const addItemToCart = (cartItems, cartItemToAdd ) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if(existingItem){
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                : cartItem   
        )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1 }]
}

export const decreaseItemFromCart = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if(existingItem.quantity > 1){
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        );
    }else{
        return cartItems;
    }
}