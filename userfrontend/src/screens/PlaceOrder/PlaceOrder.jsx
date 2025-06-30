import React, { useEffect } from 'react'
import { useContext,useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css'

const PlaceOrder = () => {

  const [data,setData] = useState({
    first_name:"",
    last_name:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zip_code:"",
    country:"",
    phone:""
  })
  const {getTotalCartAmount,food_list,url,token,cartItem} = useContext(StoreContext)
  const onChangeHandler = (e)=>{
    const {name,value} = e.target;
    setData({...data,[name]:value});
  }
  const onSubmitHandler = async(e)=>{
    e.preventDefault(); 
    let orderItem=[];
    food_list.map((item)=>{
      if(cartItem[item._id]>0){
        let itemInfo = {...item};
        itemInfo.quantity = cartItem[item._id]
        orderItem.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItem,
      amount:getTotalCartAmount()+20
    }
    try {
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      const {session_url} = response.data
      window.location.replace(session_url)
    } catch (error) {
      console.log(error)
    }
  }
  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="first_name" value={data.first_name} onChange={onChangeHandler} type="text" placeholder='First Name' required />
          <input name="last_name" value={data.last_name}  onChange={onChangeHandler}  type="text" placeholder='Last Name' required />
        </div>
        <input name="email" value={data.email}  onChange={onChangeHandler}  type="email" placeholder="Email address" required />
        <input name="street" value={data.street}  onChange={onChangeHandler}  type='text' placeholder='Street' required />
        <div className="multi-fields">
            <input name="city" value={data.city}  onChange={onChangeHandler}  type="text" placeholder='City' required />
          <input name="state" value={data.state}  onChange={onChangeHandler}  type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name="zip_code" value={data.zip_code}  onChange={onChangeHandler}  type="text" placeholder='Zip code' required />
          <input name="country" value={data.country}  onChange={onChangeHandler}  type="text" placeholder='Country' required />
        </div>
        <input name="phone" value={data.phone}  onChange={onChangeHandler}  type="text" placeholder='Phone' required />
      </div>
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₹{!getTotalCartAmount()?0:20}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{!getTotalCartAmount()?0:getTotalCartAmount()+20}</p>
            </div>
          </div>
          <div className='place-order-right'>
          <button>Proceed to Payment</button>
          </div>
        </div>
    </form>
  )
}

export default PlaceOrder
