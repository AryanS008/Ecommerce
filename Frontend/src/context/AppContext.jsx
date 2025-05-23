import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const[user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setshowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    //fatch all prodcuts
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    //Add product to cart
    const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
        cartData[itemId] += 1;
    } else {
        cartData[itemId] = 1};
        setCartItems(cartData);
        toast.success("Added to cart")
    }

    //Update cart items
    const updateCartItems = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
            cartData[itemId] = quantity;
            setCartItems(cartData);
            toast.success("Updated cart")

    }

    //Remove item from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
       if( cartData[itemId]){
            cartData[itemId] -= 1;
        
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
    }
    toast.success("Removed from cart")
    setCartItems(cartData);
}


//get cart items count
const getCartCount =()=>{
    let totalCount = 0;
    for(const item in cartItems){
        totalCount += cartItems[item];
    }
    return totalCount;
}


//get cart total price
const getCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems){
        let itemInfo = products.find((product) => product._id === item);
        if(cartItems[item] > 0){
            totalAmount += itemInfo.offerPrice * cartItems[item];
        }
    }
    return Math.floor(totalAmount * 100) / 100;
}



    useEffect(() => {
        fetchProducts();
    }, []);


    const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setshowUserLogin, products,
         setProducts, currency,  addToCart, updateCartItems, removeFromCart, cartItems, setCartItems, 
         searchQuery,setSearchQuery,  getCartAmount, getCartCount};
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
    return useContext(AppContext);
}

