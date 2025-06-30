import React from 'react'
import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import './Cart.css'
const Cart = () => {
  const {cartItem,food_list,removeFromCart,getTotalCartAmount,addToCart,url} = useContext(StoreContext)
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items-title">
        <p>Item</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Modify</p>
      </div>
      <br/>
      <hr/>
      {
        food_list.map((food,index)=>{
          if(cartItem[food._id]>0){
            return(
              <>
              <div className="cart-items-item cart-items-title">
                <img className="food-image" src={`${url}/image/${food.image}`} alt=""/>
                <p>{food.name}</p>
                <p>₹{food.price}</p>
                <p>{cartItem[food._id]}</p>                
                <p>₹{cartItem[food._id]*food.price}</p>                
                <div className='food-item-counter cart-counter'>
                <img onClick={()=>removeFromCart(food._id)} src={assets.remove_icon_red} alt=""/>
                <p>{cartItem[food._id]}</p>
                <img onClick={()=>addToCart(food._id)} src={assets.add_icon_green} alt=""/>
              </div>
              </div>
              <hr/>
              </>
            )
          }
        })
      }
      <div className="cart-bottom">
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
          <button onClick={()=>navigate("/order")}>Proceed to checkout</button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='Enter promo code' />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart