import React, { useContext } from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({showLogin,setShowLogin}) => {
  const [menu,setMenu] = useState('home')
  const {getTotalCartAmount,token,setToken,setCartItem} = useContext(StoreContext);
  const navigate = useNavigate()
  
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    navigate('/');
  }
  return (
    <div className='navbar'>
        <Link to='/' onClick={()=>setMenu("home")}><img className='logo' src={assets.logo}/></Link>
        <ul className='navbar-menu'>
            <Link to ='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <a href="#explore-menu"><li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li></a> 
            <a href ="#footer"><li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</li></a>
        </ul>
        <div className='navbar-right'>
            <div className='navbar-basket-icon'>
              <Link to='/cart'><img src={assets.basket_icon} alt=""/></Link>
                <div className={getTotalCartAmount()===0?"":'dot'}></div>
            </div>
            {
            !token
                  ?<button onClick = {()=>setShowLogin(true)}>Sign in</button>
                  : <div className="navbar-profile">
                    <img src={assets.profile_icon} alt=""></img>
                    <ul className="nav-profile-dropdown">
                      <Link to = '/myorders'><img src={assets.bag_icon} alt=""/><p>Orders</p></Link>
                      <hr/>
                      <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
                    </ul>
                  </div>
            }
        </div>
    </div>
  )
}

export default Navbar