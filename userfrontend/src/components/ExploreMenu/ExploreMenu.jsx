import { menu_list } from '../../assets/assets';
import React from 'react';
import './ExploreMenu.css'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id="explore-menu">
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes crafted
        with the finest ingredients and culinary expertise. Our mission is to satisfy
        your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className='explore-menu-list'>
        {menu_list.map((item, menu) => {
          return (
            <div onClick={()=>setCategory(category=>category===item.menu_name?"All":item.menu_name)} key={menu} className='explore-menu-list-item'>
              <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr/>
    </div>
  );
};

export default ExploreMenu;
