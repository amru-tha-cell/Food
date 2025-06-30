import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-left">
                <img className='logo' src={assets.logo_bottom} alt=""/>
                <p>Food-prep is a full stack project.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.twitter_icon} alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>
                </div>
            </div>
            <div className="footer-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Courses</li>
                    <li>Reviews</li>
                </ul>
            </div>
            <div className="footer-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+91 96297 45022</li>
                    <li>enquiry@faceprep.in</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025@ FoodPrep. All rights reserved.</p>
    </div>
  )
}

export default Footer