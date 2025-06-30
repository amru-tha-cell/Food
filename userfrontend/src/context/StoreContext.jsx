import React,{ createContext,useState } from "react";
import axios from "axios"
import { useEffect } from "react";

export const StoreContext = createContext();

export const StoreContextProvider =(props) =>{
    const [cartItem,setCartItem] = useState({})
    const [food_list,setFoodList] = useState([])
    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    const fetchFoodList = async()=>{
        const response = await axios.get(url+'/api/food/list')
        setFoodList(response.data.data)
    }
    
    const loadCartData = async(token)=>{
        const response = await axios.get(url+'/api/cart/get',{headers:{token}})
        setCartItem(response.data.cartData)
    }
    const addToCart = async (itemId) => {
    if (!cartItem[itemId])
        setCartItem({ ...cartItem, [itemId]: 1 });
    else
        setCartItem({ ...cartItem, [itemId]: cartItem[itemId] + 1 });

    if (token) {
        try {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
            //console.log("Added to cart in DB:", res.data);
        } catch (err) {
            console.log("Error adding to cart in DB:", err.response?.data || err.message);
        }
    } 
    };
    const removeFromCart = async(itemId)=>{
        setCartItem({...cartItem,[itemId]:cartItem[itemId]-1})
        if(token){
            try {
                await axios.delete(`${url}/api/cart/remove?itemId=${itemId}`,{headers:{token}})
            } catch (error) {
                console.log(error)
            }
        }
    }
    const getTotalCartAmount=()=>{
        let total =0;
        for(let item in cartItem){
            if(cartItem[item]>0){
                let itemInfo = food_list.find(food=>food._id===item)
                total += itemInfo.price*cartItem[item];
            }
        }
        return total;
    }
    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValues ={
        food_list,cartItem,setCartItem,addToCart,removeFromCart,getTotalCartAmount,url,token,setToken
    }
    return(
        <StoreContext.Provider value={contextValues}>
            {props.children}
        </StoreContext.Provider>
    )
}

